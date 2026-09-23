// POST /.netlify/functions/activate  {licenseKey, packId, machineId} -> {packKey}
//
// Env (Netlify UI -> Site configuration -> Environment variables; never commit these):
//   PACK_MAP   JSON {"<packId>": "<Gumroad product_id>", ...}
//   PACK_KEYS  JSON {"<packId>": "<64-hex pack key>", ...}   (from CaliberEngine keys/packkeys.json)
//
// Errors are {error: <code>, message} with a stable code the engine maps to its own wording:
//   bad_request 400 · unknown_pack 404 · invalid_key 403 · refunded 403 · activation_limit 409
//   upstream 502 · misconfigured 500
'use strict';

const MAX_USES = 3;

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body),
});
const fail = (statusCode, error, message) => json(statusCode, { error, message });

function readEnvJson(name) {
  try { return JSON.parse(process.env[name] || ''); } catch { return null; }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return fail(405, 'bad_request', 'Use POST.');

  let body;
  try { body = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body || ''); }
  catch { return fail(400, 'bad_request', 'Body must be JSON.'); }

  const licenseKey = typeof body.licenseKey === 'string' ? body.licenseKey.trim() : '';
  const packId = typeof body.packId === 'string' ? body.packId.trim() : '';
  const machineId = typeof body.machineId === 'string' ? body.machineId.trim() : '';
  if (!licenseKey || licenseKey.length > 200) return fail(400, 'bad_request', 'Missing license key.');
  if (!/^[a-z0-9-]{1,100}$/.test(packId)) return fail(400, 'bad_request', 'Missing or malformed packId.');
  if (!/^[0-9a-f]{64}$/.test(machineId)) return fail(400, 'bad_request', 'Missing or malformed machineId.');

  const packMap = readEnvJson('PACK_MAP');
  const packKeys = readEnvJson('PACK_KEYS');
  if (!packMap || !packKeys) {
    console.error('activate: PACK_MAP / PACK_KEYS missing or not valid JSON');
    return fail(500, 'misconfigured', 'Activation is not configured on the server.');
  }
  const productId = packMap[packId];
  const packKey = packKeys[packId];
  if (!productId || !packKey) return fail(404, 'unknown_pack', 'This voice pack is not recognised.');

  let data;
  try {
    const r = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ product_id: productId, license_key: licenseKey, increment_uses_count: 'true' }),
    });
    // Gumroad answers an unknown key with 404 + {success:false}; anything else non-JSON is an outage.
    data = await r.json().catch(() => null);
    if (!data || (!r.ok && r.status !== 404)) {
      console.error(`activate: gumroad HTTP ${r.status} for ${packId}`);
      return fail(502, 'upstream', 'License server unavailable. Try again shortly.');
    }
  } catch (e) {
    console.error('activate: gumroad fetch failed', e);
    return fail(502, 'upstream', 'License server unavailable. Try again shortly.');
  }

  const masked = licenseKey.slice(0, 4) + '…';
  if (!data.success) return fail(403, 'invalid_key', 'That license key is not valid for this voice pack.');
  const p = data.purchase || {};
  if (p.refunded || p.chargebacked) return fail(403, 'refunded', 'This purchase was refunded or charged back.');
  if (typeof data.uses === 'number' && data.uses > MAX_USES) {
    console.log(`activate: limit ${packId} ${masked} uses=${data.uses} machine=${machineId.slice(0, 8)}`);
    return fail(409, 'activation_limit', `This license has already been activated on ${MAX_USES} PCs.`);
  }

  console.log(`activate: ok ${packId} ${masked} uses=${data.uses} machine=${machineId.slice(0, 8)}`);
  return json(200, { packKey });
};

/* CaliberVoice character list — the Voice page builds its cards and filters from this.
   To add a voice: copy one entry, change the fields, drop the portrait in assets/portraits/.
     gender  "Male" | "Female"
     rating  "G" | "PG" | "PG-13" | "R"
     genres  any labels — new ones show up as filter buttons on their own
     samples optional clips in assets/voice-samples/ — clicking the card plays one at random
     demo    true = ships free with CaliberEngine (not shown on the card)
     steam / store  optional buy links for this voice (card shows buttons when set)
                    no links = card shows a COMING SOON badge
   Order here = order on the page. */
var CALIBER_VOICES = [
  { name: "'Shade'",       img: 'shade.jpg', samples: ['shade-1.mp3', 'shade-2.mp3'],         gender: 'Male',   rating: 'PG-13', genres: ['FPS', 'Survival', 'Co-op', 'Battle Royale'], demo: true,
    desc: 'Quiet, dry and hard to rattle.' },
  { name: 'ISA Officer',   img: 'isa-officer.jpg', samples: ['isa-officer-1.mp3', 'isa-officer-2.mp3'],   gender: 'Female', rating: 'PG-13', genres: ['FPS', 'Survival', 'Co-op', 'Battle Royale'], demo: true,
    desc: 'Calm, professional, always on the mission.' },
  { name: 'Spetsnaz',      img: 'spetsnaz.jpg', samples: ['spetsnaz-1.mp3', 'spetsnaz-2.mp3'],      gender: 'Male',   rating: 'R',     genres: ['FPS', 'Survival', 'Co-op'],
    desc: 'Terse and disciplined. Swears in Russian.' },
  { name: 'Convergence-7', img: 'convergence-7.jpg', samples: ['convergence-7-1.mp3', 'convergence-7-2.mp3'], gender: 'Female', rating: 'PG',    genres: ['Sci-Fi', 'Space', 'Factory'],
    desc: 'An assistant AI with a sharp edge.' },
  { name: 'Divergence-7',  img: 'divergence-7.jpg', samples: ['divergence-7-1.mp3', 'divergence-7-2.mp3'],  gender: 'Male',   rating: 'PG',    genres: ['Sci-Fi', 'Space', 'Factory'],
    desc: 'Androgynous and robotic, and not quite the same as Convergence-7.' },
  { name: 'Apparition',    img: 'apparition.jpg', samples: ['apparition-1.mp3', 'apparition-2.mp3'],    gender: 'Female', rating: 'PG-13', genres: ['ARPG', 'RPG', 'MMO'],
    desc: 'A whisper that seems to know where you are.' },
  { name: 'Phantom',       img: 'phantom.jpg', samples: ['phantom-1.mp3', 'phantom-2.mp3'],       gender: 'Male',   rating: 'PG-13', genres: ['ARPG', 'RPG', 'MMO'],
    desc: 'Cold, close and quiet.' }
];

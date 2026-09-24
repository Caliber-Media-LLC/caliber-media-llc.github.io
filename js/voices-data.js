/* CaliberVoice character list — the Voice page builds its cards and filters from this.
   To add a voice: copy one entry, change the fields, drop the portrait in assets/portraits/.
     gender  "Male" | "Female"
     rating  "G" | "PG" | "PG-13" | "R"
     genres  any labels — new ones show up as filter buttons on their own
     demo    true = ships free with CaliberEngine
     steam / store  optional buy links for this voice (card shows buttons when set)
                    no demo and no links = card shows a COMING SOON badge
   Order here = order on the page. */
var CALIBER_VOICES = [
  { name: 'Shade',         img: 'shade.jpg',         gender: 'Male',   rating: 'PG-13', genres: ['FPS', 'Survival', 'Co-op', 'Battle Royale'], demo: true,
    desc: 'Quiet, dry and hard to rattle.' },
  { name: 'ISA Officer',   img: 'isa-officer.jpg',   gender: 'Female', rating: 'PG-13', genres: ['FPS', 'Survival', 'Co-op', 'Battle Royale'], demo: true,
    desc: 'Calm, professional, always on the mission.' },
  { name: 'Spetsnaz',      img: 'spetsnaz.jpg',      gender: 'Male',   rating: 'R',     genres: ['FPS', 'Survival', 'Co-op', 'Russian'],
    desc: 'Terse and disciplined. Swears in Russian.' },
  { name: 'Convergence-7', img: 'convergence-7.jpg', gender: 'Female', rating: 'PG',    genres: ['Sci-Fi', 'Space', 'Factory'],
    desc: 'An assistant AI with a sharp edge.' },
  { name: 'Divergence-7',  img: 'divergence-7.jpg',  gender: 'Male',   rating: 'PG',    genres: ['Sci-Fi', 'Space', 'Factory'],
    desc: 'Androgynous and robotic, and not quite the same as Convergence-7.' },
  { name: 'Apparition',    img: 'apparition.jpg',    gender: 'Female', rating: 'PG-13', genres: ['ARPG', 'RPG', 'MMO', 'Haunted'],
    desc: 'A whisper that seems to know where you are.' },
  { name: 'Phantom',       img: 'phantom.jpg',       gender: 'Male',   rating: 'PG-13', genres: ['ARPG', 'RPG', 'MMO', 'Haunted'],
    desc: 'Cold, close and quiet.' }
];

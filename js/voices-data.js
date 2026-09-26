/* CaliberVoice character list — the Voice page builds its cards and filters from this.
   To add a voice: copy one entry, change the fields, drop the portrait in assets/portraits/.
     gender  "Male" | "Female"
     rating  "G" | "PG" | "PG-13" | "R"
     genres  any labels — new ones show up as filter buttons on their own
     samples optional clips in assets/voice-samples/ — clicking the card plays one at random
     games   game packs this voice has (card shows the first few + a "more" toggle)
     demo    true = ships free with CaliberEngine (not shown on the card)
     steam / store  optional buy links for this voice (card shows buttons when set)
                    no links = card shows a COMING SOON badge
   Order here = order on the page. */
var CALIBER_VOICES = [
  { name: "'Shade'",       img: 'shade.jpg', samples: ['shade-1.mp3', 'shade-2.mp3'],         gender: 'Male',   rating: 'PG-13', genres: ['FPS', 'Survival', 'Co-op', 'Battle Royale'], demo: true,
    games: ["Fortnite", "Call of Duty", "Battlefield", "Counter-Strike 2", "Escape from Tarkov", "Rainbow Six Siege", "ARC Raiders", "Helldivers 2", "DayZ", "The Division 2", "STALKER 2", "Delta Force", "Squad", "Ready or Not", "Arena Breakout: Infinite", "Hell Let Loose: Vietnam", "Bodycam", "WARDOGS"],
    desc: 'Quiet, dry and hard to rattle.' },
  { name: 'ISA Officer',   img: 'isa-officer.jpg', samples: ['isa-officer-1.mp3', 'isa-officer-2.mp3'],   gender: 'Female', rating: 'PG-13', genres: ['FPS', 'Survival', 'Co-op', 'Battle Royale'], demo: true,
    games: ["Fortnite", "Call of Duty", "Battlefield", "Counter-Strike 2", "Escape from Tarkov", "Rainbow Six Siege", "ARC Raiders", "Helldivers 2", "DayZ", "The Division 2", "STALKER 2", "Delta Force", "Squad", "Ready or Not", "Arena Breakout: Infinite", "Hell Let Loose: Vietnam", "Bodycam", "WARDOGS"],
    desc: 'Calm, professional, always on the mission.' },
  { name: 'Spetsnaz',      img: 'spetsnaz.jpg', samples: ['spetsnaz-1.mp3', 'spetsnaz-2.mp3'],      gender: 'Male',   rating: 'R',     genres: ['FPS', 'Survival', 'Co-op'],
    games: ["Call of Duty", "Battlefield", "Counter-Strike 2", "Escape from Tarkov", "Rainbow Six Siege", "ARC Raiders", "Helldivers 2", "Rust", "DayZ", "The Division 2", "STALKER 2", "Delta Force", "Squad", "Ready or Not", "Arena Breakout: Infinite", "Hell Let Loose: Vietnam", "Bodycam", "WARDOGS"],
    desc: 'Terse and disciplined. Swears in Russian.' },
  { name: 'Convergence-7', img: 'convergence-7.jpg', samples: ['convergence-7-1.mp3', 'convergence-7-2.mp3'], gender: 'Female', rating: 'PG',    genres: ['Sci-Fi', 'Space', 'Factory'],
    games: ["No Man's Sky", "Starfield", "Satisfactory", "StarRupture"],
    desc: 'An assistant AI with a sharp edge.' },
  { name: 'Divergence-7',  img: 'divergence-7.jpg', samples: ['divergence-7-1.mp3', 'divergence-7-2.mp3'],  gender: 'Male',   rating: 'PG',    genres: ['Sci-Fi', 'Space', 'Factory'],
    games: ["No Man's Sky", "Starfield", "Satisfactory", "StarRupture"],
    desc: 'Androgynous and robotic, and not quite the same as Convergence-7.' },
  { name: 'Apparition',    img: 'apparition.jpg', samples: ['apparition-1.mp3', 'apparition-2.mp3'],    gender: 'Female', rating: 'PG-13', genres: ['ARPG', 'RPG', 'MMO'],
    games: ["World of Warcraft", "Mistfall Hunter"],
    desc: 'A whisper that seems to know where you are.' },
  { name: 'Phantom',       img: 'phantom.jpg', samples: ['phantom-1.mp3', 'phantom-2.mp3'],       gender: 'Male',   rating: 'PG-13', genres: ['ARPG', 'RPG', 'MMO'],
    games: ["World of Warcraft", "Mistfall Hunter"],
    desc: 'Cold, close and quiet.' },
  { name: 'Thud Boulderson',    img: 'thud-boulderson.jpg', samples: ['thud-boulderson-1.mp3', 'thud-boulderson-2.mp3'],       gender: 'Male',   rating: 'G', genres: ['RPG'],
    games: ["Everwind", "RuneScape: Dragonwilds"],
    desc: 'A big, brave hero. Not the sharpest sword.' },
  { name: 'Wren Sparkwright',   img: 'wren-sparkwright.jpg', samples: ['wren-sparkwright-1.mp3', 'wren-sparkwright-2.mp3'],     gender: 'Female', rating: 'G', genres: ['RPG'],
    games: ["Everwind", "RuneScape: Dragonwilds"],
    desc: 'A brilliant engineer. Too smart for her own good.' },
  { name: 'Barnaby Fizzlewick', img: 'barnaby-fizzlewick.jpg', samples: ['barnaby-fizzlewick-1.mp3', 'barnaby-fizzlewick-2.mp3'], gender: 'Male',   rating: 'G', genres: ['RPG'],
    games: ["Everwind", "RuneScape: Dragonwilds"],
    desc: 'A cheerful old wizard. Almost too cheerful.' },
  { name: 'The Wanderer',       img: 'the-wanderer.jpg', samples: ['wanderer-1.mp3', 'wanderer-2.mp3'],                   gender: 'Male',   rating: 'PG-13', genres: ['Survival', 'RPG', 'Strategy'],
    games: ["Valheim", "Assassin's Creed Valhalla", "ASKA", "Northgard"],
    desc: 'A Viking explorer-king. Calm, dry and always looking past the horizon. Curses in Norse/Norwegian.' },
  { name: 'The Shieldmaiden',   img: 'the-shieldmaiden.jpg', samples: ['shieldmaiden-1.mp3', 'shieldmaiden-2.mp3'],       gender: 'Female', rating: 'PG-13', genres: ['Survival', 'RPG'],
    games: ["Valheim", "Assassin's Creed Valhalla", "ASKA"],
    desc: 'Holds the line and guards the hall. Curses in Norse/Norwegian.' },
  { name: 'The Shipwright',     img: 'the-shipwright.jpg', samples: ['shipwright-1.mp3', 'shipwright-2.mp3'],             gender: 'Male',   rating: 'PG-13', genres: ['Survival', 'RPG'],
    games: ["Valheim", "Assassin's Creed Valhalla", "ASKA", "God of War"],
    desc: 'A giggling boat-builder who talks to the gods. They talk back. Curses in Norse/Norwegian.' },
  { name: 'Ironside',           img: 'ironside.jpg', samples: ['ironside-1.mp3', 'ironside-2.mp3'],                       gender: 'Male',   rating: 'PG-13', genres: ['Survival', 'RPG'],
    games: ["Valheim", "Assassin's Creed Valhalla", "God of War"],
    desc: 'Few words. Big axe. Keeps walking. Curses in Norse/Norwegian.' },
  { name: 'The Boneless',       img: 'the-boneless.jpg', samples: ['boneless-1.mp3', 'boneless-2.mp3'],                   gender: 'Male',   rating: 'PG-13', genres: ['Survival', 'RPG', 'Strategy'],
    games: ["Valheim", "Assassin's Creed Valhalla", "Northgard", "God of War"],
    desc: 'A ruthless young warlord. His mind is the weapon. Curses in Norse/Norwegian.' },
  { name: 'Bosun Kaz Varga',    img: 'kaz-varga.jpg',                                                                     gender: 'Female', rating: 'R',     genres: ['Pirate'],
    games: ["Sea of Thieves", "Windrose", "Skull and Bones", "World of Sea Battle", "Corsair Cove", "Naval Action", "Assassin's Creed IV Black Flag"],
    desc: 'Best blade on any ship, and everyone knows it.' },
  { name: 'Old Quartermaster',  img: 'old-quartermaster.jpg', samples: ['old-quartermaster-1.mp3', 'old-quartermaster-2.mp3'], gender: 'Male', rating: 'R',     genres: ['Pirate'],
    games: ["Sea of Thieves", "Windrose", "Skull and Bones", "World of Sea Battle", "Corsair Cove", "Naval Action", "Assassin's Creed IV Black Flag"],
    desc: 'Keeps the books, splits the loot, locks up the rum.' }
];

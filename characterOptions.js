var races =[
  {
    "name":"Human",
    "improvements":[
      ["strength",1],
      ["dexterity",1],
      ["constitution",1],
      ["intelligence",1],
      ["wisdom",1],
      ["charisma",1]
    ],
    "speed":30,
    "languages":["Common", "Any"],
    "proficiencies":[],
    "features":[]
  },
  {
    "name":"Elf",
    "improvements":[
      ["strength",0],
      ["dexterity",2],
      ["constitution",0],
      ["intelligence",1],
      ["wisdom",0],
      ["charisma",0]
    ],
    "speed":30,
    "features":["Darkvision"],
    "proficiencies":["Perception", "Longsword", "Shortsword", "Shortbow", "Longbow"],
    "languages":["Common","Elvish", "Any"]
  },
  {
    "name":"Dwarf",
    "improvements":[
      ["strength",2],
      ["dexterity",0],
      ["constitution",2],
      ["intelligence",0],
      ["wisdom",0],
      ["charisma",0]
    ],
    "speed":25,
    "features":["Darkvision", "Poison Resistance"],
    "proficiencies":["Battleaxe","Handaxe","Throwing Hammer","Warhammer","Smith's Tools", "Light armor", "Medium armor"],
    "languages":["Common","Dwarvish"]
  }
];

var classes = [
  {
    "name":"fighter",
    "hit_dice":10,
    "proficiencies":["All Armor", "Shields", "Simple Weapons", "Martial Weapons"],
    "saving_throws":["Strength", "Constitution"],
    "skill_choice":{
      "amount":2,
      "options":[
        "Acrobatics",
        "Animal Handling",
        "Athletics",
        "History",
        "Insight",
        "Intimidation",
        "Perception",
        "Survival"
      ]
    },
    "equipment":["Chain Mail", "Martial Weapon/Shield", "Light Crossbow", "Dungeoner's Pack"],
    "attacks":["Martial Weapon","Light Crossbow","Unarmed"],
    "level_buffs":[
      {
        "name":"Fighting Style",
        "level":1,
        "options":[
          {
            "name":"Archery",
            "description":"You add a +2 bonus on attack rolls you make with ranged weapons.",
            "improvements":{
              "bonus":2,
              "type":"ranged"
            }
          },
          {
            "name":"Defense",
            "description":"While wearing armor, you gain a +1 bonus to AC",
            "improvements":{
              "bonus":1,
              "type":"AC"
            }
          },
          {
            "name":"Dueling",
            "description":"When you are wielding a single melee weapon, you gain a +2 bonus to damage rolls with that weapon.",
            "improvements":{
              "bonus":2,
              "type":"ranged"
            }
          }
        ]
      },
      {
        "name":"Action Surge",
        "level":2,
        "options":null,
        "description":"Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before you can use it again.",
        "improvements":{
          "special":"Action Surge"
        }
      },
      {
        "name":"Improved Critical",
        "level":3,
        "options":null,
        "description":"Your weapon attacks score a critical hit on a roll of 19 or 20.",
        "improvements":{
          "bonus":1,
          "type":"critical"
        }
      }
    ]
  },
  {
    "name":"wizard",
    "hit_dice":6,
    "proficiencies":["Daggers","Dars","Slings","Quarterstaffs","Light Crossbows"],
    "saving_throws":["Intelligence", "Wisdom"],
    "skill_choice":{
      "amount":2,
      "options":[
        "Arcana",
        "History",
        "Insight",
        "Investigation",
        "Medicine",
        "Religion"
      ]
    },
    "equipment":["Quarterstaff","Component Pouch", "Scholar's Pack", "Spellbook"],
    "attacks":["Quarterstaff","Spellcasting","Unarmed"],
    "spells":[
      [3,2], // 1st level
      [3,3], // 2nd level
      [3,4,2], // 3rd level
      [4,4,3],    // .
      [4,4,3,2],  // .
      [4,4,3,3],  // .
      [4,4,3,3,1],
      [5,4,3,3,2],
      [5,4,3,3,3,1],
      [5,4,3,3,3,2],
      [5,4,3,3,3,2,1],
      [5,4,3,3,3,2,1],
      [5,4,3,3,3,2,1,1],
      [5,4,3,3,3,2,1,1],
      [5,4,3,3,3,2,1,1,1],
      [5,4,3,3,3,2,1,1,1],
      [5,4,3,3,3,2,1,1,1,1],
      [5,4,3,3,3,3,1,1,1,1],
      [5,4,3,3,3,3,2,1,1,1],
      [5,4,3,3,3,3,2,2,1,1]
    ],
    "spell_choices":[
      [
        "Acid Splash",
        "Blade Ward",
        "Chill Touch",
        "Fire Bolt",
        "Light",
        "Minor Illusion",
        "Ray of Frost"
      ],
      [
        "Burning Hands",
        "Detect Magic",
        "Disguise Self",
        "Magic Missile",
        "Mage Armor",
        "Ray of Sickness",
        "Sleep",
        "Thunderwave",
        "Witch Bolt"
      ],
      [
        "Blindness",
        "Cloud of Daggers",
        "Crown of Madness",
        "Darkness",
        "Darkvision",
        "Flaming Sphere",
        "Magic Weapon",
        "Misty Step",
        "Phantasmal Force",
        "Shatter",
        "Web"
      ],
      [
        "Counterspell",
        "Fireball",
        "Glyph of Warding",
        "Lightning Bolt",
        "Major Image",
        "Slow",
        "Stinking Cloud"
      ],
      [
        "Banishment",
        "Blight",
        "Conjure Minor Elementals",
        "Greater Invisibility",
        "Ice Storm",
        "Polymorph",
        "Phantasmal Killer",
        "Wall of Fire"
      ]
    ],
    "level_buffs":[
      {
        "name":"Spellcasting",
        "level":1,
        "options":null,
        "description":"You have spent years mastering a few spells that you have recorded in your spellbook. Intelligence is your spellcasting modifier.",
        "improvements":{
          "bonus":1,
          "type":"critical"
        }
      },
      {
        "name":"Arcane Tradition",
        "level":2,
        "options":null,
        "description":"Your focus on evocation magic allows you to harness the full power of spells that create powerful elemental effects. When you hit a creature with a spell, that creature takes extra damage.",
        "improvements":{
          "bonus":1,
          "type":"spells"
        }
      },
      {
        "name":"Potent Cantrips",
        "level":6,
        "options":null,
        "description":"Starting at level 6, your damaging cantrips affect even creatures that avoid the brunt of the effect.",
        "improvements":{
          "bonus":10,
          "type":"spell_save"
        }
      }

    ]
  }
]

module.exports = {
  races:races,
  classes:classes
}

var chambers = [
  {
    "name":"Antechamber",
    "rolls":[[3,3,1],[3,2,1],[2,2,1]],
    "description":"You enter a small, gloomy chamber. Its walls are dusty and littered with thick cobwebs that span all across the room. Up ahead is one large door",
    "chests":[
      {
        "dc":15,
        "description":"You notice that there is a smallbox hidden in a barrel at the edge of the room."
      }
    ],
    "chance":1
  },
  {
    "name":"Armory",
    "rolls":[[3,3,2],[4,4,3],[6,4,3]],
    "description":"You enter a wide, well lit chamber with a skylight arching across the center of the ceiling about 15 feet above your head. All around you are suits of chain mail held aloft by small wooden poles sticking out of the ground. A large furnace is lit at the edge of the room.",
    "chests":[
      {
        "dc":0,
        "description":"You easily locate a large iron chest to the side of the furnace."
      },
      {
        "dc":17,
        "description":"You find a secret compartment in one of the suits of armor."
      }
    ],
    "chance":2
  },
  {
    "name":"Audience Chamber",
    "rolls":[[3,3,1],[4,4,2],[5,3,2]],
    "description":"The open room in front of you houses a collection of old, dusty chairs made out of a combination of steel and wood. All of these chairs face a small wooden platform at the end of the room.",
    "chests":[
      {
        "dc":20,
        "description":"After searching for a while, you notice that there is a false wall at the base of the stage, and behind it lies a bejeweled wooden chest."
      }
    ],
    "chance":2
  },
  {
    "name":"Aviary",
    "rolls":[[6,6,3],[3,4,2],[4,7,2]],
    "description":"You enter an enormous rotunda with small cages stacked against the walls. These cages, however, appear to be too small for humans. Up above you is a skylight made of stained glass, and all around it are small wooden posts.",
    "chests":[
      {
        "dc":0,
        "description":"You come across a small iron strongbox in an open cage.",
        "quality":1
      },
      {
        "dc":10,
        "description":"You find a large wooden chest behind a cage.",
        "quality":2
      },
      {
        "dc":15,
        "description":"You find a hidden strongbox underneath some straw in an open cage.",
        "quality":3
      }
    ],
    "chance":1
  },
  {
    "name":"Banquet Room",
    "rolls":[[7,3,3],[6,6,3],[5,5,2]],
    "description":"A few long tables with ornate tableclothes layed neatly over them span across this great hall. Tall, unlit candles sit in small metal holders that are evenly spaced across each table.",
    "chests":[],
    "chance":2
  },
  {
    "name":"Barracks",
    "rolls":[[4,4,2],[2,5,2],[3,6,3]],
    "description":"You enter a long, stone room with a low hanging ceiling that is covered with condensation. Puddles are scattered throughout the cold, gray floor of the room, and next to them are a series of straw mats laid out on the ground.",
    "chests":[
      {
        "dc":12,
        "description":"You see a small strongbox hidden in a straw pillow.",
        "quality":1
      }
    ],
    "chance":3
  },
  {
    "name":"Bathroom",
    "rolls":[[2,2,1],[2,2,2]],
    "description":"A pristine, ceramic bathtub lies uncovered at the far end of this room. Next to it is a rusty, dirty iron pot.",
    "chests":[
      {
        "dc":13,
        "description":"You open the lid to the rusty, stinky pot beside the bathtub and find a strongbox inside, but it's completely covered in muck.",
        "quality":3
      }
    ],
    "chance":2
  },
  {
    "name":"Bedroom",
    "rolls":[[2,2,2],[3,3,2],[4,4,2]],
    "description":"You enter a square room with sconces holding lit torches. The warm, yellow light illuminates a fine wooden bed frame with a small chest at its base.",
    "chests":[
      {
        "dc":0,
        "description":"You see that there is a small, wooden chest at the base of the bed frame.",
        "quality":2
      }
    ],
    "chance":1
  },
  {
    "name":"Cell",
    "rolls":[[2,2,0],[3,2,0]],
    "description":"Dark iron bars wrap around the edges of this room, housing nothing but a skeleton and a bed roll within their confines",
    "chests":[],
    "chance":2
  },
  {
    "name":"Chapel",
    "rolls":[[7,2,3],[5,5,2]],
    "description":"Stained glass windows illuminate the huge, empty room in front of you, filling each dusty corner with soft morning light. A wooden pedestal stands mostly intact at the far side of the room, and a red ray of light from the stained glass window causes the pedestal to glow with an unfamiliar light.",
    "chests":[
      {
        "dc":16,
        "description":"You open a hidden compartment in the pedestal",
        "quality":3
      }
    ],
    "chance":3
  },
  {
    "name":"Cistern",
    "rolls":[[4,4,3],[3,5,2],[5,5,1]],
    "description":"You hear a splash as your foot enters a shallow pool of water. The floor of the room before you is completely flooded, but the water is only about a foot deep. All around the room are wide stone pillars that connect the floor with the ceiling about 50 feet above you. A soft light enters through cracks in the stone bricks that form the ceiling above your head.",
    "chests":[
      {
        "dc":12,
        "description":"You trip over a small iron chest in the water.",
        "quality":2
      }
    ],
    "chance":1
  },
  {
    "name":"Closet",
    "rolls":[[2,2,1],[2,2,0]],
    "description":"You open the door in front of you, revealing a small closet on the other side. The tiny room holds a collection of fine robes hanging from the ceiling. Two chests hide behind a thick veil of linens.",
    "chests":[
      {
        "dc":0,
        "description":"You see a large wooden chest on your left.",
        "quality":2
      },
      {
        "dc":0,
        "description":"You see a large wooden chest on your right.",
        "quality":2
      }
    ],
    "chance":2
  },
  {
    "name":"Conjuring Room",
    "rolls":[[3,3,2],[5,5,3],[6,3,2]],
    "description":"In the center of this dark room rests a bloody black table with a skeleton on its top. The walls are all covered with purple velvet curtains, and there are large cages all around the room. ",
    "chests":[
      {
        "dc":0,
        "description":"You approach a chest next to the skeleton on the table."
      },
      {
        "dc":12,
        "description":"You find a chest hidden in an open cage."
      }
    ],
    "chance":2
  },
  {
    "name":"Court",
    "rolls":[[7,3,2],[3,7,2]],
    "description":"You enter a long room with rows of well made benches going down the chamber until, finally, reaching a tall desk with a strange insignia burned onto its mahogony surface.",
    "chests":[],
    "chance":1
  },
  {
    "name":"Crypt",
    "rolls":[[3,3,2],[3,3,3],[4,4,2]],
    "description":"You enter a small room with dark iron coffins standing upright on each wall around you.",
    "chests":[],
    "chance":2
  },
  {
    "name":"Catacombs",
    "rolls":[[7,7,3],[4,4,2],[6,4,3]],
    "description":"As you enter this gloomy chamber, the dry smell of bones reach your nose, and you see that the walls around you are really stacks of old, dusty bones.",
    "chests":[
      {
        "dc":5,
        "description":"You see a chest poking out of a pile of bones."
      },
      {
        "dc": 15,
        "description":"You find a tiny metal strongbox hidden inside a dusty, cracked skull."
      }
    ],
    "chance":2
  },
  {
    "name":"Divination Room",
    "rolls":[[2,2,1],[3,2,2],[2,4,2]],
    "description":"In front of you stands a mysterious altar built out of seemingly random components. You notice that there's an elf's ear connected to a piece of hood on the shrine's leftside, and you notice that there is a strange looking glass orb being held by an orc's severed hand.",
    "chests":[
      {
        "dc":5,
        "description":"You notice that there's a a chest behind the altar."
      }
    ],
    "chance":2
  },
  {
    "name":"Dormitory",
    "rolls":[[2,2,1],[3,3,2]],
    "description":"You enter a cramped bedroom with a small desk pressed tightly against a dirty wall.",
    "chests":[],
    "chance":1
  },
  {
    "name":"Dressing Room",
    "rolls":[[3,3,1],[2,2,1]],
    "description":"You enter a cramped room with a large skylight on the ceiling only a few feet above your head. There's a small, scuffed desk on the other side of the room, and next to it sits a wardrobe.",
    "chests":[
      {
        "dc":15,
        "description":"You find a secret compartment in the wardrobe."
      }
    ],
    "chance":1
  },
  {
    "name":"Gallery",
    "rolls":[[4,4,3],[7,4,3],[6,3,2]],
    "description":"Every surface of the room before you is painted white, and there are stone pedestals lined up across each tall wall. The pedestals hold different pieces of art. Some hold busts of ancient nobles, some hold dusty ceramic pieces, and some hold grand oil paintings.",
    "chests":[
      {
        "dc":5,
        "description":"You notice a small strongbox on one of the pedestals."
      },
      {
        "dc":15,
        "description":"You find a hidden compartment in one of the pedestals."
      },
      {
        "dc":20,
        "description":"You find the lid of a chest disguised as the floor around you."
      }
    ],
    "chance":2
  },
  {
    "name":"Game Room",
    "rolls":[[5,5,3],[4,4,2]],
    "description":"The room you enter is filled with a dim, yellow light. A lonely torch is held by a small metal sconce on the wall opposite of you. In the center of this room is a wide table with some sort of game field burned onto its top.",
    "chests":[
      {
        "dc":10,
        "description":"You find a chest hidden underneath the table."
      }
    ],
    "chance":2
  },
  {
    "name":"Guardroom",
    "rolls":[[3,3,2],[4,4,2],[5,5,3]],
    "description":"Red banners hang on the stone walls of this well lit room, bearing white wolf's head painted onto them. Chairs and tables are scattered across this room. And a small furnace rests against a wall, unlit.",
    "chests":[
      {
        "dc":15,
        "description":"There's a secret chest hidden in a hole in the wall behind a banner."
      },
      {
        "dc":20,
        "description":"There's a smallbox hidden beneath the ashes in the furnace."
      }
    ],
    "chance":3
  },
  {
    "name":"Hall",
    "rolls":[[7,3,2],[3,7,2],[2,6,2],[6,2,2]],
    "description":"You enter a very long hall filled with benches and chairs. There's a large firepit that runs along the center of this room.",
    "chests":[
      {
        "dc":20,
        "description":"There's a chest hidden beneath the ashes in the firepit."
      }
    ],
    "chance":2
  },
  {
    "name":"Kennel",
    "rolls":[[2,2,1],[3,2,1],[2,3,1]],
    "description":"There are large piles of straw littered on the floor of the room in front of you. There's a wooden trough filled with chunks of cornmeal on the opposite edge of the room.",
    "chests":[],
    "chance":1
  },
  {
    "name":"Kitchen",
    "rolls":[[3,3,2],[4,4,2]],
    "description":"You enter a room with a large, white tiled floor. There are a few firepits sprawled around the room with large chunks of meat hanging on metal racks above the pits.",
    "chests":[
      {
        "dc":10,
        "description": "You can see that there's a small chest covered in straw."
      },
      {
        "dc":15,
        "description":"You notice a small strongbox in an iron bucket."
      }
    ],
    "chance":2
  }
  // {
  //   "name":"",
  //   "rolls":[],
  //   "description":"",
  //   "chests":[],
  //   "chance":1
  // },
]

var doorTypes = [
  {
    "state":"open",
    "description":"The wall opens up in front of you, revealing a slim passageway."
  },
  {
    "state":"open",
    "description":"A splintered door lies on the ground of a passageway in front of you."
  },
  {
    "state":"closed",
    "description":"A sturdy looking wooden door stands closed in front of you. It is adorned with black iron bars spread across its rigid surface."
  },
  {
    "state":"closed",
    "description":"A tall steel door blocks you from exiting this room."
  },
  {
    "state":"closed",
    "description":"A set of dusty wooden double doors stand closed before your feet."
  },
  {
    "state":"closed",
    "description":"A short door is slightly concealed in the wall in front of you. Small slits reveal its edges."
  },
  {
    "state":"locked",
    "description":"You tried turning the brass handle on this sturdy wooden door, but it is locked.",
    "lockpick_dc":10,
    "strength_dc":15
  },
  {
    "state":"locked",
    "description":"This set of old, creaky double doors has a locking mechanism very foreign to you.",
    "lockpick_dc":15,
    "strength_dc":10
  }
];

var passagewayTrapTable = [
  {
    "name":"Collapsing Roof",
    "description":"Right as you feel your foot tug a small wire strung across the floor, the stone ceiling above your head collapses down onto you.",
    "damage":"2d10",
    "save_dc":15,
    "save_type":"dexterity",
    "trap_hint":"You see a thin wire in front of you, stretching from wall to wall.",
    "find_dc":10,
    "find_type":"Perception",
    "deactivate_dc":10,
    "deactivate_type":"Dexterity"
  },
  {
    "name":"Poison Darts",
    "description":"You hear a metallic clinking sound as you step on a small pressure plate. Suddenly, green darts shoot at you from small holes in the ceiling above.",
    "damage":"2d6",
    "save_dc":10,
    "save_type":"Dexterity",
    "trap_hint":"After spending some time looking at the differences in stone types in the floor around you, you notice that there is in fact a pressure plate hidden on the floor in front of you.",
    "find_dc":15,
    "find_type":"Intelligence",
    "deactivate_dc":10,
    "deactivate_dc":"Dexterity",
    "deactivate_type":"Dexterity"
  }
  // {
  //   "name":"",
  //   "description":"",
  //   "damage":"",
  //   "save_dc":"",
  //   "save_description":"",
  //   "save_type":"",
  //   "trap_hint":"",
  //   "find_dc":"",
  //   "find_type":"",
  //   "deactivate_dc":"",
  //   "deactivate_type":""
  // }
]

var roomTrapTable = [
  {
    "name":"Simple Pit",
    "description":"The seemingly solid ground you're stepping on turns out to be a piece of dirtied cloth, and, as you place your weight on this hidden pit, you feel yourself begin to fall.",
    "damage":"1d6",
    "save_dc":15,
    "save_type":"Acrobatics",
    "save_description":"You manage to deftly roll over the pit.",
    "trap_hint":"You notice that there is a dirtied cloth placed over what appears to be a pit in the ground before you.",
    "find_dc":10,
    "find_type":"Perception",
    "deactivate_dc":10,
    "deactivate_type":"Dexterity"
  },
  {
    "name":"Flamethrower",
    "description":"You feel the floor beneath your feet move down ever so slightly as the pressure plate you just stepped on activates. Above you, a burst of flames sprays down onto you.",
    "damage":"4d6",
    "save_dc":13,
    "save_type":"Dexterity",
    "save_description":"You manage to quickly dart out of the way of the flames.",
    "trap_hint":"After spending some time looking at the differences in stone types in the floor around you, you notice that there is in fact a pressure plate hidden on the floor in front of you.",
    "find_dc":15,
    "find_type":"Perception",
    "deactivate_dc":10,
    "deactivate_type":"Dexterity"
  }
];

var lootTable = ["Boots of Quickening","a Potion of Health","a Ring of Waning Flame","a Staff of Frenzy", "an Orc Tongue", "an Indestructible Hat", "Poison Spray"];









//

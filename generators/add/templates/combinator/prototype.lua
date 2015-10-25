	{
		type = "constant-combinator",
		name = "<%= obj_name %>",
		icon = "__<%= info.name %>__/<%= objName %>/img/icon.png",
		flags = {"placeable-neutral", "player-creation"},
		minable = {hardness = 0.2, mining_time = 0.5, result = "<%= obj_name %>"},
		max_health = 50,
		corpse = "small-remnants",

		collision_box = {{-0.35, -0.35}, {0.35, 0.35}},
		selection_box = {{-0.5, -0.5}, {0.5, 0.5}},

		item_slot_count = 15,

		sprite = {
			filename = "__<%= info.name %>__/<%= objName %>/img/sprite.png",
			x = 61,
			width = 61,
			height = 50,
			shift = {0.078125, 0.15625},
		},
		circuit_wire_connection_point = {
			shadow = {
				red = {0.828125, 0.328125},
				green = {0.828125, -0.078125},
			},
			wire = {
				red = {0.515625, -0.078125},
				green = {0.515625, -0.484375},
			}
		},
		circuit_wire_max_distance = 7.5
	},
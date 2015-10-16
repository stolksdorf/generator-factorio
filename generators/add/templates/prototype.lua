<% if(useExistingTech){ %> local utils = require("FAD.utils")

utils.addToExistingTech(data, "circuit-network", "<%= obj_name %>")
<% } %>
data:extend({
<% if(makeRecipe){ %>
	--Recipe
	{
		type = "recipe",
		name = "<%= obj_name %>",
		energy_required = 1,
		enabled = false,
		ingredients = {
			{"copper-cable", 5},
			{"rail-signal", 2},
			{"electronic-circuit", 2},
		},
		result = "<%= obj_name %>"
	},
<% } %><% if(makeTestingRecipe){ %>
	--Recipe used to craft quick for testing. Remove before release
	{
		type = "recipe",
		name = "<%= obj_name %>_TESTING",
		energy_required = 0.1,
		enabled = true,
		ingredients = {
			{"iron-plate", 1},
		},
		result = "<%= obj_name %>"
	},
<% } %><% if(makeItem){ %>
	--Item
	{
		type = "item",
		name = "<%= obj_name %>",
		icon = "__<%= info.name %>__/<%= objName %>/img/icon.png",
		flags = { "goes-to-quickbar" },
		subgroup = "circuit-network",
		place_result="<%= obj_name %>",
		order = "b[combinators]-a[<%= obj_name %>]",
		stack_size= 50,
	},
<% } %><% if(makeTechnology){ %>
	--Technology
	{
		type = "technology",
		name = "<%= obj_name %>",
		icon = "__<%= info.name %>__/<%= objName %>/img/technology.png",
		unit = {
			count = 50,
			time  = 10,
			ingredients = {
				{"science-pack-1", 1},
				{"science-pack-2", 1},
			},
		},
		prerequisites = {"circuit-network"},
		effects = {
			{
				type = "unlock-recipe",
				recipe = "<%= obj_name %>"
			}
		},
		order = "a-d-e",
	},
<% } %><% if(makeEntity){ %>
	-- Entity
<%- entityPrototype %>
<% } %>
})
local Mod = require("FAD.mod")
local utils = require("FAD.utils")


Mod.addSchematic({
	name="<%= obj_name %>",
	updateRateBySecond = 0.5,
	onPlace = function(entity, storage)
		utils.print("Placing a <%= objTitle %>!")
	end,
	onDestroy = function(entity, storage) end,
	onUpdate = function(entity, storage, event)

		--Put your update code here!

	end
})
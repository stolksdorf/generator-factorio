local Mod = require("FAD.mod")

--Register the mod with FAD
local <%= ModName %>Mod = Mod.register("<%= ModName %>Mod")

<%= ModName %>Mod.addOnLoadListener(function()
	debug('<%= ModTitle %> has loaded!')
end)


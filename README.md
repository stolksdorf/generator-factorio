# generator-factorio

[![NPM](https://nodei.co/npm/generator-factorio.png?compact=true)](https://nodei.co/npm/generator-factorio/)

A [Yeoman](http://yeoman.io/) generator for building mods for [Factorio](https://www.factorio.com/)

#### install

`npm install -g yo generator-factorio`


## commands

#### default

`yo factorio`

This will create a new mod for you. It needs the mod name, description, starting version, author, and if you'd like to use FAD. It then creates a properly name mod folder for you (eg. TestMod_0.0.0) and creates the following files

* creates `[Mod Name]_[version]/data.lua`
* creates `[Mod Name]_[version]/info.json`
* creates `[Mod Name]_[version]/locale/en/[Mod Name].cfg`
* creates `[Mod Name]_[version]/config.lua`
* creates `[Mod Name]_[version]/README.md`
* creates `[Mod Name]_[version]/control.lua`


#### add

`yo factorio:add`

Adds a new 'object' to your mod; entity, technology, item and/or recipe. Creates the prototype, as well as updates your locale cfg with translations. If you are creating a new entity, you can select what kind of entity to base it off of and it will use the correct entity prototype as well as move in any relevant images.

* creates `[Obj Name]/prototype.lua`
* creates `[Obj Name]/img/*`
* creates `[Obj Name]/schematic.lua` (if entity)
* modifies `control.lua` (if entity)
* modifies `data.lua`
* modifies `locale/en/[Mod Name].cfg`

#### release

`yo factorio:release [version]`

This creates a new zipped release of your mod and adds it to the `/releases` folder. If you provide a version number it wil update your mod's `info.json` version and then do a new release with that number. Otherwise it will just use the version in the `info.json`

* creates `/releases/[Mod Name]_[version].zip`
* modifies `info.json` (if version provided)

**Note** : This will **not** change your development directory name. You will have to do that manually if you are testing locally.

#### updateFAD

`yo factorio:updateFAD`

Grabs the newest version of FAD from Github and installs it into your `/FAD` of your mod

* modifies `FAD/*`



## Changelog

#### 1.3.0 - Sunday, 25/10/2015
	* Default generator now asks for a starting version of your mod
	* Default generator creates a properly named mod folder for you
	* Entity choices for the add generator are now read in dynamically
	* Added better defaults to questions with required answers
	* Updated the documentation

#### 1.2.0 - Saturday, 24/10/2015
	* Now grabs a fesh version of FAD each time, instead of cached

#### 1.1.0 - Friday, 23/10/2015
	* Updated to work with the newest version of FAD since the 0.12.11 update

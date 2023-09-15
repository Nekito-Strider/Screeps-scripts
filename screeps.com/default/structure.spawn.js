var structureSpawn = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {
        var spawnRoom = Game.rooms.sim; //edit for server
        var spawnSources = spawn.room.find(FIND_SOURCES);
        var harvestPosList = []
        // BAD IDEA, WILL USE UP CPU TO CALCULATE MINING LOCATIONS EVERY LOOP. MAYBE USE A CREEP TO STORE LOCATIONS TO A MEMORY?
        //const terrain = new Room.Terrain(spawn.room.name);
        if (spawn.room.memory(!harvestPosList)) {
            for (var source in spawnSources) {
                if (spawnRoom.terrain.get((source.pos.x + 1), (source.pos.y)) !== TERRAIN_MASK_WALL) {
                    harvestPosList.push(((source.pos.x + 1), source.pos.y));
                }
                if (spawnRoom.terrain.get((source.pos.x + 1), (source.pos.y - 1)) !== TERRAIN_MASK_WALL) {
                    harvestPosList.push(((source.pos.x + 1), (source.pos.y - 1)));
                }
                if (spawnRoom.terrain.get((source.pos.x), (source.pos.y - 1)) !== TERRAIN_MASK_WALL) {
                    harvestPosList.push(((source.pos.x), (source.pos.y - 1)));
                }
                spawn.room.memory.harvestPosList = harvestPosList
            }
        }
        console.log(harvestPosList[0]);
    }
};

module.exports = structureSpawn;
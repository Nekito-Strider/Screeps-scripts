var structureSpawn = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {
       /** BAD IDEA, WILL USE UP CPU TO CALCULATE MINING LOCATIONS EVERY LOOP. MAYBE USE A CREEP TO STORE LOCATIONS TO A MEMORY?
       
        var harvestPosList = [];
        const terrain = new Room.Terrain(spawn.room.name);
        for (var source in spawn.room.source) {
            if (terrain.get((source.pos.x + 1), (source.pos.y)) !== TERRAIN_MASK_WALL) {
                harvestPos.push(((source.pos.x + 1), source.pos.y));
            }
            if (terrain.get((source.pos.x + 1), (source.pos.y - 1)) !== TERRAIN_MASK_WALL) {
                harvestPos.push(((source.pos.x + 1), (source.pos.y - 1)));
            }
            if (terrain.get((source.pos.x), (source.pos.y - 1)) !== TERRAIN_MASK_WALL) {
                harvestPos.push(((source.pos.x), (source.pos.y - 1)));
            }
        }
        console.log(harvestPosList[0]);*/
    }
};

module.exports = structureSpawn;
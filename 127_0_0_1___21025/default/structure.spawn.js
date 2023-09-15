var structureSpawn = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {
        var harvestPosList = [];
        const terrain = new Room.Terrain(spawn.room)
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
            console.log(source.pos.x);
        }
        console.log(harvestPosList);
    }
};

module.exports = structureSpawn;
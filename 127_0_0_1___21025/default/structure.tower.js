var structureTower = {

    /** @param {Tower} tower **/
    run: function (tower) {
        //tower logic
        var tower = Game.spawns['Spawn1'].room.find('FIND_MY_STRUCTURES', {
            filter: { structureType: STRUCTURE_TOWER }
        });
        if (tower.length) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
};

module.exports = structureTower;
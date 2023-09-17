var structureSpawn = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {
        console.log('spawn running');
        //spawning logic

        var sources = spawn.room.find(FIND_SOURCES);
        var localCreeps = _.filter(Game.creeps, (creep) => creep.room.name == spawn.room.name);
        var harvesters = _.filter(localCreeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(localCreeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(localCreeps, (creep) => creep.memory.role == 'builder');
        var laborers = _.filter(localCreeps, (creep) => creep.memory.role == 'laborer');
        var haulers = _.filter(localCreeps, (creep) => creep.memory.role == 'hauler');
        var meleeAttackers = _.filter(localCreeps, (creep) => creep.memory.role == 'attackerMelee');

        if (spawn.room.energyCapacityAvailable < 500) {
            if (laborers.length < 2) {
                var newName = 'Laborer' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'laborer' } });
            } else if (laborers.length >= 2 && upgraders.length < 1) {
                var newName = 'Upgrader' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } });
            }
        } else if ( spawn.room.energyCapacityAvailable >= 500) {
            if (harvesters.length < sources.length) {
                var newName = 'Harvester' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: 'harvester', hasHauler: false } })
            } else if (haulers.length < harvesters.length) {
                var newName = 'Hauler' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'hauler', hasHarvester: false } });
            }
        }
        
        if (spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
};

module.exports = structureSpawn;
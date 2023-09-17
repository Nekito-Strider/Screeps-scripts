var structureSpawn = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {
        //spawning logic
        var localSources = spawn.room.find(FIND_SOURCES);
        let localSourceIds = [];
        for (var i in localSources) {
            source = localSources[i];
            localSourceIds.push(source.id);
        }
        var localCreeps = _.filter(Game.creeps, (creep) => creep.room.name == spawn.room.name);
        var harvesters = _.filter(localCreeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(localCreeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(localCreeps, (creep) => creep.memory.role == 'builder');
        var labourers = _.filter(localCreeps, (creep) => creep.memory.role == 'labourer');
        var haulers = _.filter(localCreeps, (creep) => creep.memory.role == 'hauler');
        var meleeAttackers = _.filter(localCreeps, (creep) => creep.memory.role == 'attackerMelee');

        //set local memory states
        spawn.room.memory.localSourceIds = localSourceIds;

        if (spawn.room.energyCapacityAvailable < 500 || localCreeps.length == 0) {
            if (labourers.length < 2) {
                var newName = 'Labourer' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'labourer' } });
            } else if (labourers.length >= 2 && upgraders.length < 1) {
                var newName = 'Upgrader' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } });
            }
        } else if (spawn.room.energyCapacityAvailable >= 500) {
            if (harvesters.length < spawn.room.memory.localSources.length) {
                var newName = 'Harvester' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: 'harvester', hasHauler: false, mySourceId: spawn.room.memory.localSourceIds[harvesters.length] } })
                
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
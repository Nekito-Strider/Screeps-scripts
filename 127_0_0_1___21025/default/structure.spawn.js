let structureSpawn = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {
        //spawning logic
        let localSources = spawn.room.find(FIND_SOURCES);
        let localSourceIds = [];
        for (let i in localSources) {
            source = localSources[i];
            localSourceIds.push(source.id);
        }
        let localCreeps = _.filter(Game.creeps, (creep) => creep.room.name == spawn.room.name);
        let harvesters = _.filter(localCreeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(localCreeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(localCreeps, (creep) => creep.memory.role == 'builder');
        let labourers = _.filter(localCreeps, (creep) => creep.memory.role == 'labourer');
        let haulers = _.filter(localCreeps, (creep) => creep.memory.role == 'hauler');
        let meleeAttackers = _.filter(localCreeps, (creep) => creep.memory.role == 'attackerMelee');

        //set local memory states
        spawn.room.memory.localSourceIds = localSourceIds;
        if (spawn.room.energyCapacityAvailable < 500 || localCreeps.length == 0) {
            if (labourers.length < 2) {
                let newName = 'Labourer' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'labourer' } });
            } else if (labourers.length >= 2 && upgraders.length < 1) {
                let newName = 'Upgrader' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } });
            }
        } else if (spawn.room.energyCapacityAvailable >= 500) {
            if (harvesters.length < spawn.room.memory.localSources.length) {
                let newName = 'Harvester' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: 'harvester', hasHauler: false, mySourceId: spawn.room.memory.localSourceIds[harvesters.length] } })
            } else if (haulers.length < harvesters.length) {
                let newName = 'Hauler' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'hauler', hasHarvester: false } });
            }
        }

        if (spawn.spawning) {
            let spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
};

module.exports = structureSpawn;
let structureSpawn = {

    /** @param {Spawn} spawn **/
    run: function (spawn) {
        //spawning logic
        let localSources = spawn.room.find(FIND_SOURCES);
        let localSourceIds = [];
        for (let source in localSources) {
            source = localSources[source];
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

        //spawning control flow
        if (spawn.room.energyCapacityAvailable < 550 || localCreeps.length == 0) {
            if (spawn.room.energyAvailable < 400) {
                if (labourers.length < 2) {
                    let newName = 'Labourer' + Game.time;
                    console.log('Now spawning: ' + newName);
                    spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                        { memory: { role: 'labourer' } });
                } else if (upgraders.length < 1) {
                    let newName = 'Upgrader' + Game.time;
                    console.log('Now spawning: ' + newName);
                    spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                        { memory: { role: 'upgrader' } });
                }
            } 
            else if (spawn.room.energyAvailable >= 400) {
                if (labourers.length < 2) {
                    let newName = 'Labourer' + Game.time;
                    console.log('Now spawning: ' + newName);
                    spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], newName,
                        { memory: { role: 'labourer' } });
                } else if (upgraders.length < 1) {
                    let newName = 'Upgrader' + Game.time;
                    console.log('Now spawning: ' + newName);
                    spawn.spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], newName,
                        { memory: { role: 'upgrader' } });
                }
            }
        } else if (spawn.room.energyCapacityAvailable >= 550) {
            if (harvesters.length < localSourceIds.length && harvesters.length < haulers.length) {
                let newName = 'Harvester' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                    { memory: { role: 'harvester', mySourceId: spawn.room.memory.localSourceIds[harvesters.length] } })
            } 
            else if (haulers.length < harvesters.length) {
                let newName = 'Hauler' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'hauler', 
                    myHarvesterId: harvesters[haulers.length - 1].id, 
                    mySourceId: spawn.room.memory.localSourceIds[harvesters.length],
                    collect : true
                } });
            } 
            else if (upgraders.length < 1) {
                let newName = 'Upgrader' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader' } });
            } 
            else if (builders.length < 1) {
                let newName = 'Builder' + Game.time;
                console.log('Now spawning: ' + newName);
                spawn.spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'builder' } });
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
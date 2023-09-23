var roleHauler = {
    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.collect) {

            if(creep.memory.myContainerId) {
                let myContainer = Game.getObjectById(creep.memory.myContainerId);
                switch (creep.withdraw(myContainer, RESOURCE_ENERGY)) {
                    case OK || ERR_NOT_ENOUGH_RESOURCES:
                        break;
                    case ERR_INVALID_TARGET:
                        creep.memory.myContainerId = undefined;
                        break;
                    case ERR_FULL:
                        creep.memory.collect = false;
                        break;
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(myContainer);
                        break;
                }
            }
            else if(creep.memory.myHarvesterId) {

                let myHarvester = Game.getObjectById(creep.memory.myHarvesterId);
                if ( myHarvester !== null && myHarvester.memory.myContainerId) {
                    creep.memory.myContainerId = myHarvester.memory.myContainerId;
                }
                if(creep.pos.isNearTo(myHarvester)) {
                    let target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    switch (creep.pickup(target)) {
                        case OK:
                            break;
                        case ERR_INVALID_TARGET:
                            break;
                        case  ERR_NOT_IN_RANGE:
                            creep.moveTo(target);
                            break;
                        case ERR_FULL:
                            creep.memory.collect = false;
                            break;
                    }
                }
                else {
                    creep.moveTo(myHarvester);
                }
                
            }
        }
        else {
            if(creep.memory.task){
                creep.say('i am on task'); 
                let target = Game.getObjectById(creep.memory.task);
                switch (creep.transfer(target, RESOURCE_ENERGY)) {
                    case OK:

                        break;
                    case ERR_NOT_ENOUGH_RESOURCES:

                        creep.memory.collect = true;
                        break;
                    case ERR_INVALID_TARGET:
                        creep.memory.task = undefined;
                        break;
                    case ERR_FULL:
                        creep.memory.task = undefined;
                        break;
                    case ERR_NOT_IN_RANGE:

                        creep.moveTo(target);
                        break;
                }
            } else {
                creep.say('I am lost');
                let myStructures = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION || STRUCTURE_TOWER}
                });
                let mySpawns = creep.room.find(FIND_MY_SPAWNS);
                let emptyStructureIds = [];
                console.log(myStructures);
                for(let i in mySpawns) {
                    let spawn = mySpawns[i];
                    if (spawn.store.getUsedCapacity(RESOURCE_ENERGY) !== spawn.store.getCapacity(RESOURCE_ENERGY)){
                        emptyStructureIds.push(spawn.id);
                    }
                }
                for(let i in myStructures) {
                    let structure = myStructures[i];
                    if (structure.store.getUsedCapacity(RESOURCE_ENERGY) !== structure.store.getCapacity(RESOURCE_ENERGY)) {
                        emptyStructureIds.push(structure.id);
                    }
                }
                console.log(emptyStructureIds);
                creep.memory.task = emptyStructureIds[0];
            }
        }
    }
};

module.exports = roleHauler;
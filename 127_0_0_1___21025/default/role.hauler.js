var roleHauler = {
    /** @param {Creep} creep **/
    run: function (creep) {
        //Assign a harvester/container if creep has no harvester and there is one available
        if (creep.ticksToLive > 1) {
            if (!creep.memory.hasHarvester) {
                var localCreeps = creep.room.find(FIND_MY_CREEPS);
                var localHarvesters = _.filter(localCreeps, (creep) => creep.memory.role == 'harvester');
                let localContainers = creep.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
                for (var harvester in localHarvesters) {
                    if (harvester.hasHauler = false) {
                        creep.memory.myHarvesterId = harvester.id;
                        creep.memory.hasHarvester = true;
                        harvester.memory.myHaulerId = creep.id;
                        harvester.memory.hasHauler = true;
                        //check to see if any local containers have the same pos as my harvester and if so store its ID
                        for (let container in localContainers) {
                            if (harvester.pos == container.pos) {
                                creep.memory.myContainerId = container.id;
                                creep.memory.hasContainer = true;
                                break;
                            }
                        }
                        break;
                    }
                }
            } else if (!creep.memory.hasContainer) {
                let localContainers = creep.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
                for (let container in localContainers) {
                    if (Game.structures[creep.memory.myHarvesterId].pos == container.pos) {
                        creep.memory.myContainerId = container.id;
                        creep.memory.hasContainer = true;
                        break;
                    }
                }
            }
        } else { //if about to die reset harvesters hauler assignment
            Game.creeps[creep.memory.myHarvesterId].memory.hasHauler = false;
        }

        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.collect = true;
            creep.say('collect');
        } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
            creep.memory.collect = false
            creep.say('haul');
        }

        if (creep.memory.collect) {
            if (creep.withdraw(Game.structures[myContainerId], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //if not in range for container withdraw then move to container
                creep.moveTo(Game.structures[myContainerId]);
            } else if (creep.withdraw(Game.structures[myContainerId], RESOURCE_ENERGY) == ERR_INVALID_TARGET) { //if I dont have a container 
                creep.memory.hasContainer = false;
                if (!creep.isNearTo(Game.creeps[creep.myHarvesterId])) { //if im not near my harvester
                    if (creep.moveTo(Game.creep[myHarvesterId]) == ERR_INVALID_TARGET) { //if no target when moving to my harvester (harvester dies) assign new harvester   
                        creep.memory.hasHarvester = false;
                    } else { //move to harvester
                        creep.moveTo(Game.creep[myHarvesterId]);
                    }
                } else { //if creep is next to dropped resources pick them up
                    targets = creep.room.find(FIND_DROPPED_RESOURCES);
                    if (targets.length > 0) {
                        for (let target in targets) {
                            if (creep.pos.isNearTo(target)) {
                                creep.pickup(target);
                                break;
                            }
                        }
                    }

                }
            }

        } else {
            let targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_SPAWN, structureType: STRUCTURE_EXTENSION}
            });
            if(creep.transfer(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    }
};

    module.exports = roleHauler;
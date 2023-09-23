var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let mySource = Game.getObjectById(creep.memory.mySourceId); //sourceId is stored in memory on spawn

        if (!creep.memory.myHaulerId) {
            let availableHaulers = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'hauler' && creep.memory.myHarvesterId !== undefined);
            if (availableHaulers.length > 0) {
                creep.memory.myHaulerId = availableHaulers[0].id;
            }
        }

        if (creep.memory.myContainer) { // if I have a container move to my container
            let myContainer = Game.getObjectById(creep.memory.myContainerId);
            if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(myContainer, { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        } else { // otherwise see if I have a hauler and harvest or move to my source
            let Containers = creep.room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });
            for(let i in Containers) {
                let container = Containers[i];
                if (container.pos.x == creep.pos.x && container.pos.y == creep.pos.y) {
                    creep.memory.myContainerId = container.id;
                    break;
                }
            }

            if (creep.memory.myHaulerId) { //if I do check and see if it has a container and if so assign it to me
                let myHauler = Game.getObjectById(creep.memory.myHaulerId);
                if (myHauler.memory.myContainerId) {
                    creep.memory.myContainerId = myHauler.memory.myContainerId;
                }  else {
                    creep.memory.myHaulerId = undefined;
                }
            }

            if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mySource, { visualizePathStyle: { stroke: '#ffaa00' } })
            }

        }
    }
};

module.exports = roleHarvester;
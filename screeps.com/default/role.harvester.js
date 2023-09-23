var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let mySource = Game.getObjectById(creep.memory.mySourceId); //sourceId is stored in memory on spawn

        if (creep.memory.myContainer) { // if I have a container move to my container
            let myContainer = Game.getObjectById(creep.memory.myContainerId);
            if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(myContainer, { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        } else { // otherwise see if I have a hauler and harvest or move to my source
            let myContainers = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            })
            console.log('i am here');
            for(let i in myContainers) {
                let container = myContainer[i];
                if (container.pos == creep.pos) {
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
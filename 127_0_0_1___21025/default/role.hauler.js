var roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //Assign a harvester if creep has no harvester and there is one available
	    if(!creep.memory.hasHarvester) {
            var localCreeps = creep.room.find(FIND_MY_CREEPS);
            var localHarvesters = _.filter(localCreeps, (creep) => creep.memory.role == 'harvester');
            for(var harvester in localHarvesters) {
                if(harvester.hasHauler = false){
                    creep.memory.myHarvesterId = harvester.id;
                    creep.memory.hasHarvester = true;
                    harvester.memory.myHaulerId = creep.id;
                    harvester.memory.hasHauler = true;
                    break;
                }
            }
        }
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.haul = false;
            creep.say('gather');
       } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
            creep.memory.haul = true;
            creep.say('haul');
       }
        if(creep.moveTo(Game.creeps[myHarvesterId]) == ERR_INVALID_TARGET) {
            creep.memory.hasHauler = false;
        }
	}
};

module.exports = roleHauler;
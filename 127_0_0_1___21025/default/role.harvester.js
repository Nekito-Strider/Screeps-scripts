var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var mySource = Game.getObjectById(creep.memory.mySourceId);
	    if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mySource, { visualizePathStyle: { stroke: '#ffaa00' } });
       }
	}
};

module.exports = roleHarvester;
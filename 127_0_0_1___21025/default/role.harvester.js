var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let source = '';
	    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } })
       }
	}
};

module.exports = roleHarvester;
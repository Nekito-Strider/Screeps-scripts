var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {
		//set memory
		//Is creep stored energy empty? if yes harvest if no work
		if (creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.collect = true;
			creep.say('collecting');
		} else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
			creep.memory.collect = false;
		}

		if (creep.memory.collect) {
			let containers = creep.room.find(FIND_MY_STRUCTURES, {
				filter: { structureType: STRUCTURE_CONTAINER, structureType: STRUCTURE_EXTENSION }
			})
			let notEmptyContainers = []
			for (let i in containers) {
				let container = containers[i];
				if (container.store.getUsedCapacity !== 0) {
					notEmptyContainers.push(container);
				}
			}

			if (creep.withdraw(notEmptyContainers[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(notEmptyContainers[0]);
			}
		} else {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (!creep.memory.constructionSite) {
				creep.memory.constructionSite = targets[0].id;
			} else {
				if (creep.build(Game.getObjectById(creep.memory.constructionSite)) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.getObjectById(creep.memory.constructionSite), { visualizePathStyle: { stroke: '#ffffff' } });
				} else if (creep.build(Game.getObjectById(creep.memory.constructionSite)) == ERR_INVALID_TARGET) {
					creep.memory.constructionSite = targets[0].id;
				}
			}
		}
	}
};

module.exports = roleBuilder;
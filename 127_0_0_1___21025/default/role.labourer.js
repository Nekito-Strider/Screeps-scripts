var roleLabourer = {
     /** @param {Creep} creep **/
     run: function (creep) {

          //Is room energy full?
          if (creep.room.energyAvailable !== creep.room.energyCapacityAvailable) {
               creep.memory.roomEnergyFull = false;
          } else {
               creep.memory.roomEnergyFull = true;
          }
          //Is creep stored energy empty? if yes harvest if no work
          if (creep.store[RESOURCE_ENERGY] == 0) {
               creep.memory.harvest = true;
               creep.say('harvest');
          } else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
               creep.memory.harvest = false;
          }

          //if the room energy storages are full then build
          if (creep.memory.roomEnergyFull) {
               if (creep.memory.building && creep.memory.harvest) {
                    creep.memory.building = false;
                    creep.say('harvest');
               }
               if (!creep.memory.building && !creep.memory.harvest) {
                    creep.memory.building = true;
                    creep.say('build');
               }
               if (creep.memory.building && !creep.memory.harvest) {
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
               else {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (!creep.memory.hasRoom) {
                         if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                              if (creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } }) == ERR_NO_PATH) {
                                   creep.memory.hasRoom = true;
                              }
                         }
                    } else {
                         if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                              if (creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } }) == ERR_NO_PATH) {
                                   creep.memory.hasRoom = false;
                              }
                         }
                    }

               }
          } else if (!creep.memory.roomEnergyFull) {
               if (creep.memory.harvest) {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (!creep.memory.hasRoom) {
                         if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                              if (creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } }) == ERR_NO_PATH) {
                                   creep.memory.hasRoom = true;
                              }
                         }
                    } else {
                         if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                              if (creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } }) == ERR_NO_PATH) {
                                   creep.memory.hasRoom = false;
                              }
                         }
                    }
               } else {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                         filter: (structure) => {
                              return (structure.structureType == STRUCTURE_EXTENSION ||
                                   structure.structureType == STRUCTURE_SPAWN ||
                                   structure.structureType == STRUCTURE_TOWER) &&
                                   structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                         }
                    });
                    if (targets.length > 0) {
                         if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                              creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                         }
                    }
               }
          }
     }
};
module.exports = roleLabourer;
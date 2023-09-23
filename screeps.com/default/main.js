var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleLabourer = require('role.labourer');
let roleHauler = require('role.hauler');
var roleAttackerMelee = require('role.attackerMelee');
var structureSpawn = require('structure.spawn');

module.exports.loop = function () {

    //Clear memory of dead creep names
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    /*Clear memory of non-existing spawn
    for (var name in Memory.spawns) {
        if (!Game.spawns[name]) {
            delete Memory.spawns[name];
            console.log('Clearing non-existing spawn memory', name);
        }
    }*/
    //spawn script execution
    for (var name in Game.spawns) {
        var spawn = Game.spawns[name];
        structureSpawn.run(spawn);
    }
    //role script executions
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'labourer') {
            roleLabourer.run(creep);
        }
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'attackerMelee') {
            roleAttackerMelee.run(creep);
        }



        const elapsed = Game.cpu.getUsed();
        //console.log('Script used ' + elapsed + ' CPU time');
    }
};
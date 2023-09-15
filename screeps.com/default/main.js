var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleLaborer = require('role.laborer');
var roleAttackerMelee = require('role.attackerMelee');
var structureSpawn = require('structure.spawn')

module.exports.loop = function () {
    //Clear memory of dead creep names
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //tower logic
    var tower = Game.spawns['Spawn1'].room.find('FIND_MY_STRUCTURES', {
        filter: {structureType: STRUCTURE_TOWER}
    });
    if(tower.length) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
   
    //spawning logic
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var laborers = _.filter(Game.creeps, (creep) => creep.memory.role == 'laborer');
    var meleeAttackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attackerMelee');

    if(laborers.length < 2) {
        var newName = 'Laborer' + Game.time;
        console.log('Less than 2 laborers. Now spawning: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'laborer'}});
    } else if(laborers.length >= 2 && upgraders.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Laborers OK. Now spawning: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, 
            {memory: {role: 'upgrader'}});
    } else if(laborers.length == 2 && upgraders.length == 1 && builders.length < 1) {
        var newName = 'Builder' + Game.time;
        console.log('Laborers OK. Upgrader OK. Now spawning: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, 
            {memory: {role: 'builder'}});
    } /**else if(laborers.length == 2 && upgraders.length == 1 && builders.length == 1 && meleeAttackers < 1) {
        var newName = 'M Attacker' + Game.time;
        console.log('Laborers OK. Upgrader OK. Builder OK. Now spawning: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([ATTACK,TOUGH,MOVE], newName, 
            {memory: {role: 'attackerMelee'}}); 
    } **/
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    //role script executions
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'laborer') {
            roleLaborer.run(creep);
        }
        if(creep.memory.role == 'attackerMelee') {
            roleAttackerMelee.run(creep);
        }
    //spawn script execution
    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        structureSpawn.run(spawn);
    }

    const elapsed = Game.cpu.getUsed();
    console.log('Script used ' + elapsed + ' CPU time');
    }
}
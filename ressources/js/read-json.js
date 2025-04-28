let obj = require('./unique.json');
console.log(obj['VehPower'].valueOf().sort(function(a, b){return a-b}));
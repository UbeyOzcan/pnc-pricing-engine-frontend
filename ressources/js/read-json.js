let obj = require('../../unique.json');
let keys = Object.keys(obj);
for (let i = 0; i < keys.length; i++) {
    console.log(keys[i]);
    console.log(obj[keys[i]].valueOf().sort(function(a, b){return a-b}));
}
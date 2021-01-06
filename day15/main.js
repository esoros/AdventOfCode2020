let input = [0,8,15,2,12,1,4]
//we can probably pre-allocate two arrays for the last two access in order to make this
//not take 20 seconds...
let spokenMap = new Map()
var lastSpoken = 0

for(var i = 0; i < input.length; ++i) {
    spokenMap.set(input[i], [i + 1])
    lastSpoken = input[i]
}

for(var i = input.length + 1; i <= 30000000; i++) {    
    
    let turns = spokenMap.get(lastSpoken)
    var spoken
    if(turns.length == 1) {
        spoken = 0
    } else {
        spoken = turns[turns.length - 1] - [turns[turns.length - 2]]
    }

    if(spokenMap.has(spoken)) {
        spokenMap.get(spoken).push(i)
    } else {
        spokenMap.set(spoken, [i])
    }
    lastSpoken = spoken
}

console.log(lastSpoken)
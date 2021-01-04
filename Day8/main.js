const { Console } = require('console');
const fs = require('fs');

function stringToOp(str) {
    //nop +0
    let parts = str.split(' ')
    return {
        instruciton: parts[0],
        val: parseInt(parts[1]),
        executed: false
    }
}

function copyInstructions(instructions) {
    let result = []
    instructions.forEach(i => {
        result.push({
            instruciton: i.instruciton,
            val: i.val,
            executed: false
        })
    })
    return result
}

function execute(instructions) {
    let ip = 0
    let acc = 0
    while(ip < instructions.length && !instructions[ip].executed) {
        let instruction = instructions[ip]
        instruction.executed = true
        switch(instruction.instruciton) {
            case "nop": 
                ip += 1
                break
            case "jmp":
                ip += instruction.val
                break
            case "acc":
                ip += 1
                acc += instruction.val
                break
        }
    }

    return {
        doesTerminate: ip == instructions.length,
        acc: acc,
    }
}

fs.readFile("./input.txt", "utf8", (_, data) => {
    let instructions = data.split("\n").map(str => stringToOp(str))
    
    let instructionsToChange = []
    for(var i = 0; i < instructions.length; i++) {
        let instruction = instructions[i]
        if(instruction.instruciton == "nop" || instruction.instruciton == "jmp") {
            instructionsToChange.push(i)
        }
    }

    instructionsToChange.forEach(index => {
        let newProgram = copyInstructions(instructions)
        let instructionToSwap = newProgram[index]
        if(instructionToSwap.instruciton == "nop") {
            instructionToSwap.instruciton = "jmp"
        } else {
            instructionToSwap.instruciton = "nop"
        }
        
        let result = execute(newProgram)
        if(result.doesTerminate) {
            console.log(result)
        }
    })
});


let fs = require("fs")
let rulesMap = new Map()

//javascript allowing multiple return values actually comes in handy here lol...
function matchesRules(expression, ruleString, startIndex) {
    console.log(expression, ruleString, startIndex)
    if(isNaN(startIndex)) {
        return false
    }
    
    if(startIndex >= expression.length) {
        return false
    }
    
    if(ruleString.includes("\"")) {
        if(expression[startIndex] == ruleString[1]) {
            return startIndex + 1
        } else {
            return false
        }
    }
    else if(ruleString.includes("|")) {
        let rules = ruleString.split("|")
        let lhs = rules[0].split(" ").map(r => parseInt(r)).filter(r => !isNaN(r))
        let rhs = rules[1].split(" ").map(r => parseInt(r)).filter(r => !isNaN(r))
        
        var lhsIndex = startIndex
        lhs.forEach(rule => {
            lhsIndex = matchesRules(expression, rulesMap.get(rule), lhsIndex)
        })

        if(parseInt(lhsIndex)) {
            return lhsIndex
        }

        var rhsIndex = startIndex
        rhs.forEach(rule => {
            rhsIndex = matchesRules(expression, rulesMap.get(rule), rhsIndex)
        })

        return rhsIndex
    
    } else {
        let rules =  ruleString.split(" ").map(r => parseInt(r)).filter(r => !isNaN(r))
        var index = startIndex
        rules.forEach(rule => {
            index = matchesRules(expression, rulesMap.get(rule), index)
        })
        
        return index
    }
}

fs.readFile("input.txt", "utf8", (_, data) => {
    let parts = data.split("\n\n")
    let rules = parts[0].split("\n")
    let input = parts[1].split("\n")
    
    rules.forEach(rule => {
        parts = rule.split(":")
        rulesMap.set(parseInt(parts[0]), parts[1].trim())
    })  
 
    let result = 0
    input.forEach(i => {
        result +=  matchesRules(i.trim(), rulesMap.get(0), 0) == i.length
    })
    console.log(result)
})

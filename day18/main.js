const fs = require("fs")

let operandsUsed = [ "*", "+" ]
let precedence = new Map()
precedence.set("*", 1)
precedence.set("+", 2)

function Stack() {
    this.data = []
    this.top = () => this.data[this.data.length -1]
    this.push = (num) => this.data.push(num)
    this.pop = (num) => this.data.pop(num)
    this.isEmpty = () => this.data.length == 0
}

function infixToPostfix(exp) {
    let output = []
    let operands = new Stack()

    exp = exp.replace(/\(/g, " ( ")
    exp = exp.replace(/\)/g, " ) ")
    let tokens = exp.split(" ").filter(str => str != "")
    tokens.forEach(token => {
        
        if(parseInt(token)) {
            output.push(parseInt(token))
        }
        
        if(operandsUsed.includes(token)) {
            //higher precedence operators need to be evaluted first, so those will get poped off the stack
            while(!operands.isEmpty() && operands.top() != "(" && precedence.get(operands.top()) >= precedence.get(token)) {
                output.push(operands.pop())
            }
            
            operands.push(token)
        }

        if(token == "(") {
            operands.push(token)
        }

        if(token == ")") {
            while(!operands.isEmpty() && operands.top() != "(") {
                output.push(operands.pop())
            }
            
            operands.pop()
        }
    })

    while(!operands.isEmpty()) {
        output.push(operands.pop())
    }

    return output.join(" ")
}

function evaluatePostfix(expression) {
    let stack = new Stack()
    let tokens = expression.split(" ")
    tokens.forEach(token => {
        if(parseInt(token)) {
            stack.push(parseInt(token))
        } else {
            var result
            if(token == "+") {
                result = stack.pop() + stack.pop()
            } else {
                result = stack.pop() * stack.pop()
            }
            stack.push(result)
        }
    })

    return stack.pop()
}


fs.readFile("input.txt", "utf8", (_, data) => {
    let result = 0
    let lines = data.split("\n")
    lines.forEach(line => {
        let postfix = infixToPostfix(line)
        result += evaluatePostfix(postfix)
    })
    console.log(result)
})

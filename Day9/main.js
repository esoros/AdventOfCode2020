const fs = require("fs")

//part 2 -- 31161678

fs.readFile("input.txt", "utf8", (_, data) => {
    
    //part 1 - find the first number that isn't the sum of two of the 25 numbers before it
    /*
    let nums = data.split("\n").map(n => parseInt(n))    
    for(var i = 25; i < nums.length; i++) {
        let check = nums[i]
        let possible = nums.slice(i - 25, i)
        if (!possible.some(n =>  possible.includes(check - n)))  {
            console.log(check)
            process.exit()
        }
    }  31161678 */ 

    //part 2 -- find a range of contiguous numbers that add to 31161678
    let nums = data.split("\n").map(n => parseInt(n))
    let target = 31161678

    var startIndex = 0
    while(startIndex < nums.length) {
       
        var i = startIndex
        var sum = 0
        var sums = []
        while(sum < target) {
            sum += nums[i]
            sums.push(nums[i])
            i += 1
        }
        
        if(sum == target) {
            let sorted = sums.sort()
            console.log(sorted[0] + sorted[sorted.length - 1])
            process.exit()
        }
        
        startIndex += 1
    }
})
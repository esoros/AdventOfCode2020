const fs = require("fs");
const { Z_ASCII } = require("zlib");

function includesCube(cubes, cube) {
    return cubes.some(c => c.x == cube.x && c.y == cube.y && c.z == cube.z && c.w == cube.w)
}

function cyclePt2(activeCubes) {
    let newActiveCubes = []
    let neighborMap = new Map();
    let deltas = [-1, 0, 1]
    
    activeCubes.forEach(cube => {
        deltas.forEach(xdelta => {
            deltas.forEach(ydelta => {
                deltas.forEach(zdelta => {
                    deltas.forEach(wDealta => {
                        if(xdelta != 0 || ydelta != 0 || zdelta != 0 || wDealta != 0) {
                            let neighbor = {
                                x: cube.x + xdelta,
                                y: cube.y + ydelta,
                                z: cube.z + zdelta,
                                w: cube.w + wDealta
                            }
                            let key = JSON.stringify(neighbor)
                            if(neighborMap.has(key)) {
                                neighborMap.set(key, neighborMap.get(key) + 1)
                            } else {
                                neighborMap.set(key, 1)
                            }     
                        } 
                    })                  
                })
            })
        })
    })

    neighborMap.forEach((val, key, _) => {
        let cube = JSON.parse(key)
        
        if(val == 3 && !includesCube(activeCubes, cube)) {
            newActiveCubes.push(cube)
        }
        
        if((val == 2 || val == 3) && includesCube(activeCubes, cube)) {
            newActiveCubes.push(cube)
        }
    })

    return newActiveCubes
}


function cyclePt1(activeCubes) {
    let newActiveCubes = []
    let neighborMap = new Map();
    let deltas = [-1, 0, 1]
    
    activeCubes.forEach(cube => {
        deltas.forEach(xdelta => {
            deltas.forEach(ydelta => {
                deltas.forEach(zdelta => {
                    if(xdelta != 0 || ydelta != 0 || zdelta != 0) {
                        let neighbor = {
                            x: cube.x + xdelta,
                            y: cube.y + ydelta,
                            z: cube.z + zdelta
                        }
                        let key = JSON.stringify(neighbor)
                        if(neighborMap.has(key)) {
                            neighborMap.set(key, neighborMap.get(key) + 1)
                        } else {
                            neighborMap.set(key, 1)
                        }     
                    }                   
                })
            })
        })
    })

    neighborMap.forEach((val, key, _) => {
        let cube = JSON.parse(key)
        
        if(val == 3 && !includesCube(activeCubes, cube)) {
            newActiveCubes.push(cube)
        }
        
        if((val == 2 || val == 3) && includesCube(activeCubes, cube)) {
            newActiveCubes.push(cube)
        }
    })

    return newActiveCubes
}

var activeCubes = []
fs.readFile("./input.txt", "utf8", (_, data) => {
    let lines = data.split("\n");
    for(var y = 0; y < lines.length; y++) {
        let line = lines[y]
        for(var x = 0; x < lines.length; x++) {
            if(line[x] == "#") {
                activeCubes.push({
                    x: x,
                    y: y,
                    z: 0,
                    w: 0
                })
            }
        }
    }
    
    for(var i = 0; i < 6; i++) {
        activeCubes = cyclePt2(activeCubes)
    }
    console.log(activeCubes.length)
})
input.onButtonPressed(Button.A, function() {
    if (px > 0) {
        led.unplot(px, py)
        px += -1
    }
})
input.onButtonPressed(Button.AB, function () {
    shoot = 1
})
input.onButtonPressed(Button.B, function () {
    if (px < 4) {
        led.unplot(px, py)
        px += 1
    }
})
let acc = 0
let time = 0
let killed: number[] =[]
let enemyX: number[] = []
let enemyY: number[] = []
let shoot = 0
let py = 0
let px = 0
let ex = 0
let index = 0
px += 2
py = 4
let my = 3
shoot = 0
let speed = 50  
for (let index2 = 0; index2 <= 4; index2++) {
    enemyX[index2] = Math.randomRange(0,4)
    enemyY[index2] = index2 * 1
    killed[index2] = 0
}
basic.forever(function() {
    led.plotBrightness(px, py, 255)
    for (let index3 = 0; index3 <= 4; index3++) {
        if (killed[index3] == 0) {
            led.unplot(enemyX[index3], enemyY[index3] - 1)
            led.plotBrightness(enemyX[index3], enemyY[index3], 255)
        }
    }
    if (shoot == 1) {
        led.plotBrightness(px, my, 51)
        for (let index4 = 0; index4 <= 4; index4++) {
            if (killed[index4] == 0 && (px == enemyX[index4] && my == enemyY[index4])) {
                killed[index4] = 1
            }
        }
    }
    basic.pause(25)
    led.unplot(px, my)
    my += -1
    if (time > speed) {
        time = 0
        acc += 1
        for (let index5 = 0; index5 <= 4; index5++) {
            enemyY[index5] = enemyY[index5] + 1
        }
    }
    if (my < 0) {
        shoot = 0
        my = 5
    }
    for (let index6 = 0; index6 <= 4; index6++) {
        if (killed[index6] == 0) {
            if (enemyY[index6] > 4) {
                basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
                basic.pause(200)
                basic.clearScreen()
                basic.showString("score:")
                basic.showNumber(acc)
            }
        }
    }
    time+= 1
    if (acc % 5 == 0) {
        speed += -3
        acc += 1
    }
    for(let index7 = 0; index7 <= 4; index7++) {
        if (enemyY[index7] > 4) {
            enemyY[index7] = -1
            enemyY[index7] = Math.randomRange(0,4)
            killed[index7] = 0
        }
    }
})

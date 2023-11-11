import kaboom from "kaboom"

// initialize context
kaboom({
    background: "#6499E9",
})

// define gravity
setGravity(900)
    const SPEED = 320
function spin(speed = 1200) {
    let spinning = false
    return {
        require: [ "rotate" ],
        update() {
            if (!spinning) {
                return
            }
            this.angle -= speed * dt()
            if (this.angle <= -360) {
                spinning = false
                this.angle = 0
            }
        },
        spin() {
            spinning = true
        },
    }
}


// load a sprite called "bean"
loadSprite("bean", "sprites/bean.png")
loadSprite("elang", "sprites/elang.png")
loadSprite("awan", "sprites/awan.png")
loadSprite("bg", "sprites/bg.png")
loadSprite("orang", "sprites/orang.png")
loadSprite("pohon", "sprites/pohon.png")


// compose the player game object from multiple components and add it to the game
scene("game", () => {

const bean = add([
    sprite("bean"),
        scale(3,3),
    pos(80, 40),
    area(),
    rotate(0),
        spin(),
    doubleJump(),
        body(),
])
bean.onDoubleJump(() => {
        bean.spin()
    })

    function pohon() {
        // add tree
        add([
        sprite("pohon"),
        scale(rand(0.2, 0.3), rand(0.2, 0.3)),
        pos(width(), height() - 28),
        anchor("botleft"),
        move(LEFT, 240),
        offscreen({ destroy: true }),

        "penghalang",
    ]);
        wait(3, pohon)

    }
    pohon()
let score = 0

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ])

    // increment score every frame
    onUpdate(() => {
        score++
        scoreLabel.text = score
    })

// press space to jump
onKeyPress("space", () => {

        bean.doubleJump()
    
});
add([
    rect(width() , 48),
    pos(0, height() - 48),
    area(),
    body({ isStatic: true }),
    color("#A6CF98"),
])
function awan() {
        // add tree
        add([
        sprite("awan"),
        scale(4,4),
        pos(width(), height() - rand(600,748)),
        anchor("botleft"),
        move(LEFT, rand(100,140)),
        offscreen({ destroy: true }),

        "awan"
    ]);
        wait(1, awan)

    }
    awan()


function penghalang() {
        // add tree
        add([
        sprite("elang"),
        scale(rand(3,5),(4,5)),

        area(),
        pos(width(), height() - 48),
        anchor("botleft"),
        move(LEFT, 340),
        offscreen({ destroy: true }),

        "platform"
    ]);
        wait(rand(1, 1.5), penghalang)

    }
    penghalang()

    function penghalang2() {
        // add tree
        add([
        sprite("orang"),
        scale(-0.1,0.1),

        area(),
        pos(width(), height() - 48),
        anchor("botleft"),
        move(LEFT, 540),
        offscreen({ destroy: true }),

        "platform"
    ]);
        wait(rand(2, 4), penghalang2)

    }
    penghalang2()

    const dirs = {
        "left": LEFT,
        "right": RIGHT,
        "up": UP,
        "down": DOWN,
    }

    for (const dir in dirs) {

        onKeyDown(dir, () => {
            bean.move(dirs[dir].scale(SPEED))

        })
    }

bean.onCollide("platform", () => {
    addKaboom(bean.pos);
    shake();
            go("lose")
});
})


scene("lose", () => {
    add([
        text("Bro benar benar berpikir dirinya adalah kelinci"),
    ])
    onKeyPress("space", () => go("game"))
    onGamepadButtonPress("south", () => go("game"))
})

go("game")

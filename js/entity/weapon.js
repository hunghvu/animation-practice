class Weapon {
    constructor(player) {
        
        this.player = player
        this.game = player.game;
        this.x = player.x;
        this.y = player.y;
        this.scaler = player.scaler;
        this.frameTime = player.frameTime

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Frames for orb
        this.orbList = []
        this.orbState = 0; // 0 is blue, 1 is orange, 2 is purprle
        // Orb angle.
        this.orbSpeed = 1;
        this.orbAngle = 0;
        this.radius = 100;
        this.orbFrameWidth = 16;
        this.orbFrameHeight = 16;

        this.loadAnimation();
    }

    loadAnimation() {
        let orbBlue = new Animator (this.spriteSheet, 80, 160, this.orbFrameWidth, this.orbFrameHeight, 1, this.frameTime, 0, false, true);
        let orbOrange = new Animator (this.spriteSheet, 96, 160, this.orbFrameWidth, this.orbFrameHeight, 1, this.frameTime, 0, false, true);
        let orbPurple = new Animator (this.spriteSheet, 112, 160, this.orbFrameWidth, this.orbFrameHeight, 1, this.frameTime, 0, false, true);
        this.orbList.push(orbBlue);
        this.orbList.push(orbOrange);
        this.orbList.push(orbPurple);
    }

    update() {

    }

    draw(ctx) {
        
        let radian = -this.orbAngle * Math.PI / 180;

        //+ this.radius * Math.cos(radian)
        //+ this.radius * Math.sin(radian)

        // Orb width and frame width have 1:2 ratio, but height is 1:3, so the formular are different
        this.orbList[this.orbState].drawFrame(this.game.clockTick, ctx, 
            this.player.canvasX + this.orbFrameWidth / 2 * this.scaler + this.radius * Math.cos(radian),
            this.player.canvasY + this.player.playerFrameHeight / 2 * 3 - this.orbFrameHeight / 2 * this.scaler +  this.radius * Math.sin(radian),
            3);
        this.orbAngle += this.orbSpeed;

        console.log(this.player.canvasX + this.orbFrameWidth / 2 * this.scaler + this.radius * Math.cos(radian))
    }
}
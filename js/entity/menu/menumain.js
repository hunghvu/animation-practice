/**
 * This class represents main menu of the game.
 */
class MenuMain {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.background = new Image(); // Set up menu background.
        this.background.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        // ctx.font = "44px Akaya Kanadaka";
        // ctx.fillStyle = "White";
        // ctx.fillText("Start", canvas.width / 12 * 5, canvas.height / 5 * 3); // Origin of fill text is bottom left, not top left.

        this.canvasInfoBoard = document.getElementById("infoBoard");
        this.ctxInfoBoard = this.canvasInfoBoard.getContext("2d");

        this.infoBoardBackground = new Image(); // Set up infoboard background, kind of redundant because it is hidden.
        this.infoBoardBackground.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        this.startButtonAreaX = 0;
        this.startButtonAreaY = 0;

        this.startButtonCanvas = document.createElement("canvas");
        this.startButtonCtx = this.startButtonCanvas.getContext("2d");

        this.buttonHover = false;


    }

    addMainMenuListener(canvas) {
        // Technically the menu is still there, but it is hidden behind a game screen layer, so might not be a problem.
        canvas.addEventListener("click", event => {this.privateCaptureButtonClick(event)}, {once: true});
        canvas.addEventListener("mousemove", event => {this.privateButtonVisualEffect(event)});

    }

    setInitialButtonLocation(canvas) {
        //Menu choices location
        this.startButtonAreaX = canvas.width / 12 * 5;
        this.startButtonAreaY = canvas.height / 5 * 3 - 50; // Origin of fill text is bottom left, not top left (?)
    }



    update() {

    }

    draw(ctx) {
        // console.log(true);
        ctx.drawImage(this.background, 513, 256, 256, 255, 0, 0, 388, 768);
        this.privateDrawButton(ctx);
        // this.ctxInfoBoard.drawImage(this.infoBoardBackground, 771, 1, 256, 255, 0, 0, 200, 768);
    }

    privateDrawButton(ctx) {

        this.startButtonCanvas.width = 100;
        this.startButtonCanvas.height = 75;

        this.startButtonCtx.font = "44px Akaya Kanadaka";
        // Button effect.
        if(this.buttonHover) {
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
            this.startButtonCtx.shadowColor = 'rgba(255, 255, 255, .8)';
            this.startButtonCtx.shadowBlur = 5;
            this.startButtonCtx.shadowOffsetX = 0;
            this.startButtonCtx.shadowOffsetY = 0;
            this.startButtonCtx.fillStyle = "Red" 
        } else {
            this.startButtonCtx.fillStyle = "White";
        }
        this.startButtonCtx.fillText("Start", 0, 50); // Origin of fill text is bottom left, not top left.
        ctx.drawImage(this.startButtonCanvas, this.startButtonAreaX, this.startButtonAreaY);
    }

    privateCaptureButtonClick(event) {
        // Only get mouse coordinate inside canvas
        let canvasRect = canvas.getBoundingClientRect();
        let newMouseX = event.clientX - canvasRect.left;
        let newMouseY = event.clientY - canvasRect.top;

        if (newMouseX >= this.startButtonAreaX && newMouseX <= this.startButtonAreaX + 100
            && newMouseY >= this.startButtonAreaY && newMouseY <= this.startButtonAreaY + 50) {
            startGame();
        }
    }

    privateButtonVisualEffect(event) {
        // Only get mouse coordinate inside canvas
        let canvasRect = canvas.getBoundingClientRect();
        let newMouseX = event.clientX - canvasRect.left;
        let newMouseY = event.clientY - canvasRect.top;

        if(newMouseX >= this.startButtonAreaX && newMouseX <= this.startButtonAreaX + 100
            && newMouseY >= this.startButtonAreaY && newMouseY <= this.startButtonAreaY + 50) {
            this.buttonHover = true;
        } else {
            this.buttonHover = false;
        }
    }
}
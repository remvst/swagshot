class Enemy extends Character {
    constructor() {
        super();

        const cols = ~~rnd(4, 8) * 2 + 1;
        const diagonalRows = ~~rnd(1, 4);
        const headRows = diagonalRows * 2 + ~~rnd(3, 6);
        const eyeRows = ~~rnd(1, headRows / 4);

        const spriteCanvas = createCanvas(cols, headRows, (ctx, can) => {
            const components = randomBrightColor();

            for (let row = 0 ; row < headRows ; row++) {
                for (let col = 0 ; col < cols ; col++) {

                    const consideredRow = min(row, headRows - row);
                    const consideredCol = min(col, cols - col - 1);

                    if (consideredRow < diagonalRows && consideredCol + consideredRow < diagonalRows) {
                        continue;
                    }

                    ctx.fillStyle = toColor(randomizeColor(components));
                    ctx.fillRect(col, row, 1, 1);
                }
            }

            ctx.fillStyle = toColor(invertColor(components));

            const eyeStartRow = ~~rnd(diagonalRows, headRows - eyeRows * 2);
            for (let row = 0 ; row < eyeRows * 2 ; row += 2) {
                const eyeCount = ~~rnd(1, cols * 0.6);
                for (let i = 0 ; i < eyeCount ; i++) {
                    ctx.fillRect(~~(cols / 2 - eyeCount + i * 2) + 1, row + eyeStartRow, 1, 1);
                }
            }
        });

        this.width = spriteCanvas.width * 4;
        this.height = spriteCanvas.height * 4;

        SPRITES.push(this.sprite = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'width': this.width,
            'height': this.height,
            'sprite': spriteCanvas
        });
        CYCLABLES.push(this);
    }

    cycle(e) {
        super.cycle(e);

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z;
    }

    remove() {
        remove(CYCLABLES, this);
        remove(SPRITES, this.sprite);
    }
}

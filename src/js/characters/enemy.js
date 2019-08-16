class Enemy extends Character {
    constructor() {
        super();

        const matrix = pick([
            [
                [0, 0, 1, 1, 0],
                [0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 2, 2, 1, 1],
                [1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [0, 1, 0, 0, 0],
                [0, 1, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 1, 1, 2, 1],
                [0, 1, 1, 1, 1],
                [0, 0, 1, 0, 1],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0]
            ]
        ]);

        const spriteCanvas = createCanvas(9, 8, (ctx, can) => {
            const mainColor = multiply(randomBrightColor(), 0.5);

            const half = () => {
                renderMatrix(matrix, ctx, x => {
                    if (x == 1) {
                        return randomizeColor(mainColor);
                    } else {
                        return randomizeColor(invertColor(mainColor));
                    }
                });
            };

            half();
            ctx.translate(can.width, 0);
            ctx.scale(-1, 1);
            half();
        });

        this.width = spriteCanvas.width * 6;
        this.height = spriteCanvas.height * 6;

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

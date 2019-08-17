class Enemy extends Character {
    constructor() {
        super();

        this.bloodColor = [0, 0xf, 0];

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
            ],
            [
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [1, 1, 2, 2, 1],
                [1, 1, 1, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [0, 0, 1, 1, 0]
            ]
        ]);

        this.spriteCanvas = createCanvas((matrix[0].length * 2), matrix.length, (ctx, can) => {
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

        this.hurtSpriteCanvas = tintCanvas(this.spriteCanvas, 'rgba(255,255,255,0.5)');

        this.width = this.spriteCanvas.width * 6;
        this.height = this.spriteCanvas.height * 6;

        SPRITES.push(this.sprite = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'width': this.width,
            'height': this.height,
            'sprite': this.spriteCanvas
        });
        CYCLABLES.push(this);
        ENEMIES.push(this);
    }

    cycle(e) {
        super.cycle(e);

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z;

        if (dist(this, P) < this.width * 1.2 && this.z - P.z < this.height / 2) {
            const angle = angleBetween(this, P);
            P.x = this.x + cos(angle) * this.width * 1.2;
            P.y = this.y + sin(angle) * this.width * 1.2;
        }

        this.sprite.sprite = G.clock - this.lastDamage < 0.05 ? this.hurtSpriteCanvas : this.spriteCanvas;
    }

    remove() {
        remove(CYCLABLES, this);
        remove(SPRITES, this.sprite);
        remove(ENEMIES);
    }
}

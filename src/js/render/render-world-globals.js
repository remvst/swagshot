const CYCLABLES = [];
const ENEMIES = [];
const ITEMS = [];
const MINIMAP_ELEMENTS = [];
const SPRITES = [];

const PROJECTION_PLANE_DISTANCE = (CANVAS_WIDTH / 2) / tan(FIELD_OF_VIEW / 2);
const SLICE_COUNT = CANVAS_WIDTH / SLICE_WIDTH;

const CASTED_RAYS = [];
for (let i = -1 ; i <= SLICE_COUNT ; i++) {
    CASTED_RAYS[i] = {};
}

const DECORATION_PARTICLES_REPEAT = BLOCK_SIZE * 6;
const DECORATION_PARTICLES = [];
for (let i = 0 ; i < 200 ; i++) {
    DECORATION_PARTICLES.push({
        'offsetX': randomSin(random() * DECORATION_PARTICLES_REPEAT, rnd(5, 20), rnd(20, 40)),
        'offsetY': randomSin(random() * DECORATION_PARTICLES_REPEAT, rnd(5, 20), rnd(20, 40)),
        'offsetZ': randomSin(rnd(evaluate(-BLOCK_SIZE / 2), evaluate(BLOCK_SIZE / 2)), rnd(5, 20), rnd(20, 40)),
        'render': (x, y, width, height, alpha) => {
            fs(DECORATION_PARTICLE_COLOR);
            R.globalAlpha = alpha * 0.4;
            fr(x - width / 2, y - height / 2, width, height);
        }
    });
}

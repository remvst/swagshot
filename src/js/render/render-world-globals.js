CYCLABLES = [];
ENEMIES = [];
ITEMS = [];
MINIMAP_ELEMENTS = [];
SPRITES = [];

PROJECTION_PLANE_DISTANCE = evaluate(CANVAS_WIDTH / 2) / tan(evaluate(FIELD_OF_VIEW / 2));
SLICE_COUNT = CANVAS_WIDTH / SLICE_WIDTH;

CASTED_RAYS = [];
for (let i = -1 ; i <= SLICE_COUNT ; i++) {
    CASTED_RAYS[i] = {};
}

randomSin = (offset, halfAmplitude, period) => {
    const phase = random();
    return () => offset + sin((phase + G.clock * PI * 2) / period) * halfAmplitude;
};

DECORATION_PARTICLES = [...Array(200)].map(() => {
    return {
        'offsetX': randomSin(random() * DECORATION_PARTICLES_REPEAT, rnd(5, 20), rnd(20, 40)),
        'offsetY': randomSin(random() * DECORATION_PARTICLES_REPEAT, rnd(5, 20), rnd(20, 40)),
        'offsetZ': randomSin(rnd(evaluate(-BLOCK_SIZE / 2), evaluate(BLOCK_SIZE / 2)), rnd(5, 20), rnd(20, 40)),
        'render': (x, y, width, height, alpha) => {
            fs(DECORATION_PARTICLE_COLOR);
            R.globalAlpha = alpha * 0.2;
            fr(x - width / 2, y - height / 2, width, height);
        }
    };
});

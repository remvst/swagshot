renderWalls = () => {
    fs('#000');

    for (let i = 0 ; i < SLICE_COUNT ; i++) {
        const cast = CASTED_RAYS[i];

        const textureSet = WALL_TEXTURES[~~((cast.blockId || 0) * 185.346) % WALL_TEXTURES.length];
        const texture = textureSet[~~(G.clock * 3 + cast.blockId * 238.489) % textureSet.length];

        renderWallSlice(i, cast, texture);
    }
};

renderWallSlice = (i, cast, texture) => {
    if (!cast) {
        return;
    }

    const distance = dist(cast, P);
    const x = CANVAS_WIDTH * i / SLICE_COUNT;
    const wallHeightOnScreen = ~~heightOnScreen(cast, BLOCK_SIZE);
    const yTop = evaluate(CANVAS_HEIGHT / 2) - (1 - P.eyeZ() / evaluate(BLOCK_SIZE / 2)) * wallHeightOnScreen / 2;

    const roundedX = round(cast.x / BLOCK_SIZE) * BLOCK_SIZE;
    const roundedY = round(cast.y / BLOCK_SIZE) * BLOCK_SIZE;

    let textureOffsetRatio;
    if (abs(roundedX - cast.x) > abs(roundedY - cast.y)) {
        // It's on an Horizontal line
        textureOffsetRatio = (cast.x % BLOCK_SIZE) / BLOCK_SIZE;
    } else {
        // It's on a vertical line
        textureOffsetRatio = (cast.y % BLOCK_SIZE) / BLOCK_SIZE;
    }

    if (distance < DRAW_DISTANCE) {
        drawImage(
            texture,
            ~~(textureOffsetRatio * texture.width), 0, 1, texture.height,
            x, yTop, SLICE_WIDTH, wallHeightOnScreen
        );
    }

    wrap(() => {
        R.globalAlpha = easeInCubic(distance / DRAW_DISTANCE, 0, 1, 1);
        // R.globalAlpha = distance / DRAW_DISTANCE;
        fr(x, yTop, SLICE_WIDTH, wallHeightOnScreen);
    });
};

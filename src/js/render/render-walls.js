function renderWalls() {
    R.fs(FOG_COLOR);

    for (let i = 0 ; i < SLICE_COUNT ; i++) {
        const distance = dist(CASTED_RAYS[i], P);
        const x = CANVAS_WIDTH * i / SLICE_COUNT;
        const height = ~~heightOnScreen(CASTED_RAYS[i], BLOCK_SIZE);
        const yTop = CANVAS_HEIGHT / 2 - (1 - P.eyeZ() / (BLOCK_SIZE / 2)) * height / 2;

        const roundedX = Math.round(CASTED_RAYS[i].x / BLOCK_SIZE) * BLOCK_SIZE;
        const roundedY = Math.round(CASTED_RAYS[i].y / BLOCK_SIZE) * BLOCK_SIZE;

        let textureOffsetRatio;
        if(Math.abs(roundedX - CASTED_RAYS[i].x) > Math.abs(roundedY - CASTED_RAYS[i].y)){
            // It's on an Horizontal line
            textureOffsetRatio = (CASTED_RAYS[i].x % BLOCK_SIZE) / BLOCK_SIZE;
        }else{
            // It's on a vertical line
            textureOffsetRatio = (CASTED_RAYS[i].y % BLOCK_SIZE) / BLOCK_SIZE;
        }

        if (distance < DRAW_DISTANCE) {
            const textureSet = WALL_TEXTURES[~~((CASTED_RAYS[i].blockId || 0) * 185.346) % WALL_TEXTURES.length];
            const texture = textureSet[~~(G.clock * 3 + CASTED_RAYS[i].blockId * 238.489) % textureSet.length];

            drawImage(
                texture,
                ~~(textureOffsetRatio * texture.width), 0, 1, texture.height,
                x, yTop, SLICE_WIDTH, height
            );
        }

        wrap(() => {
            R.globalAlpha = distance / DRAW_DISTANCE;
            fr(x, yTop, SLICE_WIDTH, height);
        });
    }
}

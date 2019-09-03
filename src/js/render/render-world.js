measure = x => {
    if (DEBUG) {
        var before = performance.now(); // not using scoped var on purpose
    }
    x();
    if (DEBUG) {
        return performance.now() - before;
    }
}

renderWorld = () => {
    // Prerender calculations
    G.castIterations = 0;
    G.castTime = measure(() => castWindow(-1, SLICE_COUNT + 1));

    G.sortIterations = 0;
    G.sortTime = measure(() => SPRITES.sort((a, b) => {
        if (DEBUG) {
            G.sortIterations++;
        }
        return dist(b, P) - dist(a, P);
    }));

    // Rotate the view based on head tilt
    translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    rotate(P.headTilt);
    translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);

    // Background
    const middleY = ~~(lookupOffset() + CANVAS_HEIGHT / 2);
    fs(SKY_COLOR);
    fr(0, 0, CANVAS_WIDTH, middleY);
    fs(FOG_COLOR);
    fr(0, middleY, CANVAS_WIDTH, CANVAS_HEIGHT - middleY);

    // Mountains
    wrap(() => {
        const fieldOfViews = TWO_PI / FIELD_OF_VIEW;
        const patternScale = fieldOfViews * 2;

        const offset = -((normalize(P.angle) + TWO_PI) / FIELD_OF_VIEW * CANVAS_WIDTH);
        translate(offset, middleY - ~~(20 * patternScale));
        scale(patternScale, patternScale);

        fs(MOUNTAINS);
        fr(-offset / patternScale, 0, CANVAS_WIDTH / patternScale, 20);
    });

    translate(0, lookupOffset());

    if (DEBUG) {
        G.interpolations = 0;
        G.casts = 0;
        G.floorTiles = 0;
    }
    G.topSprites = measure(() => SPRITES.forEach(sprite => renderSprite(sprite, true)));

    G.renderFloor = measure(() => renderFloor(-BLOCK_SIZE / 2, BLOCK_SIZE * 4));
    G.renderWalls = measure(() => renderWalls());
    G.bottomSprites = measure(() => SPRITES.forEach(sprite => renderSprite(sprite)));

    G.decorationParticles = measure(() => DECORATION_PARTICLES.forEach(particle => {
        particle.x = round((P.x - particle.offsetX()) / DECORATION_PARTICLES_REPEAT) * DECORATION_PARTICLES_REPEAT + particle.offsetX();
        particle.y = round((P.y - particle.offsetY()) / DECORATION_PARTICLES_REPEAT) * DECORATION_PARTICLES_REPEAT + particle.offsetY();
        particle.z = particle.offsetZ();

        renderPoint(particle, 1, 1, 0, DECORATION_PARTICLES_REPEAT, particle.render);
    }));
}

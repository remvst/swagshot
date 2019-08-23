const PROJECTION_PLANE_DISTANCE = (CANVAS_WIDTH / 2) / tan(FIELD_OF_VIEW / 2);
const SLICE_COUNT = CANVAS_WIDTH / SLICE_WIDTH;

const SPRITES = [];

const CASTED_RAYS = [];
for (let i = -1 ; i <= SLICE_COUNT ; i++) {
    CASTED_RAYS[i] = {};
}

function heightOnScreen(point, realHeight) {
    const angle = atan2(point.y - P.y, point.x - P.x);
    const correctedDistance = cos(angle - P.angle) * dist(point, P);
    let height = realHeight * (1 - min(1000, correctedDistance) / 1000);
    height = (realHeight / correctedDistance) * PROJECTION_PLANE_DISTANCE;
    return height;
}

function interpolateValue(fromValue, toValue, ratio) {
    return fromValue + ratio * (toValue - fromValue);
}

function measure(fn) {
    const before = performance.now();
    fn();
    const after = performance.now();
    return after - before;
}

function castOneRay(rayAngle, rayIndex) {
    CASTED_RAYS[rayIndex] = castRay(P.x, P.y, rayAngle, DRAW_DISTANCE);

    if (DEBUG) {
        G.casts++;
    }
}

function castWindow(indexStart, indexEnd) {
    if (indexStart > indexEnd) {
        return;
    }

    const angleStart = P.angle - FIELD_OF_VIEW / 2;

    // Cast a ray at the start of the window
    const rayAngleStart = angleStart + (indexStart / SLICE_COUNT) * FIELD_OF_VIEW;
    castOneRay(rayAngleStart, indexStart);

    // Cast a ray at the end of the window
    const rayAngleEnd = angleStart + (indexEnd / SLICE_COUNT) * FIELD_OF_VIEW;
    castOneRay(rayAngleEnd, indexEnd);

    // If both rays hit different sides, then we split the window in half again
    if (CASTED_RAYS[indexStart].castType != CASTED_RAYS[indexEnd].castType || !CASTED_RAYS[indexEnd].castType) {
        const indexMiddle = ~~(indexStart + (indexEnd - indexStart) / 2);
        castWindow(indexStart + 1, indexMiddle);
        castWindow(indexMiddle + 1, indexEnd - 1);
        return;
    }

    // Both rays hit the same wall, we can just interpolate the values instead of casting a ray
    for (let k = indexStart + 1 ; k < indexEnd ; k++) {
        const ratio = (k - indexStart) / (indexEnd - indexStart);
        const angle = interpolateValue(rayAngleStart, rayAngleEnd, ratio);

        let x, y;
        if (CASTED_RAYS[indexEnd].y === CASTED_RAYS[indexStart].y) {
            // Horizontal line
            y = CASTED_RAYS[indexStart].y;
            x = (y - P.y) / tan(angle) + P.x;
        } else {
            // Vertical line
            x = CASTED_RAYS[indexStart].x;
            y = tan(angle) * (x - P.x) + P.y;
        }

        CASTED_RAYS[k].x = x;
        CASTED_RAYS[k].y = y;
        CASTED_RAYS[k].interpolated = true;
        CASTED_RAYS[k].castType = CASTED_RAYS[indexStart].castType;
        CASTED_RAYS[k].blockId = CASTED_RAYS[indexStart].blockId;

        if (DEBUG) {
            G.interpolations++;
        }
    }
}

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

function positionOnScreen(x, y, z) {
    const point = {'x': x, 'y': y, 'z': isNaN(z) ? -BLOCK_SIZE / 2 : z};
    const angle = angleBetween(P, point);
    const angleDiff = normalize(angle - P.angle);

    const xOnScreen = CANVAS_WIDTH / 2 + CANVAS_WIDTH / 2 * angleDiff / (FIELD_OF_VIEW / 2);
    const wallHeight = heightOnScreen(point, BLOCK_SIZE);

    const yTopWall = CANVAS_HEIGHT / 2 - (1 - P.eyeZ() / (BLOCK_SIZE / 2)) * wallHeight / 2;
    const yBottomWall = yTopWall + wallHeight;

    const yTop = (BLOCK_SIZE / 2 - point.z) / BLOCK_SIZE * (yBottomWall - yTopWall) + yTopWall - 0 / 2;

    const cast = CASTED_RAYS[~~(xOnScreen / SLICE_WIDTH)];
    const visible = !cast || dist(cast, P) + 1 > dist(point, P);

    return {
        'x': xOnScreen,
        'y': yTop,
        'renderable': abs(angleDiff) < PI / 2 &&
            visible &&
            between(0, xOnScreen, CANVAS_WIDTH) &&
            between(0, yTop + lookupOffset(), CANVAS_HEIGHT)
    };
}

function renderFloor(z, maxDistance) {
    // const maxDistance = BLOCK_SIZE * 4;
    const size = BLOCK_SIZE / 4;

    const sizeRatio = (size / BLOCK_SIZE);

    for (let x = ~~((P.x - maxDistance) / BLOCK_SIZE) * BLOCK_SIZE ; x < P.x + maxDistance ; x += size) {
        for (let y = ~~((P.y - maxDistance) / BLOCK_SIZE) * BLOCK_SIZE ; y < P.y + maxDistance ; y += size) {

            const blockCol = ~~(x / BLOCK_SIZE);
            const blockRow = ~~(y / BLOCK_SIZE);

            const texture = (blockCol % 3) || (blockRow % 3) ? FLOOR_SPRITE : FLOOR_SPRITE_LIGHT;

            const offsetXRatio = (x % BLOCK_SIZE) / BLOCK_SIZE;
            const offsetYRatio = (y % BLOCK_SIZE) / BLOCK_SIZE;

            const topLeft = positionOnScreen(x, y, z);
            const bottomLeft = positionOnScreen(x, y + size, z);
            const topRight = positionOnScreen(x + size, y, z);
            const bottomRight = positionOnScreen(x + size, y + size, z);

            if (topLeft.renderable || topRight.renderable || bottomLeft.renderable) {
                if (DEBUG) {
                    G.floorTiles++;
                }

                R.globalAlpha = 1 - limit(0, distP(P.x, P.y, x, y) / maxDistance, 1);
                drawTriangle(
                    texture,
                    topLeft.x, topLeft.y,
                    topRight.x, topRight.y,
                    bottomLeft.x, bottomLeft.y,

                    texture.width * offsetXRatio, texture.height * offsetYRatio,
                    texture.width * (offsetXRatio + sizeRatio), texture.height * offsetYRatio,
                    texture.height * offsetXRatio, texture.height * (offsetYRatio + sizeRatio)
                );
            }

            if (bottomRight.renderable || topRight.renderable || bottomLeft.renderable) {
                if (DEBUG) {
                    G.floorTiles++;
                }

                R.globalAlpha = 1 - limit(0, distP(P.x, P.y, x, y) / maxDistance, 1);
                drawTriangle(
                    texture,
                    bottomRight.x, bottomRight.y,
                    topRight.x, topRight.y,
                    bottomLeft.x, bottomLeft.y,

                    texture.width * (offsetXRatio + sizeRatio), texture.height * (offsetYRatio + sizeRatio),
                    texture.width * (offsetXRatio + sizeRatio), texture.height * offsetYRatio,
                    texture.height * offsetXRatio, texture.height * (offsetYRatio + sizeRatio)
                );
            }
        }
    }

    R.globalAlpha = 1;
}

function lookupOffset() {
    return -~~(P.verticalAngle / (PI * 0.28) * CANVAS_HEIGHT);
}

function renderWorld() {
    // R.fs('#000');
    // fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //
    translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    rotate(P.headTilt);
    translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);
    //
    // wrap(() => {
    //     const offset = -(P.angle / FIELD_OF_VIEW * CANVAS_WIDTH);
    //     R.fs(STARRY_BACKGROUND);
    //     translate(offset, lookupOffset());
    //     fr(-offset, -lookupOffset(), CANVAS_WIDTH, lookupOffset() + CANVAS_HEIGHT / 2);
    // });

    const middleY = lookupOffset() + CANVAS_HEIGHT / 2;

    R.fs(SKY_COLOR);
    fr(0, 0, CANVAS_WIDTH, middleY);

    R.fs(FOG_COLOR);
    fr(0, middleY, CANVAS_WIDTH, CANVAS_HEIGHT - middleY);

    wrap(() => {
        const fieldOfViews = TWO_PI / FIELD_OF_VIEW;
        const patternScale = fieldOfViews * 2;

        const offset = -((normalize(P.angle) + TWO_PI) / FIELD_OF_VIEW * CANVAS_WIDTH);
        translate(offset, middleY - 20 * patternScale);
        scale(patternScale, patternScale);

        R.fs(MOUNTAINS);
        fr(-offset / patternScale, 0, CANVAS_WIDTH / patternScale, 20);
    });

    translate(0, lookupOffset());

    if (DEBUG) {
        G.interpolations = 0;
        G.casts = 0;
        G.floorTiles = 0;
    }

    G.castIterations = 0;
    G.castTime = measure(() => castWindow(-1, SLICE_COUNT + 1));

    G.topSprites = measure(() => SPRITES.forEach(sprite => renderSprite(sprite, true)));

    G.renderFloor = measure(() => renderFloor(-BLOCK_SIZE / 2, BLOCK_SIZE * 4));
    // G.renderCeiling = measure(() => renderFloor(BLOCK_SIZE / 2, BLOCK_SIZE * 2, FLOOR_SPRITE));
    G.renderWalls = measure(() => renderWalls());

    G.sortIterations = 0;
    G.sortTime = measure(() => SPRITES.sort((a, b) => {
        if (DEBUG) {
            G.sortIterations++;
        }
        return dist(b, P) - dist(a, P);
    }));

    G.bottomSprites = measure(() => SPRITES.forEach(sprite => renderSprite(sprite)));

    G.decorationParticles = measure(() => DECORATION_PARTICLES.forEach(particle => {
        particle.x = round((P.x - particle.offsetX()) / REPEAT) * REPEAT + particle.offsetX();
        particle.y = round((P.y - particle.offsetY()) / REPEAT) * REPEAT + particle.offsetY();
        particle.z = particle.offsetZ();

        renderPoint(particle, 1, 1, 0, REPEAT, particle.render);
    }));
}

const REPEAT = BLOCK_SIZE * 6;
const DECORATION_PARTICLES = [];
for (let i = 0 ; i < 200 ; i++) {
    DECORATION_PARTICLES.push({
        'offsetX': randomSin(random() * REPEAT, rnd(5, 20), rnd(20, 40)),
        'offsetY': randomSin(random() * REPEAT, rnd(5, 20), rnd(20, 40)),
        'offsetZ': randomSin(rnd(-BLOCK_SIZE / 2, BLOCK_SIZE / 2), rnd(5, 20), rnd(20, 40)),
        'render': (x, y, width, height, alpha) => {
            R.fs(DECORATION_PARTICLE_COLOR);
            R.globalAlpha = alpha * 0.4;
            fr(x - width / 2, y - height / 2, width, height);
        }
    });
}

function renderSprite(sprite, aboveBlocks) {
    if (aboveBlocks && sprite.z < BLOCK_SIZE / 2) {
        return;
    }

    const distanceFromPlayer = dist(P, sprite);

    renderPoint(sprite, sprite.width, sprite.height, DRAW_DISTANCE - 100, DRAW_DISTANCE, (x, y, width, height, alpha) => {
        R.globalAlpha = (isNaN(sprite.alpha) ? 1 : sprite.alpha) * alpha;

        if (sprite.sprite) {
            const xStart = ~~(x - width / 2);
            const xEnd = ~~(x + width / 2);

            for (let xSlice = xStart ; xSlice < xEnd ; xSlice += SLICE_WIDTH) {
                const xRatioOnScreen = (xSlice / CANVAS_WIDTH) * FIELD_OF_VIEW;
                const castIndex = ~~(xRatioOnScreen * SLICE_COUNT);

                const cast = CASTED_RAYS[castIndex];
                if (cast && dist(cast, P) > distanceFromPlayer || aboveBlocks) {
                    const ratio = (xSlice - xStart) / width;
                    const ratioNext = ratio + SLICE_WIDTH / width;

                    drawImage(
                        sprite.sprite,
                        (ratio * sprite.sprite.width), 0, (ratioNext - ratio) * sprite.sprite.width, sprite.sprite.height,
                        xSlice - SLICE_WIDTH / 2, y - height / 2, SLICE_WIDTH, height
                    );
                }

            }
        } else {
            R.fs(sprite.color);

            translate(x, y);
            scale(width / HALO.width, height / HALO.width);
            drawImage(halo(sprite.color), 0, 0);

            // fr(x - width / 2, y - height / 2, width, height);
        }
    }, sprite.sprite || aboveBlocks);
}

function randomSin(offset, halfAmplitude, period) {
    const phase = random();
    return () => offset + sin((phase + G.clock * PI * 2) / period) * halfAmplitude;
}

function renderPoint(point, realWidth, realHeight, fadeStartDistance, fadeEndDistance, render, ignoreWalls) {
    const distanceToPoint = dist(point, P);
    const angle = angleBetween(P, point);
    const angleDiff = normalize(angle - P.angle);

    if (distanceToPoint > fadeEndDistance || abs(angleDiff) > 1.1 * FIELD_OF_VIEW / 2) {
        return;
    }

    const xOnScreen = CANVAS_WIDTH / 2 + CANVAS_WIDTH / 2 * angleDiff / (FIELD_OF_VIEW / 2);

    const width = heightOnScreen(point, realWidth);
    const height = heightOnScreen(point, realHeight);
    const wallHeight = heightOnScreen(point, BLOCK_SIZE);

    if (!ignoreWalls) {
        const cast = CASTED_RAYS[~~(xOnScreen / SLICE_WIDTH)];
        if (!cast || dist(cast, P) < distanceToPoint) {
            return;
        }
    }

    const yTopWall = CANVAS_HEIGHT / 2 - (1 - P.eyeZ() / (BLOCK_SIZE / 2)) * wallHeight / 2;
    const yBottomWall = yTopWall + wallHeight;

    const yTop = (BLOCK_SIZE / 2 - point.z) / BLOCK_SIZE * (yBottomWall - yTopWall) + yTopWall - height / 2;

    const alpha = 1 - limit(0, (distanceToPoint - fadeStartDistance) / (fadeEndDistance - fadeStartDistance), 1);
    wrap(() => render(xOnScreen, yTop + height / 2, width, height, alpha));
}

function drawTriangle(
    image,
    x0, y0,
    x1, y1,
    x2, y2,

    u0, v0,
    u1, v1,
    u2, v2
) {
    // clip triangle
    save();
    beginPath();
    moveTo(x0, y0);
    lineTo(x1, y1);
    lineTo(x2, y2);
    closePath();
    // stroke();
    clip();

    // calculate transformation matrix
    x1 -= x0; y1 -= y0; x2 -= x0; y2 -= y0;
    u1 -= u0; v1 -= v0; u2 -= u0; v2 -= v0;
    const id = 1.0 / (u1 * v2 - u2 * v1);
    const a = id * (v2 * x1 - v1 * x2);
    const b = id * (v2 * y1 - v1 * y2);
    const c = id * (u1 * x2 - u2 * x1);
    const d = id * (u1 * y2 - u2 * y1);
    const e = x0 - a*u0 - c*v0;
    const f = y0 - b*u0 - d*v0;

    // draw image
    transform(a, b, c, d, e, f);
    drawImage(image, 0, 0);

    // restore previous state
    restore();
}

positionOnScreen = (x, y, z) => {
    const point = {'x': x, 'y': y, 'z': isNaN(z) ? -BLOCK_SIZE / 2 : z};
    const angle = angleBetween(P, point);
    const angleDiff = normalize(angle - P.angle);

    const xOnScreen = evaluate(CANVAS_WIDTH / 2) + evaluate(CANVAS_WIDTH / 2) * angleDiff / evaluate(FIELD_OF_VIEW / 2);
    const wallHeight = heightOnScreen(point, BLOCK_SIZE);

    const yTopWall = evaluate(CANVAS_HEIGHT / 2) - (1 - P.eyeZ() / evaluate(BLOCK_SIZE / 2)) * wallHeight / 2;
    const yBottomWall = yTopWall + wallHeight;

    const yTop = (evaluate(BLOCK_SIZE / 2) - point.z) / BLOCK_SIZE * (yBottomWall - yTopWall) + yTopWall;

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
};

lookupOffset = () => -~~(P.verticalAngle / (PI * 0.28) * CANVAS_HEIGHT);

renderPoint = (point, realWidth, realHeight, fadeStartDistance, fadeEndDistance, render, ignoreWalls) => {
    const distanceToPoint = dist(point, P);
    const angle = angleBetween(P, point);
    const angleDiff = normalize(angle - P.angle);

    if (distanceToPoint > fadeEndDistance || abs(angleDiff) > 1.1 * evaluate(FIELD_OF_VIEW / 2)) {
        return;
    }

    const posOnScreen = positionOnScreen(point.x, point.y, point.z);
    if (!posOnScreen.renderable && !ignoreWalls) {
        return;
    }

    const width = heightOnScreen(point, realWidth);
    const height = heightOnScreen(point, realHeight);

    const alpha = 1 - limit(0, (distanceToPoint - fadeStartDistance) / (fadeEndDistance - fadeStartDistance), 1);
    wrap(() => render(posOnScreen.x, posOnScreen.y, width, height, alpha));
};

castOneRay = (rayAngle, rayIndex) => {
    CASTED_RAYS[rayIndex] = castRay(P.x, P.y, rayAngle, DRAW_DISTANCE);

    if (DEBUG) {
        G.casts++;
    }
};

heightOnScreen = (point, realHeight) => {
    const angle = atan2(point.y - P.y, point.x - P.x);
    // const correctedDistance = cos(angle - P.angle) * dist(point, P);
    return (realHeight / (cos(angle - P.angle) * dist(point, P))) * PROJECTION_PLANE_DISTANCE;
};

interpolateValue = (fromValue, toValue, ratio) => {
    return fromValue + ratio * (toValue - fromValue);
};

castWindow = (indexStart, indexEnd) => {
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

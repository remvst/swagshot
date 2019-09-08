explosion = (x, y, z, radius) => {
    let hurtEnemies = 0;

    [P].concat(ENEMIES).forEach(character => {
        const dist = distP(character.x, character.y, x, y);
        const damage = (1 - min(1, dist / (BLOCK_SIZE * 2))) * 0.9;
        if (damage > 0 && abs(z - character.z) < radius) {
            character.hurt({'x': x, 'y': y, 'z': z}, damage, atan2(character.y - y, character.x - x));

            if (character != P) {
                hurtEnemies++;
            }
        }
    });

    explosionEffect(x, y, z, radius);
    explosionSound();

    return hurtEnemies;
};

explosionEffect = (x, y, z, radius) => {
    if (distP(x, y, P.x, P.y) > DRAW_DISTANCE) {
        return;
    }

    for (let i = 0 ; i < 3 ; i++) {
        const duration = rnd(0.2, 0.4);

        const circleParticle = {
            'x': x + radius * 0.5 * rnd(-1, 1),
            'y': y + radius * 0.5 * rnd(-1, 1),
            'z': z + radius * 0.5 * rnd(-1, 1),
            'alpha': 1,
            'sprite': EXPLOSION_CIRCLE
        };
        SPRITES.push(circleParticle);
        interp(circleParticle, 'alpha', 1, 0, 0.2, duration - 0.2, null, () => remove(SPRITES, circleParticle));
        interp(circleParticle, 'worldWidth', 0, radius * 2, duration);
        interp(circleParticle, 'worldHeight', 0, radius * 2, duration);
    }

    for (let i = 0 ; i < 50 ; i++) {
        const angle = random() * TWO_PI;
        const verticalAngle = rnd(-1, 1) * PI / 2;
        const initialDistance = rnd(0.2, 0.8) * radius;
        const finalDistance = radius * 0.8;

        const duration = rnd(0.2, 0.6);

        const size = rnd(10, 20);

        const particle = {
            'x': x + cos(angle) * initialDistance * cos(verticalAngle),
            'y': y + sin(angle) * initialDistance * cos(verticalAngle),
            'z': z + sin(verticalAngle) * initialDistance,
            'alpha': 1,
            'worldWidth': size,
            'worldHeight': size,
            'color': pick(['#ff0', '#f00', '#f80'])
        };
        SPRITES.push(particle);
        interp(particle, 'alpha', 1, 0, duration, 0, null, () => remove(SPRITES, particle));
        interp(particle, 'x', particle.x, particle.x + cos(angle) * finalDistance * cos(verticalAngle), duration);
        interp(particle, 'y', particle.y, particle.y + sin(angle) * finalDistance * cos(verticalAngle), duration);
        interp(particle, 'z', particle.z, particle.z + sin(verticalAngle) * finalDistance, duration);
    }
};

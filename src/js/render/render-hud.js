renderGauge = (gaugeColor, value, renderIcon) => {
    R.imageSmoothingEnabled = true;

    transform(1, -0.15, 0, 1, 0, 0); // shear the context

    R.globalAlpha = 0.5;
    R.fs('#000');
    fr(0, 0, HUD_ICON_SIZE * 1.25 + HUD_GAUGE_PADDING * 2 + HUD_GAUGE_LENGTH, HUD_ICON_SIZE + HUD_GAUGE_PADDING * 2);

    translate(HUD_GAUGE_PADDING, HUD_GAUGE_PADDING);

    // Track
    R.fs(gaugeColor);
    fr(HUD_ICON_SIZE * 1.25, 0, HUD_GAUGE_LENGTH, HUD_ICON_SIZE);

    R.globalAlpha = 1;
    renderIcon();

    // Gauge
    fr(HUD_ICON_SIZE * 1.25, 0, HUD_GAUGE_LENGTH * value, HUD_ICON_SIZE);
}

renderHud = () => {
    // Health
    wrap(() => {
        translate(20, CANVAS_HEIGHT - HUD_ICON_SIZE - HUD_GAUGE_PADDING * 2 - 20);
        renderGauge('#0be', P.health, () => {
            const thickness = ~~(HUD_ICON_SIZE / 3);

            fr((HUD_ICON_SIZE - thickness) / 2, 0, thickness, HUD_ICON_SIZE);
            fr(0, (HUD_ICON_SIZE - thickness) / 2, HUD_ICON_SIZE, thickness);
        });
    });

    // Ammo
    wrap(() => {
        translate(CANVAS_WIDTH - 20, CANVAS_HEIGHT - HUD_ICON_SIZE - HUD_GAUGE_PADDING * 2 - 20);
        scale(-1, 1);
        renderGauge('#e50', P.weapon.ammo, () => {
            fr(0, 0, HUD_ICON_SIZE / 5, HUD_ICON_SIZE);
            fr(HUD_ICON_SIZE * 2 / 5, 0, HUD_ICON_SIZE / 5, HUD_ICON_SIZE);
            fr(HUD_ICON_SIZE * 4 / 5, 0, HUD_ICON_SIZE / 5, HUD_ICON_SIZE);
        });
    });

    // Damage indicators
    DAMAGE_ANGLES.forEach(angle => {
        wrap(() => {
            R.globalAlpha = angle.alpha;
            translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            rotate(angle.angle - P.angle + PI - PI / 2);
            translate(100, 0);

            fs('#f00');
            beginPath();
            moveTo(0, -20);
            lineTo(20, 0);
            lineTo(0, 20);
            fill();
        });
    });

    //Score
    R.textAlign = 'center';
    R.font = '24pt Courier';
    fs('#fff');
    fillText(G.scoreKeeper.score, CANVAS_WIDTH / 2, 50);

    // Messages
    R.font = '12pt Courier';
    G.messages.forEach((m, i) => wrap(() => {
        R.globalAlpha = 1 - abs(m.offset);
        translate(m.offset * 100, CANVAS_HEIGHT / 2 + 30 + i * 25);

        R.textAlign = 'right';
        fs('#fff');
        fillText(m.primary, CANVAS_WIDTH / 2 - 10, 0);

        R.textAlign = 'left';
        fs('#ff0');
        fillText(m.secondary, CANVAS_WIDTH / 2 + 10, 0);
    }));

    function renderJoystick(x, y, angle, force) {
        wrap(() => {
            fs('#fff');
            R.strokeStyle = '#fff';
            R.lineWidth = 2;
            R.globalAlpha = force ? 1 : 0.5;

            translate(x, y);
            rotate(angle - PI / 2);

            beginPath();
            arc(0, 0, JOYSTICK_RADIUS, 0, TWO_PI);
            stroke();

            beginPath();
            arc(force * JOYSTICK_RADIUS, 0, 20, 0, TWO_PI);
            fill();
        });
    }

    if (isTouch || true) {
        renderJoystick(LEFT_JOYSTICK_X, JOYSTICK_Y, MOVEMENT_CONTROL.angle, MOVEMENT_CONTROL.force);
        renderJoystick(RIGHT_JOYSTICK_X, JOYSTICK_Y, AIM_CONTROL.angle, AIM_CONTROL.force);

        beginPath();
        arc(CANVAS_WIDTH - 70, CANVAS_HEIGHT - 280, 40, 0, TWO_PI);
        fill();

    }
};

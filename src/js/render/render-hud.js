function renderGauge(gaugeColor, value, renderIcon) {
    R.imageSmoothingEnabled = true;

    transform(1, -0.15, 0, 1, 0, 0); // shear the context

    R.globalAlpha = 0.5;
    R.fillStyle = '#000';
    fillRect(0, 0, HUD_ICON_SIZE * 1.25 + HUD_GAUGE_PADDING * 2 + HUD_GAUGE_LENGTH, HUD_ICON_SIZE + HUD_GAUGE_PADDING * 2);

    translate(HUD_GAUGE_PADDING, HUD_GAUGE_PADDING);

    // Track
    R.fillStyle = gaugeColor;
    fillRect(HUD_ICON_SIZE * 1.25, 0, HUD_GAUGE_LENGTH, HUD_ICON_SIZE);

    R.globalAlpha = 1;
    renderIcon();

    // Gauge
    fillRect(HUD_ICON_SIZE * 1.25, 0, HUD_GAUGE_LENGTH * value, HUD_ICON_SIZE);
}

function renderHud() {
    // Health
    wrap(() => {
        translate(20, CANVAS_HEIGHT - HUD_ICON_SIZE - HUD_GAUGE_PADDING * 2 - 20);
        renderGauge('#0be', P.health, () => {
            const thickness = ~~(HUD_ICON_SIZE / 3);

            fillRect((HUD_ICON_SIZE - thickness) / 2, 0, thickness, HUD_ICON_SIZE);
            fillRect(0, (HUD_ICON_SIZE - thickness) / 2, HUD_ICON_SIZE, thickness);
        });
    });

    // Ammo
    wrap(() => {
        translate(CANVAS_WIDTH - 20, CANVAS_HEIGHT - HUD_ICON_SIZE - HUD_GAUGE_PADDING * 2 - 20);
        scale(-1, 1);
        renderGauge('#e50', P.weapon.ammo, () => {
            fillRect(0, 0, HUD_ICON_SIZE / 5, HUD_ICON_SIZE);
            fillRect(HUD_ICON_SIZE * 2 / 5, 0, HUD_ICON_SIZE / 5, HUD_ICON_SIZE);
            fillRect(HUD_ICON_SIZE * 4 / 5, 0, HUD_ICON_SIZE / 5, HUD_ICON_SIZE);
        });
    });
}

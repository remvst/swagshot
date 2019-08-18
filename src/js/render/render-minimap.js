renderMinimap = () => {
    translate(20, 20);

    R.fillStyle = '#49564c';
    R.globalAlpha = 0.5;
    beginPath();
    rect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE);
    fill();
    clip();

    translate(MINIMAP_SIZE / 2, 120);
    rotate(-PI / 2);

    R.globalAlpha = 1;
    wrap(() => {

        rotate(-P.angle);

        scale(MINIMAP_SCALE, MINIMAP_SCALE);
        translate(-P.x / BLOCK_SIZE, -P.y / BLOCK_SIZE);
        drawImage(W.can, 0, 0);

        scale(1 / MINIMAP_SCALE, 1 / MINIMAP_SCALE);

        R.fillStyle = MINIMAP_GRID;
        fillRect(0, 0, W.can.width * MINIMAP_SCALE, W.can.height * MINIMAP_SCALE);
    });

    const gradient = createRadialGradient(0, 0, 0, 0, 0, 80);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, 'rgba(255,255,255, 0)');

    R.fillStyle = gradient;
    R.globalAlpha = 0.5;
    beginPath();
    moveTo(0, 0);
    arc(0, 0, 80, -FIELD_OF_VIEW / 2, FIELD_OF_VIEW / 2);
    closePath();
    fill();
};

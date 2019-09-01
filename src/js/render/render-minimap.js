renderMinimap = () => {
    translate(20, 20);

    fs('#454');
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

        wrap(() => {
            scale(1 / MINIMAP_SCALE, 1 / MINIMAP_SCALE);
            MINIMAP_ELEMENTS.forEach(element => wrap(() => {
                translate(
                    element.x / BLOCK_SIZE * MINIMAP_SCALE,
                    element.y / BLOCK_SIZE * MINIMAP_SCALE
                );

                rotate(P.angle + PI / 2);

                const sprite = element.sprite.sprite;
                scale(MINIMAP_SCALE / sprite.width, MINIMAP_SCALE / sprite.width);

                drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
            }));
        });

        scale(1 / MINIMAP_SCALE, 1 / MINIMAP_SCALE);

        R.fs(MINIMAP_GRID);
        fr(0, 0, W.can.width * MINIMAP_SCALE, W.can.height * MINIMAP_SCALE);
    });

    const gradient = createRadialGradient(0, 0, 0, 0, 0, 80);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, 'rgba(255,255,255, 0)');

    R.fs(gradient);
    R.globalAlpha = 0.5;
    beginPath();
    moveTo(0, 0);
    arc(0, 0, 80, -FIELD_OF_VIEW / 2, FIELD_OF_VIEW / 2);
    closePath();
    fill();
};

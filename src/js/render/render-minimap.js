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
                const sprite = element.sprite.sprite;
                if (sprite) {
                    translate(
                        element.x * evaluate(MINIMAP_SCALE / BLOCK_SIZE),
                        element.y * evaluate(MINIMAP_SCALE / BLOCK_SIZE)
                    );
                    rotate(P.angle + PI / 2);
                    scale(MINIMAP_SCALE / sprite.width, MINIMAP_SCALE / sprite.width);
                    drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
                }
            }));
        });

        scale(1 / MINIMAP_SCALE, 1 / MINIMAP_SCALE);

        fs(MINIMAP_GRID);
        fr(0, 0, W.can.width * MINIMAP_SCALE, W.can.height * MINIMAP_SCALE);
    });

    fs(MINIMAP_GRADIENT);
    R.globalAlpha = 0.5;
    beginPath();
    moveTo(0, 0);
    arc(0, 0, 80, -FIELD_OF_VIEW / 2, FIELD_OF_VIEW / 2);
    closePath();
    fill();
};

function renderDebug() {
    R.fs('#fff');
    R.fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Cells
    for(var row = 0 ; row < W.matrix.length ; row++){
        for(var col = 0 ; col < W.matrix[row].length ; col++){
            if (W.matrix[row][col]) {
                R.fs('#888');
            } else {
                R.fs('#fff');
            }
            R.fr(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }

    // Grid
    R.fs('#000');
    for(var x = 0 ; x < CANVAS_WIDTH ; x += BLOCK_SIZE){
        R.fr(x, 0, 1, CANVAS_HEIGHT);
    }
    for(var y = 0 ; y < CANVAS_WIDTH ; y += BLOCK_SIZE){
        R.fr(0, y, CANVAS_WIDTH, 1);
    }

    // Player position
    R.fs('red');
    R.beginPath();
    R.arc(P.x, P.y, 5, 0, TWO_PI, true);
    R.fill();

    const angleStart = P.angle - FIELD_OF_VIEW / 2;

    R.strokeStyle = 'red';
    R.beginPath();
    R.moveTo(P.x, P.y);

    for (let i = 0 ; i < CANVAS_WIDTH ; i += SLICE_WIDTH) {
        const rayAngle = angleStart + (i / CANVAS_WIDTH) * FIELD_OF_VIEW;
        const cast = castRay(P.x, P.y, rayAngle, BLOCK_SIZE * 10);
        if (cast) {
            R.lineTo(cast.x, cast.y);
        }
    }

    R.closePath();
    R.stroke();
}

function renderMatrix(matrix, ctx, colorGetter) {
    for (let row = 0 ; row < matrix.length ; row++) {
        for (let col = 0 ; col < matrix[0].length ; col++) {
            if (matrix[row][col]) {
                ctx.fillStyle = toColor(colorGetter(matrix[row][col]));
                ctx.fillRect(col, row, 1, 1);
            }
        }
    }
}

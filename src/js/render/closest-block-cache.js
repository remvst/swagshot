class ClosestBlockCache {

    constructor() {
        this.cache = {};
    }

    closestBlockFor(row, col) {
        const key = row + '-' + col;

        if (!(key in this.cache)) {
            this.cache[key] = this.computeClosestBlockFor(row, col);
        }

        return this.cache[key];
    }

    computeClosestBlockFor(row, col) {
        console.log('computing', row, col);

        const scannable = [];

        function maybeAddToScannable(row, col) {
            if (W.matrix[row] && W.matrix[row][col]) {
                scannable.push({'row': row, 'col': col});
            }
        }

        for (let radius = 1 ; radius < 100 ; radius++) {
            for (let k = row - radius ; k <= row + radius ; k++) {
                maybeAddToScannable(k, col - radius);
                maybeAddToScannable(k, col + radius);
                maybeAddToScannable(row - radius, k);
                maybeAddToScannable(row + radius, k);
            }

            if (scannable.length > 0) {
                break;
            }
        }

        return scannable.reduce((minDistance, cell) => {
            const distance = distP(row, col, cell.row, cell.col) - 1;
            return Math.min(distance, minDistance);
        }, Number.MAX_SAFE_INTEGER);
    }

}

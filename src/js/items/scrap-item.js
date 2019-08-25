class ScrapItem extends Item {
    constructor() {
        super(CPU_ITEM);

        this.sprite.width /= 2;
        this.sprite.height /= 2;
    }

    pickup() {
        P.collectedScrap++;

        G.showMessage([
            nomangle('Collected CPUs'),
            nomangle(P.collectedScrap + '/20')
        ]);
    }
}

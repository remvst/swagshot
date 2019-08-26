class ScoreKeeper {

    constructor() {
        this.score = 0;

        this.enemyKillsWithNoDamageCount = 0;
    }

    bonus(description, value) {
        this.score += value;
        G.showMessage(description, '+' + value);
    }

}

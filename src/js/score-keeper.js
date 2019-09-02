class ScoreKeeper {

    constructor() {
        this.score = 0;
        this.lastKill = 0;
        this.comboKillCount = 0;
    }

    bonus(description, value) {
        this.score += value;
        G.showMessage(description, '+' + value);
    }

}

class ScoreKeeper {

    constructor() {
        this.score = this.lastKill = this.comboKillCount = 0;
    }

    bonus(description, value) {
        this.score += value;
        G.showMessage(description, '+' + value);
    }

}

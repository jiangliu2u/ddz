function PokerSets(pairs, containJoker) {
    //pairs表示几副牌，containJoker表示是否包含大小王
    this.pairs = pairs;
    this.containJoker = containJoker;
    this._pokers = [];
    this.generatePokers();
}

PokerSets.prototype.generatePokers = function () {
    /* 数据结构：
     * 一个byte标识一张poker
     * 高4位表示花色  0-spade 1-heart 2-diamond 3-club 4-little joker 5- big joker
     * 低4位表示点数 3,4,5,6,7,8,9,10,11,12,13,A,2,litterJoker,bigJoker
     * 低4位表示点数 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14
     * 对应16进制牌0x10,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1A,0x1B,0x1C,0x4D,0x5E
     */
    // 几幅牌 不是pair吧
    for (let p = 0; p < this.pairs; p++) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                this._pokers.push("0x" + i + j.toString(16));
            }
        }
        if (this.containJoker) {
            // 最好是静态常量或者变量 Poker.BigJoker Poker.LittleJoker。这样，其他地方访问可以通过Poker来访问，
            // 而不是通过字符串，可以防止写错或者数据结构变化，而只用修改一个地方
            this._pokers.push("0x4d");//小王 
            this._pokers.push("0x5e");//大王
        }
    }
};
PokerSets.prototype.getPokers = function () {
    return this._pokers;
}
module.exports = PokerSets;

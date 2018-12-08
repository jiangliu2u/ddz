let PokerUtil = {};
PokerUtil.PokerGrade = {
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    10: 8,
    J: 9,
    Q: 10,
    K: 11,
    A: 12,
    2: 13,
    g: 14,
    G: 15
};
PokerUtil.gradeDown = function (Poker1, Poker2) {
    return (poker1 & 15) - (poker2 & 15)
};
PokerUtil.gradeup = function (Poker1, Poker2) {
    return (poker2 & 15) - (poker1 & 15);
    // return PokerUtil.PokerGrade[Poker1.showTxt] - PokerUtil.PokerGrade[Poker2.showTxt];
};
module.exports = PokerUtil;
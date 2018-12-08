let config = {};
config.pokerCardType = {
    spade: "spade",//黑桃
    heart: "heart",//红桃
    diamond: "diamond",//方块
    club: "club",//梅花
};
config.jokerType = {
    JOKER: "G",
    joker: "g"
};
config.seatPos = {
    center: {
        pokerScale: 1,
        disBetween: 40,
        positionY: -245
    },
    left: {
        pokerScale: 1,
        disBetween: 40,
        positionY: 150
    },
    right: {
        pokerScale: 1,
        disBetween: 40,
        positionY: 150
    },
};
module.exports = config;
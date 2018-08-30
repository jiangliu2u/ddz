cc.Class({
    extends: cc.Component,

    properties: {
        leftPanel: {
            default: null,
            type: cc.Node
        },
        selfPanel: {
            default: null,
            type: cc.Node
        },
        rightPanel: {
            default: null,
            type: cc.Node
        },


    },
    _showTimer(panelNode) {
        this._hidePass(panelNode);
        if (panelNode.children.length !== 0) {
            var children = panelNode.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i]._name === "clock") { children[i].getComponent("clock").setVisible(true) };
            }
        }
    },
    leftTimer(){this._showTimer(this.leftPanel)},
    rightTimer(){this._showTimer(this.rightPanel)},
    _hideTimer(panelNode) {
        if (panelNode.children.length !== 0) {
            var children = panelNode.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i]._name === "clock") {
                    children[i].getComponent("clock").setVisible(false);
                }
            }
        }
    },
    hideRightTimer() {
        this._hideTimer(this.rightPanel);
    },
    hideLeftTimer() {
        this._hideTimer(this.leftPanel);
    },
    _showPass(panelNode) {
        this._hideTimer(panelNode);
        if (panelNode.children.length !== 0) {
            var children = panelNode.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i]._name === "pass") {
                    children[i].active = true;
                }
            }
        }
    },
    rightPass() {
        this.hideRightTimer();
        this._showPass(this.rightPanel)
    },
    leftPass() {
        this.hideLeftTimer();
        this._showPass(this.leftPanel);
    },
    selfPass() {
        this._showPass(this.selfPanel);
    },
    _hidePass: function (panelNode) {
        if (panelNode.children.length !== 0) {
            var children = panelNode.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i]._name === "pass") { children[i].active = false };
            }
        }
    },
    hideRightPass() {
        this._hidePass(this.rightPanel);
    },
    hideLeftPass() {

        this._hidePass(this.leftPanel);
    },
    hideSelfPass() {
        this._hidePass(this.selfPanel);
    },

    // update (dt) {},
});

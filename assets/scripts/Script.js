window.Script = cc.Class({
    extends: cc.Component
  });
  cc.js.get(cc.Node.prototype, 'script', function () {
    return this.getComponent(Script);
  });
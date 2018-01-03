
var homeLayer = cc.Layer.extend({

    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var gameLabel = new cc.LabelTTF("Save the Helicopter", "Comic Sans MS", 45);
        gameLabel.x = size.width / 2;
        gameLabel.y = size.height / 2 + 100;
        this.addChild(gameLabel, 0);

		var playGame = new cc.MenuItemImage.create(res.PlayGame_png,null,gamePlayScreen);
        playGame.runAction(cc.ScaleTo.create(0,0.5,0.5));
        
        this.addChild(new cc.Menu(playGame));
        
        return true;
    }
});
var gamePlayScreen = function()
{
	cc.log("abc");
	cc.director.pushScene(new gameScene);
}
var homeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new homeLayer();
        this.addChild(layer);
    }
});


var homeLayer = cc.Layer.extend({

    sprite:null,
    nameField:null,
    ctor:function () {
        this._super();
        cc.director.setClearColor(cc.color(39,40,34,0));
        
        var size = cc.winSize;
        /*var gameLabel = new cc.LabelTTF("Save the Helicopter", "Arial", 45);
        gameLabel.x = size.width / 2;
        gameLabel.y = size.height / 2 + 100;
        this.addChild(gameLabel, 0);*/

        var gameImage = new cc.Sprite.create(res.GameImage_png);
        gameImage.setPosition(size.width / 2, size.height/2+180);
        this.addChild(gameImage,0);

		var playGame = new cc.MenuItemImage.create(res.PlayGame_png,null,gamePlayScreen,this);
        playGame.runAction(cc.ScaleTo.create(0,0.5,0.5));
        this.addChild(new cc.Menu(playGame));

    	nameField = new ccui.TextField();
    	nameField.setTouchEnabled(true);
    	nameField.fontName = "Arial";
    	nameField.placeHolder = "Enter Your Name";
    	nameField.fontSize = 30;
    	nameField.x = size.width/2;
    	nameField.y = size.height/2 - 100; 
    	nameField.addEventListener(this.textFieldEvent, this);
    	this.addChild(nameField);
         
        return true;
    },
    textFieldEvent: function(sender, type)
    {
        switch (type)
        {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                 nameField.placeHolder = "|";
                 break;
        }
    }
});

var gamePlayScreen = function()
{
	cc.director.pushScene(new gameScene);
}
var homeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new homeLayer();
        this.addChild(layer);
    }
});


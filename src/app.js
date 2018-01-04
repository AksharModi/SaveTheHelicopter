var homeLayer = cc.Layer.extend({

    sprite:null,
    nameField:null,
    ctor:function () {
        this._super();
        cc.director.setClearColor(cc.color(155,155,155,155));
        
        var size = cc.winSize;
        var gameLabel = new cc.LabelTTF("Save the Helicopter", "Comic Sans MS", 45);
        gameLabel.x = size.width / 2;
        gameLabel.y = size.height / 2 + 100;
        this.addChild(gameLabel, 0);

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
                cc.log("Activate");

                break;

            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("Deactivate");
        }
    }
});

var gamePlayScreen = function()
{
	cc.log(nameField.string);
	cc.director.pushScene(new gameScene);
}
var homeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new homeLayer();
        this.addChild(layer);
    }
});


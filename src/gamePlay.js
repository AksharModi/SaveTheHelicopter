var obj;
var bar;
var flagPressed=false;
var helicopter;
var v1 =0;
var v2 =0;
var gameLayer = cc.Layer.extend({


    sprite:null,
    ctor:function () {
        
        this._super();
        cc.director.setClearColor(cc.color(255,255,255,255));
        var size = cc.winSize;
        var gameStartLabel = new cc.LabelTTF("Click to Start", "Comic Sans MS", 25);
        gameStartLabel.x = size.width / 2;
        gameStartLabel.y = size.height / 2 + 100;
        this.addChild(gameStartLabel, 0);
        obj=this;
        helicopter = new cc.Sprite.create(res.Helicopter_png);
        helicopter.setAnchorPoint(cc.p(0.5,0.5));
        helicopter.setPosition(cc.p(120,size.height/2));
        helicopter.runAction(cc.ScaleTo.create(0,0.1,0.1));
        this.addChild(helicopter, 0);
        this.schedule(CreateBarriers,2);
        this.schedule(movePressed,0);
        this.schedule(collisionDetect,0);
        cc.log("w:"+helicopter.width);
        if(cc.sys.capabilities.hasOwnProperty('keyboard'))
        {
            cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key,event)
                {
                    if(key.toString()==32)
                        flagPressed=true;                                            
                },
                onKeyReleased: function(key,event)
                {
                    flagPressed=false;
                }    
            },this);
        }
        return true;        
    }    
});
var collisionDetect=function()
{
    if(helicopter==null || bar == null)
        return;
    var x=(helicopter.getPositionX()+30) - bar.getPositionX() ;
    var y=(helicopter.getPositionY()) - bar.getPositionY();
    if( (x<=10 && x>=-10) && (y >= -8 && y<=170))
    {
        cc.director.pause();
        cc.log(y);
    }
}

var movePressed=function()
{
    if(flagPressed==true)
        helicopter.runAction(cc.MoveBy.create(0.3,cc.p(0.5,4)));
    else
        helicopter.runAction(cc.MoveBy.create(0,cc.p(-0.4,-4)));
}
var CreateBarriers=function() 
{   
    var size = cc.winSize;
    bar = new cc.Sprite.create(res.Bar_png);
    bar.setAnchorPoint(0,0);
    var rndValY = 0;
    var min = 0; 
    var maxWidth = size.width;
    var maxHeight = size.height;
    var multiple = 50;
    rndValY = Math.floor(Math.random() * ((maxHeight - min) / multiple)) * multiple + min;
    bar.setPosition(cc.p(size.width,rndValY));
    obj.addChild(bar,0); 
    bar.runAction(cc.MoveTo.create(2,cc.p(-35,rndValY)));     
}

var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(layer);
    }
    
});


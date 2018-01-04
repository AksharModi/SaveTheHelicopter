var obj;
var save;
var name = "Player's";
var i=0;
var bar;
var header;
var footer;
var score=0;
var flagPressed=false;
var helicopter;
var scoreLabel;
var highScore;
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
        helicopter.runAction(cc.ScaleTo.create(0,0.12,0.12));
        this.addChild(helicopter, 0);
        this.schedule(CreateBarriers,1.5);
        this.schedule(movePressed,0);
        this.schedule(collisionDetect,0);

        scoreLabel = new cc.LabelTTF(score, "Comic Sans MS", 30);
        scoreLabel.setColor(cc.color(255,255,255,255));
    	scoreLabel.x = size.width/2 -220;
    	scoreLabel.y = 570;
    	if(nameField.string!="") 
			name = nameField.string + "'s";
    	this.addChild(scoreLabel,1);
        this.schedule(scoreCalc,0);

        highScore = cc.sys.localStorage.getItem("s");
    	if(highScore==null)
    		highScore=0;
    	highScoreLabel = new cc.LabelTTF("High Score: "+highScore, "Comic Sans MS", 30);
        highScoreLabel.setColor(cc.color(255,255,255,255));
    	highScoreLabel.x = size.width/2 +220;
    	highScoreLabel.y = 570;
    	this.addChild(highScoreLabel,2);

        header = new cc.Sprite.create(res.Border_png);
        header.setPosition(cc.p(480,600));
        this.addChild(header, 0);
         
        footer = new cc.Sprite.create(res.Border_png);
        footer.setPosition(cc.p(480,30));
        this.addChild(footer, 0);

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
        if(cc.sys.capabilities.hasOwnProperty('mouse'))
        {
            cc.eventManager.addListener(
            {
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event)
                {
                    flagPressed=true;
                },
                onMouseUp: function(event)
                {
					flagPressed=false;
                }   
            },this);
        }
        return true;        
    }    
});
var scoreCalc=function()
{
	i++;
	if(i%4 == 0)
		score++;
	scoreLabel.setString(name+" Score: "+ score.toString());
	save=score;
	if(highScore<save || highScore==null)
        {	
        	cc.sys.localStorage.setItem("s",save);
        	highScore = save;
        }
}
var collisionDetect=function()
{
    if(helicopter==null || bar == null)
        return;
    /*var x=(helicopter.getPositionX()+30) - bar.getPositionX() ;
    var y=(helicopter.getPositionY()) - bar.getPositionY();
    if( (x<=10 && x>=-10) && (y >= -8 && y<=170))
    {
        cc.director.pause();
        cc.log(y);
    }*/
    var heli = helicopter.getBoundingBox( );
    var b = bar.getBoundingBox( );
    var hd = header.getBoundingBox(); 
    var ft = footer.getBoundingBox(); 

    if (helicopter.getPositionY()<15 || cc.rectIntersectsRect(heli,b) || cc.rectIntersectsRect(heli,hd) || cc.rectIntersectsRect(heli,ft))
    {
        highScore = cc.sys.localStorage.getItem("s");
        cc.log(highScore);
        
        highScoreLabel.setString("High Score: "+ highScore);	
        cc.director.pause();
        cc.log(highScore);
            	
    }
}

/*
Mouse control-Done
Reward Screen -- Highest Score, Score,Replay button -- using state file
Add Sounds
Add Animation
*/


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
    var min = 50; 
    var maxWidth = size.width;
    var maxHeight = size.height-50;
    var multiple = 50;
    rndValY = Math.floor(Math.random() * ((maxHeight - min) / multiple)) * multiple + min;
    bar.setPosition(cc.p(size.width,rndValY));
    obj.addChild(bar,0); 
    bar.runAction(cc.MoveTo.create(1.5,cc.p(-60,rndValY)));     
}

var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(layer);
    }
    
});


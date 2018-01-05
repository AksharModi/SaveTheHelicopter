var obj;
var save;
var name = "Player's";
var i=0;
var bar;
var header;
var footer;
var score=0;
var size = cc.winSize;
var flagPressed=false;
var helicopter;
var scoreLabel;
var highScore;
var heli;
var b;
var hd;
var ft;
var gameLayer = cc.Layer.extend({

    sprite:null,
    ctor:function () {
        
        this._super();
        cc.director.setClearColor(cc.color(255,255,255,255));
        obj=this;
        flagPressed=false;
        helicopter = new cc.Sprite.create(res.Helicopter_png);
        helicopter.setAnchorPoint(cc.p(0.5,0.5));
        helicopter.setPosition(cc.p(120,size.height/2));
        helicopter.runAction(cc.ScaleTo.create(0,0.12,0.12));
        this.addChild(helicopter, 0);
        this.schedule(CreateBarriers,1.2);
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
 	    header.setScale(0.5,0.25)
        this.addChild(header, 5);
         
        footer = new cc.Sprite.create(res.Border2_png);
        footer.setPosition(cc.p(480,40));
        footer.setScale(0.3,0.3)
        this.addChild(footer, 5);

        if(cc.sys.capabilities.hasOwnProperty('keyboard'))
        {
            cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key,event)
                {
                    if(key.toString()==32  && flagPressed!=null)
					{
						flagPressed=true;
					}                        
                },
                onKeyReleased: function(key,event)
                {
                	if (flagPressed!=null)
	                    flagPressed=false;
                }    
            },this);
        }
        if(cc.sys.capabilities.hasOwnProperty('mouse') && flagPressed!=null)
        {
            cc.eventManager.addListener(
            {
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event)
                {
                	if (flagPressed!=null)
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
	if(i%4 == 0 && flagPressed!=null)
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
    if(helicopter==null || bar == null || flagPressed==null)
    	return;
    heli = helicopter.getBoundingBox();
    b = bar.getBoundingBox();
    hy = helicopter.getPositionY();
    if (hy<115|| hy>510 || cc.rectIntersectsRect(heli,b))
    {	
		helicopter.runAction(cc.FadeOut.create(0.5));
    	bar.pause();
    	flagPressed=null;
    	afterCollision();
    }
}
var afterCollision=function()
{
	cc.audioEngine.stopMusic(null);
    cc.audioEngine.setMusicVolume(0.2);
    cc.audioEngine.playMusic(res.Crash_mp3);
    highScore = cc.sys.localStorage.getItem("s");
    highScoreLabel.setString("High Score: "+ highScore);	            	
    obj.scheduleOnce(rewardScreen);
}
var pauseGame=function()
{
	cc.director.pause();
}
var rewardScreen=function()
{
		size=cc.winSize;
		var backScreen = new cc.Sprite.create(res.BackScreen_png);
        backScreen.setAnchorPoint(cc.p(0.5,0.5));
        backScreen.setPosition(cc.p(size.width/2,size.height/2));
        backScreen.runAction(cc.FadeIn.create(1));
        this.addChild(backScreen, 1);
		var replay = new cc.MenuItemImage.create(res.Replay_png,null,replayGame,this);
        replay.setPosition(cc.p(-70,-50));
        this.addChild(new cc.Menu(replay),2);
        replay.runAction(cc.FadeIn.create(1));
        var exitGame = new cc.MenuItemImage.create(res.ExitGame_png,null,exitGameFunc,this);
        exitGame.setPosition(cc.p(70,-50));
        exitGame.runAction(cc.FadeIn.create(1));
        this.addChild(new cc.Menu(exitGame),2);	
}
var replayGame=function()
{
	score=0;
	cc.director.popScene();
	cc.director.pushScene(new gameScene);
}
var exitGameFunc=function()
{
	score=0;
	cc.director.runScene(new homeScene);
}


var movePressed=function()
{
	if(flagPressed==null)
	{
		return;
	}
    if(flagPressed==true)
   	{
   	    helicopter.runAction(cc.MoveBy.create(0.3,cc.p(0.5,4)));
   	    if(!cc.audioEngine.isMusicPlaying())
    		cc.audioEngine.playMusic(res.Hover_mp3);
    	cc.audioEngine.setMusicVolume(1);	
    }
    else
    {
    	cc.audioEngine.setMusicVolume(0.3);
        helicopter.runAction(cc.MoveBy.create(0,cc.p(-0.4,-4)));
    }
}
var CreateBarriers=function() 
{   
	if(flagPressed==null)
	{
		bar=null;
		return;
	}
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
    bar.runAction(cc.MoveTo.create(1.2,cc.p(-60,rndValY)));     
}

var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(layer);
    }
    
});


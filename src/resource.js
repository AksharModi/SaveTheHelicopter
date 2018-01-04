var res = {
    HelloWorld_png : "res/HelloWorld.png",
    PlayGame_png : "res/PlayGame.png",
    Helicopter_png : "res/Helicopter.png",
    Bar_png : "res/barr.png",
    Border_png : "res/Border.png",
    Hover_mp3 : "res/sounds/hover.mp3",
    Crash_mp3 : "res/sounds/crash.mp3",
    Land_mp3 : "res/sounds/land.mp3"
};

var nameField;

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

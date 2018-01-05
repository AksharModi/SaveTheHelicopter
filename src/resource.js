var res = {
    GameImage_png : "res/images/GameImage.png",
    PlayGame_png : "res/images/PlayGame.png",
    Helicopter_png : "res/images/Helicopter.png",
    Bar_png : "res/images/barr.png",
    Border_png : "res/images/Border.png",
    Border2_png : "res/images/Border2.png",
    Hover_mp3 : "res/sounds/hover.mp3",
    Crash_mp3 : "res/sounds/crash.mp3",
    Land_mp3 : "res/sounds/land.mp3",
    BackScreen_png : "res/images/BackScreen.png",
    Replay_png : "res/images/Replay.png",
    ExitGame_png : "res/images/ExitGame.png"
};

var nameField;

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

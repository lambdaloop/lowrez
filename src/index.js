import {initialize as autotileInitialize} from 'phaser3-autotile';
import Phaser from 'phaser';

autotileInitialize();

var config = {
    type: Phaser.AUTO,
    width: 64,
    height: 64,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    zoom: 12
};

var game = new Phaser.Game(config);
var obj = {};
var keys = {};

function preload () {
    this.load.image('player', 'assets/player.png');
}

function create () {
    obj.camera = this.cameras.main;
    obj.camera.setBackgroundColor('#223388');
    obj.camera.setZoom(0.5);

    obj.player = this.add.image(32+8, 32+8, 'player');

    var keyboard = this.input.keyboard;
    // var keys = keyboard.addKeys('up,down,left,right');
    // console.log(keys)
    // keyboard.on('keydown', (e) => console.log(e));
    keyboard.on('keydown', (e) => handleKeydown(e.key));
}

var timers = {lastPress: 0};

var C = {
    KEY_DELAY: 300, // ms
    GRID_SIZE: 16,
}

function handleKeydown(key) {
    if(key == "ArrowLeft") {
        movePlayer(-1, 0);
    } else if(key == "ArrowRight") {
        movePlayer(1, 0);
    } else if(key == "ArrowDown") {
        movePlayer(0, 1);
    } else if(key == "ArrowUp") {
        movePlayer(0, -1);
    } else if(key == "1") {
        zoom(-1);
    } else if(key == "2") {
        zoom(1);
    }
}

function zoom(amount) {
    let newZoom = Math.pow(2, amount) * obj.camera.zoom;
    newZoom = Math.min(Math.max(0.125, newZoom), 1)
    obj.camera.setZoom(newZoom);
    console.log(obj.camera.displayWidth)

    // adjust camera to display world but focus on player
}

function movePlayer(dx, dy) {
    console.log("move", dx, dy)
    obj.player.x += dx * C.GRID_SIZE
    obj.player.y += dy * C.GRID_SIZE
    // update camera if moving past boundaries
}

function update (t, dt) {

}

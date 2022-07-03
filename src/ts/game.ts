import 'phaser';
import Stats from 'stats-js';
import Preload from './scenes/Preload';

/** Configuration of the game */
const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 854,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scale: {
        autoRound: true,
        mode: Phaser.Scale.ScaleModes.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    scene: [Preload]
}

/** Booting the game */
window.onload = () => {
    // initiate game object with above configuration
    let game: Phaser.Game = new Phaser.Game(gameConfig);

    // rescale game once, and everytime window resizes
    rescale(game);
    window.addEventListener('resize', () => rescale(game), false);

    // setup the stats when environemnt is development
    if (isInDevelopment()) setupStatsJS(game);
}

/**
 * Rescales game canvas to the maximum available dimensions
 *
 * @param {Phaser.Game} game object
 */
function rescale(game: Phaser.Game): void {
    const zoomX = Math.floor(window.innerWidth / game.scale.width);
    const zoomY = Math.floor(window.innerHeight / game.scale.height);
    const zoom = Math.min(zoomX, zoomY);
    game.scale.setZoom(zoom);
}

/** 
 * Returns true if the environment is developement
 * 
 * @return {boolean} is in development
 */
function isInDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
}

/**
 * Setup for the stats to show up on the screen
 *
 * @param {Phaser.Game} game
 */
function setupStatsJS(game: Phaser.Game): void {
    const stats = Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    game.events.on(Phaser.Core.Events.PRE_STEP, () => {
        stats.begin();
    });
    game.events.on(Phaser.Core.Events.POST_RENDER, () => {
        stats.end();
    });
}
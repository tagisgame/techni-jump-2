/**
 * @author Jakub 'tagis' Jakubski & Wojciech 'SentiWW' Warwas <contact@senti.dev>
 * @copyright 2022 Jakub Jakubski, Wojciech Warwas
 * @license {@link https://spdx.org/licenses/GPL-2.0-only.html}
 */

import 'phaser';
import DevTools from './modules/devTools';
import Stats from 'stats-js';
import PreloadingScene from './scenes/PreloadingScene';
import LoadingScene from './scenes/LoadingScene';
import TrackScene from './scenes/TrackScene';

/** Configuration of the game */
const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
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
    scene: [PreloadingScene, LoadingScene, TrackScene]
}

/** Booting the game */
window.onload = () => {
    // initiate game object with above configuration
    let game: Phaser.Game = new Phaser.Game(gameConfig);

    // rescale game once, and everytime window resizes
    rescale(game);
    window.addEventListener('resize', () => rescale(game), false);

    // setup the stats when environemnt is development
    if (DevTools.isInDevEnv()) setupStatsJS(game);
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
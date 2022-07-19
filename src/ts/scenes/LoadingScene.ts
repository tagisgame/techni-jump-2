/**
 * @author Jakub 'tagis' Jakubski & Wojciech 'SentiWW' Warwas <contact@senti.dev>
 * @copyright 2022 Jakub Jakubski, Wojciech Warwas
 * @license {@link https://spdx.org/licenses/GPL-2.0-only.html}
 */

import 'phaser';
import {Images, Spritesheets, Tilesets, Tilemaps, Sound, Lang, Preloaded} from '../assetsConstants';
import DevTools from '../modules/devTools';
import TranslationHandler from '../modules/translationHandler'
import Player from '../modules/Player';

interface LoadingScreenObj {
    percentageText: Phaser.GameObjects.Text,
    copyrightText: Phaser.GameObjects.Text,
    clickText: Phaser.GameObjects.Text,
    creatorsLogo: Phaser.GameObjects.Image,
    loadingWheel: Phaser.GameObjects.Sprite
};

export default class LoadingScene extends Phaser.Scene {
    /**
     * An object that stores instances of Game Objects
     * that appear on a loading screen
     *
     * @private
     * @type {LoadingScreenObj}
     * @memberof LoadingScene
     */
    private LoadingScreenObjects: LoadingScreenObj;

    /**
     * Height of the game screen
     *
     * @private
     * @type {number}
     * @memberof LoadingScene
     */
    private screenHeight: number;

    /**
     * Width of the game screen
     *
     * @private
     * @type {number}
     * @memberof LoadingScene
     */
    private screenWidth: number; 

    constructor() {
        super('LoadingScene');
    }

    preload() {
        /** Logging the start of a scene in dev environment */
        DevTools.devLog('Scene: LoadingScene started.\n=========');

        /** Loading the assets from constants file */
        Object.values(Images).forEach(value => {
            //this.load.image(value);
        });
        Object.values(Spritesheets).forEach(value => {
            this.load.spritesheet(value);
        });
        Object.values(Tilesets).forEach(value => {
            //this.load.spritesheet(value);
        });
        Object.values(Tilesets).forEach(value => {
        //this.load.tilemapTiledJSON(value);
        });

        this.screenWidth = this.cameras.main.width;
        this.screenHeight = this.cameras.main.height;

        /** Initiating loading screen */
        this.LoadingScreenObjects = {
            percentageText: this.make.text({
                x: this.screenWidth / 2,
                y: this.screenHeight / 2,
                text: '',
                style: {
                    font: '10px monospace',
                    color: '#ffffff'
                }
            }).setOrigin(0.5),
            copyrightText: this.make.text({
                x: this.screenWidth / 2,
                y: this.screenHeight - 50,
                text: 'Copyright (C) 2022 by Jakub Jakubski & Wojciech Warwas',
                style: {
                    font: '10px monospace',
                    color: '#ffffff'
                }
            }).setOrigin(0.5),
            creatorsLogo: this.add.image(
                this.screenWidth / 2,
                100,
                Preloaded.CreatorsLogo.key
            ).setOrigin(0.5).setScale(0.6, 0.6),
            clickText: this.make.text({
                x: -100,
                y: -100,
                text: 'Click anywhere to continue',
                style: {
                    color: '#ffffff',
                    font:'10px monospace'
                }
            }).setOrigin(0.5),
            loadingWheel: this.add.sprite(
                this.screenWidth / 2,
                this.screenHeight / 2,
                Preloaded.LoadingWheel.key
            )
        }

        /** File is being loaded */
        this.load.on('load', (file: Phaser.Loader.File) => {
            DevTools.devLog(`Loading file: ${file.key} ${file.type}...`)
        })

        /** Handling the load error */
        this.load.on('loaderror', (file: Phaser.Loader.File) => {
            DevTools.devLog(`Loader error: ${file.key} ${file.type} could not be loaded.`, 'error');
            this.scene.stop();
        })
        
        this.load.on('progress', (progress: number) => {
            this.LoadingScreenObjects.percentageText.setText((progress * 100) + '%');
        });
        
        /** Displaying "click anywhere to continue" after finished loading */
        this.load.on('complete', () => {
            DevTools.devLog('Loading complete. Displaying \'click anywhere to continue\'')
            this.LoadingScreenObjects.percentageText.destroy();
            this.LoadingScreenObjects.loadingWheel.destroy();
            this.LoadingScreenObjects.clickText.setX(this.screenWidth / 2);
            this.LoadingScreenObjects.clickText.setY(this.screenHeight / 2 + 50);
        });
    }

    create() {
        this.input.mouse.disableContextMenu();

        /** Switching to a TrackScene on mouse click or space press */    
        this.input.on('pointerdown', () => this.scene.start('TrackScene'));
        this.input.keyboard.on('keydown-SPACE', () => this.scene.start('TrackScene'));
    }
    
}
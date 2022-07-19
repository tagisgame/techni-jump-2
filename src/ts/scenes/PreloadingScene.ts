/**
 * @author Jakub 'tagis' Jakubski & Wojciech 'SentiWW' Warwas <contact@senti.dev>
 * @copyright 2022 Jakub Jakubski, Wojciech Warwas
 * @license {@link https://spdx.org/licenses/GPL-2.0-only.html}
 */

 import 'phaser';
 import { Preloaded, Lang } from '../assetsConstants';
 import DevTools from '../modules/devTools';
 
 /**
  * Scene that preloads assets required for loading screen
  *
  * @export
  * @class PreloadingScene
  * @extends {Phaser.Scene}
  */
 export default class PreloadingScene extends Phaser.Scene {
    
    constructor() {
        super('PreloadingScene');
    }

    preload(): void {
        DevTools.devLog('Scene: PreloadingScene started.\n=========');
        /** Preloading loading screen assets from constants file */
        this.load.spritesheet(Preloaded.LoadingWheel);
        this.load.image(Preloaded.CreatorsLogo);

        /** Preloading translation files */
        Object.values(Lang).forEach(value => {
            this.load.json(value);
        });

        /** Handling errors */
        this.load.on('loaderror', (file: Phaser.Loader.File) => {
            DevTools.devLog(`Loader error: ${file.key} could not be loaded.`, 'error');
            this.scene.stop();
        })
        
        /** After preloading crucial assets switching to LoadingScene */
        this.load.on('complete', () => {
            /** Sets language to browser language as default or to English */
            let lang = navigator.language.replace(/-\w\w$/, '');
            if (this.game.cache.json.getKeys().indexOf(lang) === -1)
                lang = 'en';
            DevTools.devLog(`Setting the ${lang} language as default.`);
            this.registry.set('lang', lang);

            /** Starting a regular loading screen */
            DevTools.devLog('Preloading completed. Starting the LoadingScene.');
            this.scene.start('LoadingScene');
        });
    }

 };
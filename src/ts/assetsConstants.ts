/**
 * @author Jakub 'tagis' Jakubski & Wojciech 'SentiWW' Warwas <contact@senti.dev>
 * @copyright 2022 Jakub Jakubski, Wojciech Warwas
 * @license {@link https://spdx.org/licenses/GPL-2.0-only.html}
 */

/** Static images imports */
import * as TestFloorPath from './../assets/images/testfloor.jpg';

export const Images = {
    /** type: <Phaser.Types.Loader.FileTypes.ImageFileConfig> */
    TestFloor: <Phaser.Types.Loader.FileTypes.ImageFileConfig> {
        key: 'testfloor',
        url: TestFloorPath
    }
}

/** Spritesheets imports */
import * as playerPath from './../assets/spritesheets/player.jpg';

export const Spritesheets = {
    /** type: <Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig> */

    /** Player spritesheet and its configuration */
    Player: <Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig> {
        key: 'player', /** unique key of object in game */
        url: playerPath,
        frameConfig: {frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0}
    }
}

/** Tileset images imports */

export const Tilesets = {
    /** type: <Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig> */
}

/** Tilemaps imports */

export const Tilemaps = {
    /** type: <Phaser.Types.Loader.FileTypes.TilemapJSONFileConfig> */
}

/** Sound imports */

export const Sound = {
    /** type: <Phaser.Types.Loader.FileTypes.AudioFileConfig> */
}

/** Translation files imports */
import * as EnPath from './../assets/lang/en.json';

export const Lang = {
    /** type: <Phaser.Types.Loader.FileTypes.JSONFileConfig> */
    En: <Phaser.Types.Loader.FileTypes.JSONFileConfig>{
        key: 'langEn',
        url: EnPath
    }
}

/** Assets that need to be preloaded first */
import * as LoadingPath from './../assets/preload/loading.png';
import * as CreatorsLogoPath from './../assets/preload/creators.png';

export const Preloaded = {
    /** Loading wheel spritesheet */
    LoadingWheel: <Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig> {
        key: 'loadingWheel',
        url: LoadingPath,
        frameConfig: {frameWidth: 32, frameHeight: 32, margin: 0, spacing: 0}
    },

    /** Logo of creators image and config */
    CreatorsLogo: <Phaser.Types.Loader.FileTypes.ImageFileConfig> {
        key: 'creatorsLogo',
        url: CreatorsLogoPath
    }
}
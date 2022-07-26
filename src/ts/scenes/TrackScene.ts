/**
 * @author Jakub 'tagis' Jakubski & Wojciech 'SentiWW' Warwas <contact@senti.dev>
 * @copyright 2022 Jakub Jakubski, Wojciech Warwas
 * @license {@link https://spdx.org/licenses/GPL-2.0-only.html}
 */

 import 'phaser';
 import {Images, Spritesheets, Tilesets, Tilemaps, Sound, Lang, Preloaded} from '../assetsConstants';
 import { GameConsts } from '../gameConstants';
 import Player from '../modules/Player';

 
 export default class TrackScene extends Phaser.Scene {
    private player: Player;
    private floor: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

    private jumpTimer?: Phaser.Time.TimerEvent;

    constructor() {
        super('TrackScene');
    }

    preload() {
        this.player = new Player(this, 50, 50);
        this.floor = this.physics.add.staticImage(0, 240, Images.TestFloor.key).setOrigin(0, 0.5);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.floor);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update(time: number, delta: number): void {
        /** 
         * Start player's jumping sequence if key's pressed
         * and if player is not jumping already
         */
        if (this.cursorKeys.up.isDown && this.jumpTimer === undefined && this.player.body.blocked.down) {
            this.player.startJumping();

            /** End jumping sequence after certain time has passed */
            this.jumpTimer = this.time.delayedCall(GameConsts.player.jumpingTime, () => {
                this.jumpTimer?.remove();
                this.jumpTimer = undefined;
                this.player.stopJumping();
            });
        }

        /** End player's jumping sequence if key's released */
        if (this.cursorKeys.up.isUp && this.jumpTimer !== undefined) {
            this.jumpTimer?.remove();
            this.jumpTimer = undefined;
            this.player.stopJumping();
        }

        /** Dash down if key's pressed and player is in air */
        if (this.cursorKeys.down.isDown && !this.player.body.blocked.down) 
            this.player.dashDown();

        this.player.update();
    }
 };
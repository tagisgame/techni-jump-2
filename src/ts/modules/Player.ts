/**
 * @author Jakub 'tagis' Jakubski & Wojciech 'SentiWW' Warwas <contact@senti.dev>
 * @copyright 2022 Jakub Jakubski, Wojciech Warwas
 * @license {@link https://spdx.org/licenses/GPL-2.0-only.html}
 */

import 'phaser';
import { Scene } from 'phaser';
import {Images, Spritesheets, Tilesets, Tilemaps, Sound, Lang} from '../assetsConstants';
import { GameConsts } from '../gameConstants';
import devTools from './devTools';

/**
 * Class of a Player object.
 *
 * @export
 * @class Player
 * @extends {Phaser.Physics.Arcade.Sprite}
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
    //== Attributes ============================================================

    /**
     * Flag that specifies whether player is on sloped section
     *
     * @default false
     * @private
     * @type {boolean}
     * @memberof Player
     */
    private onSlope: boolean;

    /**
     * Flag that specifies whether player is dashing down
     *
     * @default false
     * @private
     * @type {boolean}
     * @memberof Player
     */
    private isDashing: boolean;

    /**
     * Flag that specifies whether player is in jumping sequence
     *
     * @default false
     * @private
     * @type {boolean}
     * @memberof Player
     */
    private isJumping: boolean;

    //== Methods ===============================================================

    /**
     * Creates an instance of Player (Phaser.Physics.Arcade.Sprite)
     * and adds it to given scene
     * 
     * @param {Phaser.Scene} scene that player would be added to
     * @param {number} x x position of the player
     * @param {number} y y position of the player
     * @param {(string | number | undefined)} [frame] The Texture Frame this Player is using to render with.
     * @memberof Player
     */
    constructor(scene: Phaser.Scene, x: number, y: number, frame?: string | number | undefined) {
        super(scene, x, y, Spritesheets.Player.key, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.isJumping = false;
        this.onSlope = false;
    }

    /**
     * Gets called everytime update occurs on scene
     *
     * @memberof Player
     */
    public update(): void {
        /** Add negative vertical velocity while in jumping sequence */
        if (this.isJumping) this.setVelocityY(GameConsts.player.jumpingVelocity);

        /** Turn off dashing flag when player hits the ground */
        if (this.isDashing && this.body.touching.down) this.isDashing = false;
    }

    /**
     * Initiates jumping sequence
     * Gets called once when jump key is being pressed
     *
     * @memberof Player
     */
    public startJumping(): void {
        this.setGravityY(GameConsts.player.jumpingGravity);
        this.isJumping = true;
    }

    /**
     * Ends the jumping sequence
     * Gets called once when jump key is released or
     * if given time for a jump runs out
     *
     * @memberof Player
     */
    public stopJumping(): void {
        this.setGravityY(GameConsts.player.postJumpingGravity);
        this.isJumping = false;
    }

    /**
     * Pushes player swiftly towards the ground
     * Gets called once when down key is pressed
     *
     * @memberof Player
     */
    public dashDown(): void {
        /** No holding dash */
        if (this.isDashing) return;

        this.stopJumping();
        this.isDashing = true;
        this.setVelocityY(GameConsts.player.dashingVelocity);
    }

}
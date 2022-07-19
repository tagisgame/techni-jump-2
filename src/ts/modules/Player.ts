import 'phaser';
import {Images, Spritesheets, Tilesets, Tilemaps, Sound, Lang} from '../assetsConstants';

/**
 * Class of a Player object.
 *
 * @export
 * @class Player
 * @extends {Phaser.Physics.Arcade.Sprite}
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {

    /**
     * Creates an instance of Player (Phaser.Physics.Arcade.Sprite) and adds it to given scene.
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
    }

}
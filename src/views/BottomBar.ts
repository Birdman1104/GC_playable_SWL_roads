import { lego } from '@armathai/lego';
import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { PRICES } from '../configs/constants';
import { BottomBarEvents } from '../events/MainEvents';
import { makeSprite } from '../utils';

const SCALE = 0.5
const OFFSET = 80
export class BottomBar extends Container {
    private foodButton: Sprite;
    private joyButton: Sprite;
    private healthButton: Sprite;
    private houseButton: Sprite;

    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.buildFoodButton();
        this.buildJoyButton();
        this.buildHealthButton();
        this.buildHouseButton();
    }

    private buildFoodButton(): void {
        this.foodButton = makeSprite({ texture: Images['game/buy_cafe'], anchor: new Point(0.5, 0.5) });
        this.foodButton.interactive = true;
        this.foodButton.scale.set(SCALE);
        this.foodButton.on('pointerdown', () => {
            lego.event.emit(BottomBarEvents.BuyFoodClicked, PRICES.food);
        });
        this.foodButton.position.set(0, 0);
        this.addChild(this.foodButton);
    }

    private buildJoyButton(): void {
        this.joyButton = makeSprite({ texture: Images['game/buy_park'], anchor: new Point(0.5, 0.5) });
        this.joyButton.interactive = true;
        this.joyButton.scale.set(SCALE);
        this.joyButton.on('pointerdown', () => {
            lego.event.emit(BottomBarEvents.BuyJoyClicked, PRICES.joy);
        });
        this.joyButton.position.set(this.foodButton.x + this.foodButton.width / 2 + OFFSET, 0);
        this.addChild(this.joyButton);
    }

    private buildHealthButton(): void {
        this.healthButton = makeSprite({ texture: Images['game/buy_hospital'], anchor: new Point(0.5, 0.5) });
        this.healthButton.interactive = true;
        this.healthButton.scale.set(SCALE);
        this.healthButton.on('pointerdown', () => {
            lego.event.emit(BottomBarEvents.BuyHealthClicked, PRICES.health);
        });
        this.healthButton.position.set(this.joyButton.x + this.joyButton.width / 2 + OFFSET, 0);
        this.addChild(this.healthButton);
    }

    private buildHouseButton(): void {
        this.houseButton = makeSprite({ texture: Images['game/buy_house'], anchor: new Point(0.5, 0.5) });
        this.houseButton.interactive = true;
        this.houseButton.scale.set(SCALE);
        this.houseButton.on('pointerdown', () => {
            lego.event.emit(BottomBarEvents.BuyHouseClicked, PRICES.house);
        });
        this.houseButton.position.set(this.healthButton.x + this.healthButton.width / 2 + OFFSET, 0);
        this.addChild(this.houseButton);
    }
}

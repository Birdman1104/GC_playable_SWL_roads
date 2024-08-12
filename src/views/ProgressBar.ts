import anime from 'animejs';
import { Container, Graphics, Point, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { BAR_MAX, BarType } from '../configs/constants';
import { makeSprite } from '../utils';

export class ProgressBar extends Container {
    private icon: Sprite;
    private progressBar: Sprite;
    private progressBkg: Sprite;
    private valueText: Text;
    private maskGr: Graphics;
    private value: number;

    constructor(private _type: BarType) {
        super();
        this.build();
    }

    get type(): BarType {
        return this._type;
    }

    public updateValue(value: number): void {
        this.value = value;
        const newWidth = this.progressBar.width * (value / BAR_MAX);
        anime({
            targets: this.maskGr,
            width: newWidth,
            duration: 1000,
            easing: 'easeInOutSine',
            update: () => {
                this.maskGr.x = -this.progressBar.width / 2 + this.progressBar.x;
            },
        });
    }

    private build(): void {
        this.progressBkg = makeSprite({ texture: Images['game/progress_bkg'], anchor: new Point(0.5)});

        this.icon = makeSprite({ texture: this.getIconTexture(), anchor: new Point(0.5) });
        this.icon.position.set(-80, -25);

        this.valueText = new Text('1000', { fontSize: 28, fill: 0xffffff });
        this.valueText.anchor.set(0.5);
        this.valueText.position.set(40, -6);

        this.progressBar = makeSprite({ texture: Images['game/progress_bar'], anchor: new Point(0.5) });
        this.progressBar.position.set(25, 3);
        this.progressBar.scale.x = 0.925;
        const { width: w, height: h, x, y } = this.progressBar;

        this.maskGr = new Graphics();
        this.maskGr.beginFill(0xffffff);
        this.maskGr.drawRect(0, 0, w, h);
        this.maskGr.endFill();

        this.progressBar.mask = this.maskGr;

        this.addChild(this.progressBkg, this.progressBar, this.maskGr, this.icon);
    }

    private getIconTexture(): string {
        let texture = '';

        switch (this.type) {
            case BarType.Health:
                texture = Images['game/health_icon'];
                break;
            case BarType.Food:
                texture = Images['game/food_icon'];
                break;
            case BarType.Joy:
                texture = Images['game/joy_icon'];
                break;

            default:
                break;
        }
        return texture;
    }
}

import anime from 'animejs';
import { Container, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { BarType } from '../configs/constants';
import { makeSprite } from '../utils';


export class ProgressBar extends Container {
    private icon: Sprite;
    private progressBkg: Sprite;
    private valueText: Text; 

    constructor(private _type: BarType) {
        super();
        this.build();
    }

    get type(): BarType {
        return this._type;
    }

    public update(value: number): void {
        const scale = value < +this.valueText.text ? 0.8 : 1.2
        this.valueText.text = `${value}`
        anime({
            targets: this.valueText.scale,
            x: scale,
            y: scale,
            duration: 100,
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: 1,
            complete: () => {
                this.valueText.scale.set(1)
            }
        })
    }

    private build(): void {
        this.progressBkg = makeSprite({ texture: Images['game/progress_bkg'] });

        this.icon = makeSprite({ texture: this.getIconTexture() });
        this.icon.x = -50;
        
        this.valueText = new Text('1000', { fontSize: 28, fill: 0xffffff });
        this.valueText.anchor.set(0.5);
        this.valueText.position.set(40, -6);

        this.addChild(this.progressBkg, this.valueText, this.icon);
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

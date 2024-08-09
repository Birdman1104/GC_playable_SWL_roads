import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BarType } from '../configs/constants';
import { makeSprite } from '../utils';

export class ProgressBar extends Container {
    private icon: Sprite;
    private progressBkg: Sprite;

    constructor(private _type: BarType) {
        super();
        this.build();
    }

    get type(): BarType {
        return this._type;
    }

    private build(): void {
        this.progressBkg = makeSprite({ texture: Images['game/progress_bkg'] });

        this.icon = makeSprite({ texture: this.getIconTexture() });
        this.icon.x = -50;


        this.addChild(this.progressBkg, this.icon);
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

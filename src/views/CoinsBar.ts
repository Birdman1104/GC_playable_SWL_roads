import { Container, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

export class CoinsBar extends Container {
    private icon: Sprite;
    private bkg: Sprite;
    private coinsText: Text;

    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.bkg = makeSprite({ texture: Images['game/progress_bkg'] });

        this.icon = makeSprite({ texture: Images['game/coin_icon'] });
        this.icon.x = -50;

        this.coinsText = new Text('0', { fontSize: 28, fill: 0xffffff });
        this.coinsText.anchor.set(0.5);
        this.coinsText.position.set(40, -6);

        this.addChild(this.bkg, this.coinsText, this.icon);
    }
}

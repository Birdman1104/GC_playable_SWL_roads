import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { lp, makeSprite } from '../utils';

const BOUNDS = {
    landscape: { x: -600, y: -500, width: 1050, height: 800 },
    portrait: { x: -600, y: -400, width: 1050, height: 600 },
};
export class BoardView extends Container {
    private bkg: Sprite;
    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);

        this.build();
    }

    get viewName() {
        return 'BoardView';
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: PIXI.Rectangle | undefined): PIXI.Rectangle {
        const { x, y, width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        return new Rectangle(x, y, width, height);
    }

    public rebuild(): void {
        //
    }

    private build(): void {
        this.buildBkg('game/bkg');
    }

    private onGameStateUpdate(state: GameState): void {
        //
    }

    private buildBkg(texture: string): void {
        this.bkg?.destroy();

        this.bkg = makeSprite({ texture: Images[texture] });
        this.addChild(this.bkg);
    }
}

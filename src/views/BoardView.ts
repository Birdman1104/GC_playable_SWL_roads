import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import { AreaModel } from '../models/AreaModel';
import { BoardModel } from '../models/BoardModel';
import { GameState } from '../models/GameModel';
import { lp, makeSprite } from '../utils';
import { Area } from './Area';

const BOUNDS = {
    landscape: { x: -600, y: -500, width: 1050, height: 800 },
    portrait: { x: -600, y: -400, width: 1050, height: 600 },
};
export class BoardView extends Container {
    private bkg: Sprite;
    private road: Sprite;

    constructor(private config: BoardModel) {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.AreasUpdate, this.onAreasUpdate, this);

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
        this.buildBkg();
    }

    private onAreasUpdate(areas: AreaModel[]): void {
        areas.forEach((area) => {
            const areaSprite = new Area(area);
            areaSprite.position.set(area.x, area.y);
            this.addChild(areaSprite);
        });
    }

    private onGameStateUpdate(state: GameState): void {
        //
    }

    private buildBkg(): void {
        this.bkg?.destroy();

        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.bkg.y = 28
        // this.bkg.x = 25
        this.addChild(this.bkg);
    }

}

import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardEvents } from '../events/MainEvents';
import { AreaModelEvents, BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import { AreaModel, BuildingType } from '../models/AreaModel';
import { BoardModel } from '../models/BoardModel';
import { GameState } from '../models/GameModel';
import { delayRunnable, isSquareLikeScreen, lp, makeSprite } from '../utils';
import { Area } from './Area';

const BOUNDS = {
    landscape: { x: -600, y: -450, width: 1050, height: 900 },
    portrait: { x: -600, y: -500, width: 1050, height: 700 },
    isPortraitSquare: { x: -600, y: -400, width: 1050, height: 700 },
};
export class BoardView extends Container {
    private bkg: Sprite;
    private areas: Area[] = [];

    constructor(private config: BoardModel) {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.AreasUpdate, this.onAreasUpdate, this)
            .on(AreaModelEvents.BuildingUpdate, this.onAreaBuildingUpdate, this);

        this.build();
    }

    get viewName() {
        return 'BoardView';
    }

    public getBuildingByUuid(uuid: string): Area | undefined {
        return this.areas.find((area) => area.uuid === uuid);
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: PIXI.Rectangle | undefined): PIXI.Rectangle {
        const bounds = isSquareLikeScreen() ? BOUNDS.isPortraitSquare : lp(BOUNDS.landscape, BOUNDS.portrait);
        const { x, y, width, height } = bounds;
        return new Rectangle(x, y, width, height);
    }

    public rebuild(): void {
        //
    }

    private build(): void {
        this.buildBkg();
    }

    private onAreasUpdate(areas: AreaModel[]): void {
        this.areas = areas.map((a) => {
            const area = new Area(a);
            area.on('animationComplete', () => {
                delayRunnable(0.3, () => lego.event.emit(BoardEvents.HouseAnimationComplete));
            });
            area.position.set(a.x, a.y);
            this.addChild(area);
            return area;
        });
    }

    private onGameStateUpdate(state: GameState): void {
        //
    }

    private onAreaBuildingUpdate(newBuilding: BuildingType, oldBuilding: BuildingType, uuid): void {
        const area = this.getBuildingByUuid(uuid);
        if (!area) return;

        area.addBuilding(newBuilding);
    }

    private buildBkg(): void {
        this.bkg?.destroy();

        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.bkg.y = 28;
        this.addChild(this.bkg);
    }
}

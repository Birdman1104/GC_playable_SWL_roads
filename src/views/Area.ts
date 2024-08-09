import anime from 'animejs';
import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { AreaModel, AreaType, BuildingType } from '../models/AreaModel';
import { makeSprite } from '../utils';

export class Area extends Container {
    private area: Sprite;
    private building: Sprite;
    private _type: AreaType;

    constructor(private config: AreaModel) {
        super();

        this.build();
    }

    get uuid() {
        return this.config.uuid;
    }

    get type() {
        return this.config.type;
    }

    public addBuilding(buildingType: BuildingType): void {
        this.building = makeSprite(getBuildingImgConfig(buildingType));
        this.building.scale.set(0);
        anime({
            targets: this.area.scale,
            x: 0,
            y: 0,
            duration: 200,
            easing: 'easeInOutSine',
            complete: () => {
                anime({
                    targets: this.building.scale,
                    x: 1,
                    y: 1,
                    duration: 200,
                    easing: 'easeInOutSine',
                });
            }
        })
        this.addChild(this.building);
    }

    private build() {
        this.config.building ? this.buildBuilding() : this.buildArea();
    }

    private buildArea() {
        this.area = makeSprite({ texture: Images[`game/${this.type}`], anchor: new Point(0.5, 0.5) });
        this.addChild(this.area);
    }

    private buildBuilding() {
        this.building = makeSprite(getBuildingImgConfig(this.config.building));
        this.addChild(this.building);
    }
}

const getBuildingImgConfig = (building: BuildingType): { texture: string; anchor: Point } => {
    let texture = Images['game/house'];
    let anchor = new Point(0.5, 0.7);
    switch (building) {
        case BuildingType.Hospital:
            texture = Images['game/hospital'];
            anchor = new Point(0.5, 0.7);
            break;
        case BuildingType.Food:
            texture = Images['game/cafe'];
            anchor = new Point(0.55, 0.6);
            break;
        case BuildingType.Park:
            texture = Images['game/alley_fountain'];
            anchor = new Point(0.5, 0.6);
            break;
        case BuildingType.FortuneWheel:
            texture = Images['game/fortune_wheel'];
            anchor = new Point(0.5, 0.8);
            break;
        case BuildingType.WinterFountain:
            texture = Images['game/winter_fountain'];
            anchor = new Point(0.5, 0.55);
            break;
        case BuildingType.House:
            texture = Images['game/house'];
            anchor = new Point(0.5, 0.7);
            break;
        default:
            break;
    }

    return { texture, anchor };
};

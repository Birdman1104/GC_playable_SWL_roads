import { Container, Point, Sprite } from "pixi.js";
import { Images } from "../assets";
import { AreaModel, AreaType, BuildingType } from "../models/AreaModel";
import { makeSprite } from "../utils";

export class Area extends Container {
  private area: Sprite;
  private building: Sprite;
  private _type: AreaType

    constructor(private config: AreaModel) {
        super();

        this.build()
    }

    get uuid() {
        return this.config.uuid;
    }

    get type() {
        return this.config.type;
    }

    private build() {
        this.config.building ? this.buildBuilding() : this.buildArea();
        
    }

    private buildArea() {
        this.area = makeSprite({ texture: Images[`game/${this.type}`], anchor: new Point(0.5, 0.5) })
        this.addChild(this.area);
    }

    private buildBuilding() {
        this.building = makeSprite({ texture: getBuildingImg(this.config.building), anchor: new Point(0.5, 0.7) })
        this.addChild(this.building);
    }
}

const getBuildingImg = (building: BuildingType): string => {
  switch (building) {
    case BuildingType.Hospital:
      return Images['game/hospital'];
  
    case BuildingType.Food:
      return Images['game/cafe'];

    case BuildingType.Park:
      return Images['game/alley_fountain'];

    case BuildingType.House:
      return Images['game/house'];
  
    default:
      break;
  }


  return ''
}
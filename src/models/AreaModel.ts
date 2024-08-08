import { ObservableModel } from './ObservableModel';

export enum BuildingType {
    House = 'house',
    Park = 'park',
    Hospital = 'hospital',
    Food = 'food',
}

export enum AreaType {
    Square = 'square',
    Rectangle = 'rectangle',
}

export class AreaModel extends ObservableModel {
    private _locationID: string;
    private _building: BuildingType;
    private _areaType: AreaType;

    constructor(private config: { locationID: string; areaType: AreaType; building?: BuildingType }) {
        super('AreaModel');

        this.makeObservable();
    }

    public get locationID(): string {
        return this._locationID;
    }

    public get areaType(): AreaType {
        return this._areaType;
    }

    public get building(): BuildingType {
        return this._building;
    }

    public set building(value: BuildingType) {
        this._building = value;
    }

    public initialize(): void {
        this._locationID = this.config.locationID;
        this.config.building && (this.building = this.config.building);
        this._areaType = this.config.areaType;
    }

    public addBuilding(building: BuildingType): void {
        this._building = building;
    }
}

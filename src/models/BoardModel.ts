import { AREAS } from '../configs/AreasConfig';
import { AreaModel, BuildingType } from './AreaModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _coins = 1000;
    private _health = 10;
    private _food = 10;
    private _joy = 10;

    private _areas: AreaModel[] = [];

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    public get coins(): number {
        return this._coins;
    }

    public get health(): number {
        return this._health;
    }

    public get food(): number {
        return this._food;
    }

    public get joy(): number {
        return this._joy;
    }

    public get areas(): AreaModel[] {
        return this._areas;
    }

    public set areas(value: AreaModel[]) {
        this._areas = value;
    }

    public addCoins(value: number): void {
        this._coins += value;
    }

    public addHealth(value: number): void {
        this._health += value;
    }

    public addFood(value: number): void {
        this._food += value;
    }

    public addJoy(value: number): void {
        this._joy += value;
    }

    public decreaseCoins(value: number): void {
        this._coins -= value;
    }

    public decreaseHealth(value: number): void {
        this._health -= value;
    }

    public decreaseFood(value: number): void {
        this._food -= value;
    }

    public decreaseJoy(value: number): void {
        this._joy -= value;
    }

    public addBuilding(uuid: string, building: BuildingType): void {
        const area = this.areas.find((area) => area.uuid === uuid);
        if (!area) return;
        area.addBuilding(building);
    }

    public initialize(): void {
        this.areas = AREAS.map((area) => {
            const areaModel = new AreaModel(area);
            areaModel.initialize();
            return areaModel;
        })
    }
}

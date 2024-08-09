import { AREAS } from '../configs/AreasConfig';
import { BUTTONS_CONFIG } from '../configs/ButtonsConfig';
import { AreaModel, AreaType, BuildingType } from './AreaModel';
import { ButtonModel } from './ButtonModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _coins = 1000;
    private _health = 10;
    private _food = 10;
    private _joy = 10;
    private _buttons: ButtonModel[] = [];

    private _areas: AreaModel[] = [];

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    public get coins(): number {
        return this._coins;
    }

    public set coins(value: number) {
        this._coins = value;
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

    public get buttons(): ButtonModel[] {
        return this._buttons;
    }

    public set buttons(value: ButtonModel[]) {
        this._buttons = value;
    }

    public getFreeAreaByType(type: AreaType): AreaModel | undefined {
        const freeAreas = this.areas.filter((area) => area.type === type && !area.building);
        const rnd = Math.floor(Math.random() * freeAreas.length);
        return freeAreas.length === 0 ? undefined : freeAreas[rnd];
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

        this.buttons.forEach((b) => {
            if (b.price > this._coins) {
                b.isActive = false;
            }
        });
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
        });

        this._buttons = BUTTONS_CONFIG.map((c) => {
            const buttonModel = new ButtonModel(c);
            buttonModel.initialize();
            return buttonModel;
        });
    }
}

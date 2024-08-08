import { Container } from 'pixi.js';
import { BarType } from '../configs/constants';
import { CoinsBar } from './CoinsBar';
import { ProgressBar } from './ProgressBar';

export class TopBar extends Container {
    private foodBar: ProgressBar;
    private joyBar: ProgressBar;
    private healthBar: ProgressBar;
    private coinsBar: CoinsBar;

    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.buildFoodBar();
        this.buildJoyBar();
        this.buildHealthBar();
        this.buildCoinsBar();
    }

    private buildFoodBar(): void {
        this.foodBar = new ProgressBar(BarType.Food);
        this.foodBar.position.set(0,0);
        this.addChild(this.foodBar);
    }
    
    private buildJoyBar(): void {
        this.joyBar = new ProgressBar(BarType.Joy);
        this.joyBar.position.set(this.foodBar.x + this.foodBar.width + 30, 0);
        this.addChild(this.joyBar);
    }
    
    private buildHealthBar(): void {
        this.healthBar = new ProgressBar(BarType.Health);
        this.healthBar.position.set(this.joyBar.x + this.joyBar.width + 30, 0);
        this.addChild(this.healthBar);
    }
    
    private buildCoinsBar(): void {
        this.coinsBar = new CoinsBar();
        this.coinsBar.position.set(this.healthBar.x + this.healthBar.width + 30, 0);
        this.addChild(this.coinsBar);
    }
}

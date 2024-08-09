import { lego } from '@armathai/lego';
import { Container } from 'pixi.js';
import { BoardModelEvents, ButtonModelEvents } from '../events/ModelEvents';
import { ButtonModel } from '../models/ButtonModel';
import { Button } from './Button';

const OFFSET = 80
export class BottomBar extends Container {
    private buttons: Button[] = []

    constructor() {
        super();

        lego.event
        .on(BoardModelEvents.ButtonsUpdate, this.onButtonsUpdate, this)
        .on(ButtonModelEvents.IsActiveUpdate, this.onButtonActiveUpdate, this)
        this.build();
    }

    private build(): void {
        //
    }

    private onButtonsUpdate(buttons: ButtonModel[]): void {
        this.buttons = buttons.map((c, i)=> {
            const button = new Button(c)
            button.position.set(button.width * 1.2* i + OFFSET, 0)
            this.addChild(button)
            return button
        }) 

        this.emit('rebuild')
    }

    private onButtonActiveUpdate(isActive: boolean, wasActive: boolean, uuid: string): void {
        const button = this.buttons.find(b=> b.uuid === uuid)
        if(!button) return

        isActive ? button.activate() : button.deactivate()
    }
}

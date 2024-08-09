import { lego } from '@armathai/lego';
import { BottomBarEvents, MainGameEvents, TakeMe } from '../events/MainEvents';
import { AdModelEvents, GameModelEvents } from '../events/ModelEvents';
import {
    onAdStatusUpdateCommand,
    onBuyFoodClickedCommand,
    onBuyHospitalClickedCommand,
    onBuyHouseClickedCommand,
    onBuyJoyClickedCommand,
    onGameStateUpdateCommand,
    onMainViewReadyCommand,
    resizeCommand,
    takeToStoreCommand
} from './Commands';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: AdModelEvents.StatusUpdate,
        command: onAdStatusUpdateCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
    {
        event: MainGameEvents.Resize,
        command: resizeCommand,
    },
    {
        event: TakeMe.ToStore,
        command: takeToStoreCommand,
    },
    {
        event: BottomBarEvents.BuyFoodClicked,
        command: onBuyFoodClickedCommand,
    },
    {
        event: BottomBarEvents.BuyHealthClicked,
        command: onBuyHospitalClickedCommand,
    },
    {
        event: BottomBarEvents.BuyHouseClicked,
        command: onBuyHouseClickedCommand,
    },
    {
        event: BottomBarEvents.BuyJoyClicked,
        command: onBuyJoyClickedCommand,
    },
]);

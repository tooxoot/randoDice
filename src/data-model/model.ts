import { GenericRoller as GR } from '../utils/diceUtils/generic.roller';
import { NumberRoller as NR } from '../utils/diceUtils/number.roller';

export type LogEntry = {
    title: string;
    info: string;
    result: GR.Result<number>;
};

export type RollAction<ChoosableType extends {[key: string]: number}> = {
    choosables: ChoosableType
    text: string;
    action: (args: ChoosableType) => (result?: GR.Result<number>) => GR.Result<number> | number,
};

type rollADiceChoosables = {faces: number, numberOfRolls: number};

const rollADice: RollAction<{faces: number, numberOfRolls: number}> = {
    choosables: {
        faces: 1,
        numberOfRolls: 2
    },
    text: 'reroll all $a s and then reroll all $b',
    action: ({faces, numberOfRolls}: rollADiceChoosables) => () => NR.rollD(faces, numberOfRolls),
};
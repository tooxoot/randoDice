import { GenericRoller as GR } from './generic.roller';
export namespace NumberRoller {
    export const rollD = (maxEyes: number, rolls: number) => GR.rand<number>(
        Array.from({ length: maxEyes }, (_, idx) => idx + 1),
        rolls
    );

    export const rollD6 = (rolls: number) => rollD(6, rolls);

    export const rollD3 = (rolls: number) => rollD(3, rolls);

    export const countExact = (roll: number) => (result: GR.Result<number>) => GR.countIdx(...result.values.reduce(
        (idxs, val, idx) => val === roll ? idxs.concat(idx) : idxs, [])
    )(result);

    export const countPlus = (min: number) => (result: GR.Result<number>) => GR.countIdx(...result.values.reduce(
        (idxs, val, idx) => val >= min ? idxs.concat(idx) : idxs, [])
    )(result);

    export const reroll = (rolls: number) => (result: GR.Result<number>) => GR.rerollIdx(...result.values.reduce(
        (idxs, val, idx) => val === rolls ? idxs.concat(idx) : idxs, [])
    )(result);

    export const rerollFails = (min: number) => (result: GR.Result<number>) => GR.rerollIdx(...result.values.reduce(
        (idxs, val, idx) => val < min ? idxs.concat(idx) : idxs, [])
    )(result);
}

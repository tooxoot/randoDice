// tslint:disable:no-any

export namespace GenericRoller {
    export interface Result<T> {
        values: Array<T>;
        results: number[];
        resultCount: number[];
    }

    export const randomIndexOf = (arr: Array<any>) => () => Math.floor(Math.random() * arr.length);
    export const getResultCounts = (values: Array<any>, results: number[]) => results.reduce(
        (counts, rollIdx) => {
            counts[rollIdx]++;
            return counts;
        },
        values.map(() => 0)
    );

    export function rand<T>(arr: Array<T>, rolls: number) {
        const randIdx = randomIndexOf(arr);
        const results = Array.from(
            { length: rolls },
            () => randIdx()
        );
        const resultCount = getResultCounts(arr, results);

        return {
            values: arr,
            results,
            resultCount
        };
    }

    export const countIdx = (...idxs: number[]) => (result: Result<any>) =>
        idxs.map(idx => result.resultCount[idx]).reduce((sum, count) => sum + count);

    export const rerollIdx = (...idxs: number[]) => (result: Result<any>) => {
        const randIdx = randomIndexOf(result.values);
        const idxsContain = (i: number) => idxs.some(idx => idx === i);
        const results = result.results.map(rollIdx => idxsContain(rollIdx) ? randIdx() : rollIdx);
        const resultCount = getResultCounts(result.values, results);

        return {
            values: result.values,
            resultCount,
            results,
        };
    };
}

// const D6x100 = rollD6(100)

// console.log(D6x100)
// console.log(countPlus(4)(D6x100))
// console.log(reroll(1)(D6x100))
// console.log(rerollFails(4)(D6x100))

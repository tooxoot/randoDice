import * as Redux from 'redux';
import { LogEntry, ResultEntry}  from '../data-model/model';
import { GenericRoller as GR }  from '../utils/diceUtils/generic.roller';

export interface ReduxState {
    currentResult: GR.Result<number>;
    log: (LogEntry | ResultEntry<number>)[];
}

const initialState: ReduxState = {
    currentResult: null,
    log: [],
};

const reducerMap: {[type: string]: (state: ReduxState, action: Redux.Action) => ReduxState} = {

};

function mainReducer ( state: ReduxState, action: Redux.Action): ReduxState {
    if (!reducerMap[action.type]) {
        console.error(`redux.state.ts: Unknown action type ${action.type}!`);
        return state;
    }

    return reducerMap[action.type](state, action);
}

export const RSTORE = Redux.createStore<ReduxState>(mainReducer, initialState);
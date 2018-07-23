import { ReduxState } from '../redux-model/redux.state';
import { Action } from 'redux';

export module ReduxUtils {
    export function makeTypeActionAndReducer<InnerState>(key: keyof ReduxState) {
        type Arguments = Partial<InnerState>;

        const type = /(^|[A-Z][a-z]*)/.exec(key).reduce(
            (typeString, match) => typeString + match.toUpperCase(),
            ''
        );

        const action = (args: Arguments): Action & Arguments => Object.assign({type}, args);

        const reducer = (state: ReduxState, args: Action): ReduxState => ({
            ...state,
            [key]: Object.assign(state[key], args as Action & Arguments),
        });

        return {type, action, reducer};
    }
}
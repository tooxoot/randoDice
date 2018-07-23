import * as React from 'react';
import { LogEntry }  from '../data-model/model';
import * as ReactRedux from 'react-redux';
import { LogEntryComponent } from './log.entry';
import { ReduxState } from '../redux-model/redux.state';

interface Props {
    entries: LogEntry[];
}

interface State {
    // isUnfolded: boolean;
}

export class LogComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="log">
                {this.props.entries.map(entry => (<LogEntryComponent entry={entry}/>))}
            </div>
        );
    }
}

const stateToProps = (state: ReduxState): Props => ({
    entries: state.log
});

export const LOG = ReactRedux.connect(
    stateToProps
)(LogComponent);

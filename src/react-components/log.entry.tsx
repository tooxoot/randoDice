import * as React from 'react';
import { LogEntry }  from '../data-model/model';
import { GenericRoller as GR }  from '../utils/diceUtils/generic.roller';

interface Props {
    entry: LogEntry;
}

interface State {
    isUnfolded: boolean;
}

export class LogEntryComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isUnfolded: false,
        };
    }

    render() {
        const toggleFold = this.props.entry.result ?
            () => this.setState({isUnfolded: !this.state.isUnfolded}) :
            () => true;

        return (
            <div className="log-entry" onClick={toggleFold}>
                <svg width="20" height="20" viewBox="0 0 35 50">
                    <path
                        d="M0,5,5,0,35,25,5,50,0,45,24,25z"
                        transform={this.state.isUnfolded ? 'rotate(90,17.5,25)' : ''}
                    />
                </svg>
                <div className="log-entry-title">{this.props.entry.title}</div>
                <div className="log-entry-title">{this.props.entry.info}</div>
                { this.props.entry.result && this.state.isUnfolded ?
                    (<ResultTable  result={this.props.entry.result}/>) :
                    null
                }
            </div>
        );
    }
}

interface ResultTableProps {
    result: GR.Result<number>;
}

const ResultTable: React.SFC<ResultTableProps> = ({result}: ResultTableProps) => (
    <table>
        <tr>
            {result.values.map(value => (<th>{value}</th>))}
        </tr>
        <tr>
            {result.resultCount.map(count => (<td>{count}</td>))}
        </tr>
    </table>
);
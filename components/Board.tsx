import R from 'ramda';
import React from 'react';
import {ActionCreator} from 'redux';

import {range} from '../util';

import Row from './Row';

export default class Board extends React.Component {
    public props!: { availableMoves: number[], board: string, width: number, height: number, selectCell: ActionCreator<number> };

    public render() {
        const {height} = this.props;
        return (<table className="board">
            <tbody>
            {R.map((i) => <Row {...this.props} key={i} row={i}/>, range(height))}
            </tbody>
        </table>);
    }
}

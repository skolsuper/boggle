import R from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from 'redux';

import {selectCell} from '../actions';
import {range} from '../util';

import Row from './Row';

class Board extends React.Component {
    public props!: { availableMoves: number[], board: string, width: number, height: number, selectCell: ActionCreator<number> };

    public render() {
        const {height} = this.props;
        return (<table>
            <tbody>
            {R.map((i) => <Row {...this.props} key={i} row={i}/>, range(height))}
            </tbody>
        </table>);
    }
}

const mapStateToProps = ({availableMoves, board}: { availableMoves: number[], board: string }) => ({availableMoves, board});
export default connect(mapStateToProps, {selectCell})(Board);

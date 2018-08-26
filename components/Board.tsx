import R from 'ramda';
import React from 'react';
import {connect} from 'react-redux';

import {selectCell} from '../actions';
import {range} from '../util';

import Row from "./Row";
import {ActionCreator} from "redux";

class Board extends React.Component {
    public props!: { board: string, width: number, height: number, selectCell: ActionCreator<number> };

    render() {
        const {height} = this.props;
        return (<table>
            <tbody>
            {R.map((i) => <Row {...this.props} key={i} row={i}/>, range(height))}
            </tbody>
        </table>);
    }
}

const mapStateToProps = ({board}: { board: string }) => ({board});
export default connect(mapStateToProps, {selectCell})(Board);

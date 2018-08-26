import R from 'ramda';
import React from 'react';
import {connect} from 'react-redux';

import {selectCell} from '../actions';
import {range} from '../util';

import Row from "./Row";

class Board extends React.Component {
    public props: { width: number, height: number };

    constructor(props: { width: number, height: number }) {
        super(props);
        console.log('Board', props);
    }

    render() {
        const {width, height} = this.props;
        return (<table>
            <tbody>
            {R.map((i) => <Row key={i} row={i} width={width} height={height}/>, range(height))}
            </tbody>
        </table>);
    }
}

const mapStateToProps = ({board}: { board: string }) => ({board});
export default connect(mapStateToProps, {selectCell})(Board);

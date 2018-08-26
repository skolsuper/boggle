import React from 'react';
import {connect} from 'react-redux';

import {selectCell} from '../actions';
import Board from './Board';
import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants';
import Selection from './Selection';

function App(props: any) {
    return (
        <div>
            <Board {...props} width={BOARD_WIDTH} height={BOARD_HEIGHT}/>
            <Selection {...props}/>
        </div>
    );
}

const mapStateToProps = ({availableMoves, board}: { availableMoves: number[], board: string }) => ({availableMoves, board});
export default connect(mapStateToProps, {selectCell})(App);

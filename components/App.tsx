import React from 'react';
import {connect} from 'react-redux';

import {selectCell, submitWord} from '../actions';
import Board from './Board';
import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants';
import Selection from './Selection';
import {IBoggleState} from '../declarations';

function App(props: any) {
    return (
        <div>
            <Board {...props} width={BOARD_WIDTH} height={BOARD_HEIGHT}/>
            <Selection {...props}/>
        </div>
    );
}

const mapStateToProps = ({availableMoves, currentPath, board}: IBoggleState) => ({availableMoves, currentPath, board});
export default connect(mapStateToProps, {selectCell, submitWord})(App);

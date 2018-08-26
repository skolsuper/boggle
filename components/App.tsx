import React from 'react';
import {connect} from 'react-redux';

import {selectCell, submitWord} from '../actions';
import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants';
import {IBoggleState} from '../declarations';

import Board from './Board';
import Selection from './Selection';
import WordList from './WordList';

function App(props: any) {
    return (
        <div>
            <Board {...props} width={BOARD_WIDTH} height={BOARD_HEIGHT}/>
            <Selection {...props}/>
            <WordList words={props.words}/>
        </div>
    );
}

const mapStateToProps = ({availableMoves, currentPath, board, words}: IBoggleState) => ({availableMoves, currentPath, board, words});
export default connect(mapStateToProps, {selectCell, submitWord})(App);

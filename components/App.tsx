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
        <div className="container">
            <h1>Play Some Boggle eh?</h1>
            <div className="row">
                <div className="col board-container">
                    <Board {...props} width={BOARD_WIDTH} height={BOARD_HEIGHT}/>
                </div>
                <div className="col">
                    <Selection {...props}/>
                    <WordList title="Your words" words={props.words}/>
                    <WordList title="All words" words={props.solution}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({availableMoves, currentPath, board, solution, words}: IBoggleState) => ({availableMoves, board, currentPath, solution, words});
export default connect(mapStateToProps, {selectCell, submitWord})(App);

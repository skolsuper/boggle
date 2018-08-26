import React from 'react';
import {connect} from 'react-redux';

import {selectCell, solvePuzzle, submitWord} from '../actions';
import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants';
import {IBoggleState} from '../declarations';

import Board from './Board';
import Selection from './Selection';
import WordList from './WordList';
import Countdown from "./Countdown";

function App(props: any) {
    return (
        <div className="container">
            <h1 className="display-1 text-center">Play Chaoggle</h1>
            <div className="row">
                <div className="col board-container">
                    <Board {...props} width={BOARD_WIDTH} height={BOARD_HEIGHT}/>
                    <Selection {...props}/>
                </div>
                <div className="col">
                    <Countdown timeRemaining={props.timeRemaining}/>
                    <button className="btn btn-success btn-lg btn-block" onClick={props.solvePuzzle}>Solve</button>
                    <WordList title="Found" words={props.words}/>
                    <WordList title="All words" words={props.solution}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({availableMoves, currentPath, board, solution, timeRemaining, words}: IBoggleState) => ({availableMoves, board, currentPath, solution, timeRemaining, words});
export default connect(mapStateToProps, {selectCell, solvePuzzle, submitWord})(App);

import R from 'ramda';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {SELECT_CELL, SET_BOARD, setBoard, SOLVE_PUZZLE, SUBMIT_WORD, TICK, tick} from './actions';
import App from './components/App';
import {BOARD_HEIGHT, BOARD_WIDTH, GAME_TIME_MS} from './constants';
import {IBoggleState} from './declarations';
import {getAvailableMoves, getWords, range, solve} from './util';

/* tslint:disable-next-line:no-var-requires */
const dictionary: { words: string[] } = require('./files/dictionary.json');

/**
 * A map of sets of words, keyed by the length of the words in the set
 * @example {
 *   3: cat,dog,foo
 *   4: bask,card,snap
 *   ...
 * }
 */
const wordsByLength = R.groupBy(word => word.length.toString(), dictionary.words);

const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

store.dispatch(setBoard('TAP*EAKSOBRSS*XD'));

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'),
);

const countdown = setInterval(() => store.dispatch(tick(1000)), 1000);

function reducer(
    state: IBoggleState = {
        availableMoves: range(BOARD_WIDTH * BOARD_HEIGHT),
        board: '****************',
        currentPath: [],
        gameOver: false,
        solution: [],
        timeRemaining: GAME_TIME_MS,
        words: [],
    },
    action: any): IBoggleState {
    switch (action.type) {
        case SELECT_CELL:
            if (state.gameOver) {
                return state;
            }
            if (R.contains(action.index, state.currentPath)) {
                return state;
            }
            if (!R.contains(action.index, state.availableMoves)) {
                return state;
            }
            const currentPath = [...state.currentPath, action.index];
            const availableMoves = getAvailableMoves(currentPath);
            return Object.assign({}, state, { availableMoves, currentPath });
        case SET_BOARD:
            return Object.assign({}, state, {
                board: action.board,
                timeRemaining: GAME_TIME_MS,
                words: [],
            });
        case SOLVE_PUZZLE:
            clearInterval(countdown);
            return Object.assign({}, state, {
                availableMoves: [],
                gameOver: true,
                solution: solve(dictionary.words, state.board),
            });
        case SUBMIT_WORD:
            const matchingWords = getWords(wordsByLength[action.word.length], action.word);
            return Object.assign({}, state, {
                availableMoves: range(BOARD_WIDTH * BOARD_HEIGHT),
                currentPath: [],
                words: R.uniq([...state.words, ...matchingWords]),
            });
        case TICK:
            const timeRemaining = state.timeRemaining - action.amount;
            if (timeRemaining <= 0) {
                clearInterval(countdown);
                return Object.assign({}, state, {
                    availableMoves: [],
                    gameOver: true,
                    solution: solve(dictionary.words, state.board),
                    timeRemaining,
                });
            }
            return Object.assign({}, state, { timeRemaining });
        default:
            return state;
    }
}

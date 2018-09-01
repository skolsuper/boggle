import R from 'ramda';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {ADD_WORDS, SELECT_CELL, SET_BOARD, SET_SOLUTION, SOLVE_PUZZLE, SUBMIT_WORD, TICK, tick} from './actions';
import {BoggleApi} from './api';
import App from './components/App';
import {GAME_TIME_MS} from '../constants';
import {IBoggleState} from './declarations';
import {getAvailableMoves} from '../util';

const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

const api = new BoggleApi('/api', store);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'),
);

let countdown: NodeJS.Timer;
api.init()
    .then(() => api.startGame())
    .then(() => countdown = setInterval(() => store.dispatch(tick(1000)), 1000))
    .catch((err) => console.error('Failed to start game', err));

function reducer(
    state: IBoggleState = {
        availableMoves: getAvailableMoves([]),
        board: '****************',
        currentPath: [],
        gameOver: true,
        solution: [],
        timeRemaining: GAME_TIME_MS,
        words: [],
    },
    action: any): IBoggleState {
    switch (action.type) {
        case ADD_WORDS:
            return Object.assign({}, state, {
                words: R.concat(state.words, action.words),
            });
        case SELECT_CELL:
            if (state.gameOver ||
                R.contains(action.index, state.currentPath) ||
                !R.contains(action.index, state.availableMoves)) {
                return state;
            }
            const currentPath = [...state.currentPath, action.index];
            const availableMoves = getAvailableMoves(currentPath);
            return Object.assign({}, state, { availableMoves, currentPath });
        case SET_BOARD:
            return Object.assign({}, state, {
                board: action.board,
                gameOver: false,
                timeRemaining: GAME_TIME_MS,
                words: [],
            });
        case SET_SOLUTION:
            return Object.assign({}, state, {
                solution: action.words,
            });
        case SOLVE_PUZZLE:
            clearInterval(countdown);
            api.getSolution()
                .catch((err) => console.error('Unable to solve puzzle', err));
            return Object.assign({}, state, {
                availableMoves: [],
                gameOver: true,
            });
        case SUBMIT_WORD:
            api.validateWord(state.currentPath)
                .catch((err) => console.error('Unable to validate word', err));
            return Object.assign({}, state, {
                availableMoves: getAvailableMoves([]),
                currentPath: [],
            });
        case TICK:
            const timeRemaining = state.timeRemaining - action.amount;
            if (timeRemaining <= 0) {
                clearInterval(countdown);
                api.getSolution()
                    .catch((err) => console.error('Unable to solve puzzle', err));
                return Object.assign({}, state, {
                    availableMoves: [],
                    gameOver: true,
                    timeRemaining,
                });
            }
            return Object.assign({}, state, { timeRemaining });
        default:
            return state;
    }
}

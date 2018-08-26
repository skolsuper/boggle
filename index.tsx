import R from 'ramda';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {SELECT_CELL, SET_BOARD, setBoard, SUBMIT_WORD} from './actions';
import App from './components/App';
import {BOARD_HEIGHT, BOARD_WIDTH} from './constants';
import {IBoggleState} from './declarations';
import {getAdjacent, getWords, range} from './util';

/* tslint:disable-next-line:no-var-requires */
const dictionary = require('./files/dictionary.json');

const words: Set<string> = new Set(dictionary.words);

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

function reducer(
    state: IBoggleState = {
        availableMoves: range(BOARD_WIDTH * BOARD_HEIGHT),
        board: '****************',
        currentPath: [],
        words: [],
    },
    action: any): IBoggleState {
    switch (action.type) {
        case SELECT_CELL:
            if (R.contains(action.index, state.currentPath)) {
                return state;
            }
            if (!R.contains(action.index, state.availableMoves)) {
                return state;
            }
            const currentPath = [...state.currentPath, action.index];
            return Object.assign({}, state, {
                availableMoves: R.difference(getAdjacent(action.index), currentPath),
                currentPath,
            });
        case SET_BOARD:
            return Object.assign({}, state, {
                board: action.board,
                words: [],
            });
        case SUBMIT_WORD:
            const matchingWords = getWords(words, action.word);
            return Object.assign({}, state, {
                availableMoves: range(BOARD_WIDTH * BOARD_HEIGHT),
                currentPath: [],
                words: R.uniq([...state.words, ...matchingWords]),
            });
        default:
            return state;
    }
}

import R from 'ramda';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {SELECT_CELL, SET_BOARD, setBoard} from './actions';
import Board from './components/Board';
import Selection from './components/Selection';
import {range} from './util';

const BOARD_HEIGHT = 4;
const BOARD_WIDTH = 4;

const getCol = (index: number) => Math.floor(index / BOARD_HEIGHT);
const getRow = (index: number) => R.modulo(index, BOARD_WIDTH);

/**
 * A map of the valid moves from each node.  Basically a graph.
 * @example {
 *  0: [1, 4, 5]
 *  1: [0, 2, 4, 5, 6]
 *  ...
 * }
 */
const adjacencyMap: { [key: number]: number[] } = range(BOARD_WIDTH * BOARD_HEIGHT)
    .reduce((acc: { [key: number]: number[] }, i) => {
        acc[i] = range(BOARD_WIDTH * BOARD_HEIGHT).filter((j) => {
            const distSq = Math.pow((getRow(i) - getRow(j)), 2)
                + Math.pow((getCol(i) - getCol(j)), 2);
            return distSq > 0 && distSq <= 2;
        });
        return acc;
    }, {});

const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

store.dispatch(setBoard('TAP*EAKSOBRSS*XD'));

render(
    (<div>
        <Provider store={store}>
            <Board width={BOARD_WIDTH} height={BOARD_HEIGHT}/>
        </Provider>
        <input
            onChange={(e) => store.dispatch(setBoard(e.target.value))}
            type="text"
            value={store.getState().board}
        />
        <Provider store={store}>
            <Selection/>
        </Provider>
    </div>),
    document.getElementById('root'),
);

function reducer(
    state: IBoggleState = {
        availableMoves: range(BOARD_WIDTH * BOARD_HEIGHT),
        board: '****************',
        currentPath: [],
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
            return Object.assign({}, state, {
                availableMoves: adjacencyMap[action.index],
                currentPath: [...state.currentPath, action.index],
            });
        case SET_BOARD:
            return Object.assign({}, state, {
                board: action.board,
            });
        default:
            return state;
    }
}

interface IBoggleState {
    board: string;
    currentPath: number[];
    availableMoves: number[];
}

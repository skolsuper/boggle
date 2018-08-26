import R from 'ramda';
import React from 'react';
import {render} from 'react-dom'
import {connect, Provider} from "react-redux";
import {createStore} from 'redux';

import {SELECT_CELL, selectCell, SET_BOARD, setBoard,} from './actions';

const BOARD_HEIGHT = 4;
const BOARD_WIDTH = 4;

const range: (to: number) => number[] = R.range(0);

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
const adjacencyMap = range(BOARD_WIDTH * BOARD_HEIGHT)
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

class Board extends React.Component {
    public props: { width: number, height: number };

    constructor(props: { width: number, height: number }) {
        super(props);
        console.log('Board', props);
    }

    render() {
        const { width, height } = this.props;
        return (<table>
            <tbody>
            {R.map((i) => <Row key={i} row={i} width={width} height={height}/>, range(height))}
            </tbody>
        </table>);
    }
}
const mapStateToProps = ({ board }: { board: string }) => ({ board });
const WrappedBoard = connect(mapStateToProps, { selectCell })(Board);

class SelectedLetters extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    render() {
        const { board, currentPath } = store.getState();
        return (<div>
            {currentPath.map((i) => getLetterFromBoard(board, i)).join()}
        </div>)
    }
}

render(
    (<div>
        <Provider store={store}>
            <WrappedBoard width={BOARD_WIDTH} height={BOARD_HEIGHT}/>
        </Provider>
        <input
            onChange={(e) => store.dispatch(setBoard(e.target.value))}
            type="text"
            value={store.getState().board}
        />
        <SelectedLetters/>
    </div>),
    document.getElementById('root'),
);

function reducer(state: IBoggleState = {
    board: '****************',
    currentPath: [],
    availableMoves: [],
}, action: any): IBoggleState {
    switch (action.type) {
        case SELECT_CELL:
            return Object.assign({}, state, {
                currentPath: [...state.currentPath, getLetterFromBoard(state.board, action.index)],
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

function Row({ row, width, height }: { row: number, width: number, height: number }) {
    return (<tr>
        { R.map((col) => <Cell key={col} index={row * height + col} />, R.range(0, width))}
    </tr>);
}

function Cell({ index }: { index: number }) {
    return (
        <td onClick={() => store.dispatch(selectCell(index))}>
        {getLetterFromBoard(store.getState().board, index)}
        </td>
    );
}

function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}

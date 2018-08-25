import R from 'ramda';
import React from 'react';
import {render} from 'react-dom'
import {createStore} from 'redux';

const ACTIONS = {
    SELECT_CELL: 'SELECT_CELL',
    SET_BOARD: 'SET_BOARD',
};

const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

store.dispatch(setBoard('TAP*EAKSOBRSS*XD'));

render(
    (<div>
        <input
            onChange={(e) => store.dispatch(setBoard(e.target.value))}
            type="text"
            value={store.getState().board}
        />
        <Board width={4} height={4}/>
        <div>{store.getState().selected.join()}</div>
    </div>),
    document.getElementById('root')
);

function reducer(state: IBoggleState = {
    board: '****************',
    selected: [],
}, action: any): IBoggleState {
    switch (action.type) {
        case ACTIONS.SELECT_CELL:
            return Object.assign({}, state, {
                selected: [...state.selected, getLetterFromBoard(state.board, action.index)],
            };
        case ACTIONS.SET_BOARD:
            return Object.assign({}, state, {
                board: action.board,
            };
        default:
            return state;
    }
}

interface IBoggleState {
    board: string;
    selected: string[];
}

function Board({ width, height }: { width: number, height: number }) {
    return (<table>
        <tbody>
        { R.map((i) => <Row key={i} row={i} width={width} height={height} />, R.range(0, height))}
        </tbody>
    </table>);
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

function setBoard(board: string) {
    return {
        board,
        type: ACTIONS.SET_BOARD,
    }
}

function selectCell(index: number) {
    return {
        index,
        type: ACTIONS.SELECT_CELL,
    };
}

function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}

import R from 'ramda';
import React from 'react';
import { render } from 'react-dom'
import { Action, createStore } from 'redux';
import { Provider } from 'react-redux';

class BoggleState {
    private board?: string;
}

const store = createStore(reducer);

function reducer(state: BoggleState = {}, action?: Action): object {
    return state;
}

function Board({ width, height }: { width: number, height: number }) {
    return (<table>
        { R.map((i) => <Row row={i} width={width} height={height} />, R.range(0, height))}
    </table>);
}

function Row({ row, width, height }: { row: number, width: number, height: number }) {
    return (<tr>
        { R.map((col) => <Cell index={row * height + col} />, R.range(0, width))}
    </tr>);
}

function Cell({ index }: { index: number }) {
    return <td>{index}</td>;
}

render(
    <Provider store={store}>
        <Board width={4} height={4}/>
        </Provider>,
    document.getElementById('root')
);

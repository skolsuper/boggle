import R from 'ramda';
import React from 'react';
import {ActionCreator} from 'redux';

import { range } from '../../util';
import Cell from './Cell';

export default function Row({availableMoves, board, row, width, height, selectCell}: { availableMoves: number[], board: string, row: number, width: number, height: number, selectCell: ActionCreator<number> }) {
    const childProps = { availableMoves, board, selectCell };
    return (<tr>
        {R.map((col) => <Cell {...childProps} key={col} index={row * height + col}/>, range(width))}
    </tr>);
}

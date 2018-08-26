import R from 'ramda';
import React from 'react';

import { range } from '../util';
import Cell from './Cell';
import {ActionCreator} from "redux";

export default function Row({board, row, width, height, selectCell}: { board: string, row: number, width: number, height: number, selectCell: ActionCreator<number> }) {
    return (<tr>
        {R.map((col) => <Cell board={board} key={col} index={row * height + col} selectCell={selectCell}/>, range(width))}
    </tr>);
}

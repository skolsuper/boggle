import R from 'ramda';
import React from 'react';

import { range } from '../util';
import Cell from './Cell';
import {ActionCreator} from "redux";

export default function Row({board, row, width, height, selectCell}: { board: string, row: number, width: number, height: number, selectCell: ActionCreator<number> }) {
    const childProps = { board, selectCell };
    return (<tr>
        {R.map((col) => <Cell {...childProps} key={col} index={row * height + col}/>, range(width))}
    </tr>);
}

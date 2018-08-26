import R from 'ramda';
import React from 'react';

import { range } from '../util';
import Cell from './Cell';

export default function Row({row, width, height}: { row: number, width: number, height: number }) {
    return (<tr>
        {R.map((col) => <Cell key={col} index={row * height + col}/>, range(width))}
    </tr>);
}

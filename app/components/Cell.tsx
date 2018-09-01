import R from 'ramda';
import React from 'react';
import {ActionCreator} from 'redux';

import {getLetterFromBoard} from '../../util';

export default function Cell({ availableMoves, board, index, selectCell }: { availableMoves: number[], board: string, index: number, selectCell: ActionCreator<number> }) {
    const available = R.contains(index, availableMoves);
    return (
        <td className="boggle-cell" data-available={available} onClick={() => selectCell(index)}>
            {getLetterFromBoard(board, index)}
        </td>
    );
}

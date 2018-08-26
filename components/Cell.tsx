import React from 'react';
import {ActionCreator} from 'redux';

import {getLetterFromBoard} from '../util';

export default function Cell({ board, index, selectCell }: { board: string, index: number, selectCell: ActionCreator<number> }) {
    return (
        <td onClick={() => selectCell(index)}>
            {getLetterFromBoard(board, index)}
        </td>
    );
}

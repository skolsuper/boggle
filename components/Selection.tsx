import React from 'react';
import {ActionCreator} from 'redux';

import {pathToString} from '../util';

export default function Selection(props: {board: string, currentPath: number[], submitWord: ActionCreator<string>}) {
    const {board, currentPath, submitWord} = props;
    const stagedWord = pathToString(board, currentPath);
    return (
        <form onSubmit={(e) => { submitWord(stagedWord); e.preventDefault(); }}>
            <input type="text" value={stagedWord} />
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
}

import React from 'react';
import {ActionCreator} from 'redux';

import {getLetterFromBoard} from '../util';

export default class Selection extends React.Component {
    public readonly props!: {
        board: string,
        currentPath: number[],
        submitWord: ActionCreator<string>,
    };

    public render() {
        const {board, currentPath, submitWord} = this.props;
        const stagedWord = currentPath.map((i) => getLetterFromBoard(board, i)).join('');
        return (
            <form onSubmit={(e) => {submitWord(stagedWord); e.preventDefault();}}>
                <input type="text" value={stagedWord} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

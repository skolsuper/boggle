import React from 'react';
import {Dispatch} from 'redux';

import {submitWord} from '../actions';
import {getLetterFromBoard} from '../util';

export default class Selection extends React.Component {
    public readonly props!: {
        board: string,
        currentPath: number[],
        dispatch: Dispatch,
    };

    public render() {
        const {board, currentPath, dispatch} = this.props;
        const stagedWord = currentPath.map((i) => getLetterFromBoard(board, i)).join('');
        return (
            <form onSubmit={(e) => {dispatch(submitWord(stagedWord)); e.preventDefault();}}>
                <input type="text" value={stagedWord} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

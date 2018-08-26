import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from 'redux';

import {submitWord} from '../actions';
import {getLetterFromBoard} from '../util';

class Selection extends React.Component {
    public readonly props!: {
        board: string,
        currentPath: number[],
        submitWord: ActionCreator<string>,
    };
    public state: {
        selected: boolean,
    };
    constructor(props: {}) {
        super(props);
        this.state = {
            selected: false,
        };
    }

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

const mapStateToProps = ({board, currentPath}: { board: string, currentPath: number[] }) => ({board, currentPath});
export default connect(mapStateToProps, {submitWord})(Selection);

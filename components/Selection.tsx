import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {submitWord} from '../actions';
import {getLetterFromBoard} from '../util';

class Selection extends React.Component {
    public readonly props!: {
        board: string,
        currentPath: number[],
        dispatch: Dispatch,
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

const mapStateToProps = ({board, currentPath}: { board: string, currentPath: number[] }) => ({board, currentPath});
export default connect(mapStateToProps)(Selection);

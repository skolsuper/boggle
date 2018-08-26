import React from 'react';
import {connect} from 'react-redux';
import {getLetterFromBoard} from '../util';

class Selection extends React.Component {
    public readonly props!: {
        board: string,
        currentPath: number[],
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
        const {board, currentPath} = this.props;
        return (<div>
            {currentPath.map((i) => getLetterFromBoard(board, i)).join('')}
        </div>);
    }
}

const mapStateToProps = ({board, currentPath}: { board: string, currentPath: number[] }) => ({board, currentPath});
export default connect(mapStateToProps)(Selection);

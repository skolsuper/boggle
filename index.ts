import { Action, createStore } from 'redux';

class BoggleState {
    private board?: string;
}

const store = createStore(reducer);

export { store };

function reducer(state: BoggleState = {}, action?: Action): object {
    return state;
}

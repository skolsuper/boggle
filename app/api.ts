import {Store} from 'redux';

import {setBoard} from './actions';

export class BoggleApi {

    /** A map of known actions to API urls */
    private links: {[key:string]: string} = {};

    constructor(private baseUrl: string, private store: Store) {}

    public async init() {
        const response = await fetch(this.baseUrl, { mode: 'cors' });
        const { links } = await response.json();
        this.links = links;
    }

    public async startGame() {
        if (!this.links['start-game']) {
            throw new Error('I don\'t know how to start a game yet');
        }
        const response = await fetch(this.links['start-game'], {
            method: 'POST',
            mode: 'cors',
        });
        const { board, links } = await response.json();
        this.links = { ...this.links, ...links };
        this.store.dispatch(setBoard(board));
    }
}

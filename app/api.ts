import R from 'ramda';
import {Store} from 'redux';

import {addWords, setBoard} from './actions';

export class BoggleApi {

    /** A map of known actions to API urls */
    private links: {[key:string]: string} = {};

    constructor(private baseUrl: string, private store: Store) {}

    public async init() {
        const response = await fetch(this.baseUrl, { mode: 'cors' });
        const { links } = await response.json();
        this.links = links;
    }

    public async startGame(): Promise<void> {
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

    public async validateWord(path: number[]): Promise<void> {
        if (!this.links['validate-word']) {
            throw new Error('I don\'t know how to validate a word yet');
        }
        const query = `path=${R.join(',', path)}`;
        const response = await fetch(`${this.links['validate-word']}?${query}`, {
            mode: 'cors',
        });
        const { words } = await response.json();
        this.store.dispatch(addWords(words));
    }

    public async getSolution(): Promise<void> {
        if (!this.links['get-solution']) {
            throw new Error('I don\'t know how to validate a word yet');
        }
    }
}

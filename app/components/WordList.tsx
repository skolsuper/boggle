import R from 'ramda';
import React from 'react';

export default function WordList({ title, words }: { title: string, words: string[] }) {
    return (
        <div>
            <h2>{(words.length) ? title : ''}</h2>
            <ul className="list-group">
                {R.map((word) => <li className="list-group-item" key={word}>{word}</li>, words)}
            </ul>
            <p>{(words.length) ? 'Count: ' + words.length : ''}</p>
        </div>
    );
}

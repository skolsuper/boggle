import R from 'ramda';
import React from 'react';

export default function WordList({ title, words }: { title: string, words: string[] }) {
    return (
        <div>
            <h2>{(words.length)? title : ''}</h2>
            <ul>
                {R.map((word) => <li key={word}>{word}</li>, words)}
            </ul>
        </div>
    );
}

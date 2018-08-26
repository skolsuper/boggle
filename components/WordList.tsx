import R from 'ramda';
import React from 'react';

export default function WordList({ words }: { words: string[] }) {
    return (<ul>
        {R.map((word) => <li key={word}>{word}</li>, words)}
    </ul>);
}

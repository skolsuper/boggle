import React from 'react';

export default function Countdown({ timeRemaining }: {timeRemaining: number}) {
    return (<div className="timer">Time remaining: {timeRemaining / 1000 }</div>);
}

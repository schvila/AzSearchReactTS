import React from 'react';
import './App.css';

function TestButton() {
    function handleClick(){
        const a = 5;
        alert('kliknuto');
    }
    return (
    <button className='App-button' onClick={handleClick}>
        Klikni
    </button>);
}
export default TestButton;
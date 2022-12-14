import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';



function Question(props) {
    let {qid, fetch, type, question} = props;
    const [answer1, setAnswer1] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit3 = event => {
        event.preventDefault();
        
    };
    return (
        <div>
        {(type === 1 && loading === false) ?
        <form onSubmit={handleSubmit3}>
            <div className="question-type-3">
                <label className="instruction">Read the given question in the gray box and provide answer in the text field.</label>
                <label className="questionLabel">Question:</label>
                <img className="questionImage" src={URL.createObjectURL( new Blob([Buffer.from(question, "base64").buffer], { type: 'image/jpg' }) )} alt="generated question"/>
                <label  className="answerTag" htmlFor="answer">Answer:</label>
                <input className="input" type="text" name="answer" placeholder="Sample answers: apple, 4, cake" value={answer1} onChange={e => setAnswer1(e.target.value)}/>
                <div className="buttonParent">``
                    <button className="nextButton" type="submit">NEXT</button>
                </div>
            </div>
        </form>
        : ''}
        </div>
    );
}
 
export default Question;
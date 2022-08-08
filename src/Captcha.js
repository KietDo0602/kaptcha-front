import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import Question from './Question';

const Captcha = (props) => {
    const [pageLoad, setPageLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);
    const [question, setQuestion] = useState({
        'type': 0,
        'qid': '',
        'image': null,
        'image_list': [],
        'word_list': [],
        'video': null,
        'question': null
    });

    async function fetchToken() {
        let data = JSON.stringify({
            "ip": "56.225.236.44",
            "no_questions": 3,
            "question_type": [ 1, 1, 1 ]
        });
          
        let config = {
            method: 'post',
            url: 'http://localhost:5001/api/answer/add',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
          
        axios(config)
        .then(function (response) {
            console.log(response.data.session);
            if (response.data.session !== "existed") {
                window.localStorage.clear();
                let session = response.data.session_id;
                window.localStorage.setItem('session-token', session);
                console.log("session: " + window.localStorage.getItem('session-token'));
                setPageLoad(true);
                setError(false);
                setLoading(false);
            } else {
                setPageLoad(true);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    async function fetchQuestion() {
        console.log("fetch")
        setLoading(true);
        let token = window.localStorage.getItem('session-token');
        let config = {
            method: 'get',
            url: 'http://localhost:5001/api/answer/get',
            headers: { 
              'session-token': token
            }
        };
        axios(config)
        .then(function (res) {
            const data = res.data;
            if (res.data.verified) {
                setOpen(false);
                setLoading(false);
                setVerified(true);
                return;
            }
            console.log(data);
            const type = data.question_type;
            let obj = {
                'type': type,
                'qid': data.qid,
                'image': (type === 4 ? data.image : null),
                'image_list': (type === 3 ? data.image_list : null),
                'video': (type === 5 ? data.video : null),
                'question': ((type === 1 || type === 4 || type === 5) ? data.question : null),
            };
            console.log(obj);
            setQuestion(obj);
            setLoading(false);
            setOpen(true);
        })
        .catch(function (error) {
            console.log(error);
            setError(true);
        })
    }
    const [answer, setAnswer] = useState('');
    const handleSubmitType1 = async ( event ) => {
        event.preventDefault();
        console.log(answer);
        var data = JSON.stringify({
            "type": 1,
            "qid": question.qid,
            "answer": answer
        });
        console.log(data);
          
        var config = {
            method: 'post',
            url: 'http://localhost:5001/api/answer/post',
            headers: { 
              'session-token': window.localStorage.getItem('session-token'), 
              'Content-Type': 'application/json'
            },
            data : data
        };
          
        axios(config)
        .then(function (response) {
            if (response) {
                setAnswer('');
                return response;
            }
        })
        .then(response => {
            if (response) {
                fetch();
            }
        })
    };
    useEffect(() => {
        fetchToken();
    }, []);
    return (
        <>
            { pageLoad ? <div>
                <div className="captcha-outer">
                    <p className="title">Kaptcha</p>
                    <span className="info-icon">?</span>
                    <hr className="line"/>
                    <div className="captcha-inner" onClick={() => fetchQuestion()}>
                        { (verified) ? <div className="center"><div class="check"></div></div> : null }
                        { (loading && verified === false) ? <div className="loading"></div> : null }
                    </div>
                    <p className="verify" onClick={() => fetchQuestion()}>VERIFY</p>
                    { (error) ? <div className="error" onClick={async () => {setError(false); setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null}); await fetchToken(); fetchQuestion();}}>Error. Try Again</div> : null }
                </div>
                { open ? 
                    <div className="c-content">
                        <div className="modal-content">
                            <span className="close" onClick={() => {setOpen(false); setQuestion({...question, type: 0, image: null, image_list: [], word_list: [], video: null, question: null})}}>&times;</span>
                            {/* <Question question={question.question} qid={question.qid} type={question.type} fetch={fetchQuestion}/> */}
                            <div>
                                {(question.type === 1) ?
                                <form onSubmit={handleSubmitType1}>
                                    <div className="question-type-3">
                                        <label className="instruction">Read the given question in the gray box and provide answer in the text field.</label>
                                        <label className="questionLabel">Question:</label>
                                        <img className="questionImage" src={URL.createObjectURL( new Blob([Buffer.from(question.question, "base64").buffer], { type: 'image/jpg' }) )} alt="generated question"/>
                                        <label  className="answerTag" htmlFor="answer">Answer:</label>
                                        <input className="input" type="text" name="answer" placeholder="Sample answers: apple, 4, cake" value={answer} onChange={e => setAnswer(e.target.value)}/>
                                        <div className="buttonParent">``
                                            <button className="nextButton" type="submit">NEXT</button>
                                        </div>
                                    </div>
                                </form>
                                : ''}
                            </div>
                        </div>
                    </div>
                : null }
            </div> : null }
        </>
    );
}
 
export default Captcha;
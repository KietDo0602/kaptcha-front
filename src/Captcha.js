import './App.css';
import React, {useState, useEffect} from 'react';

const Captcha = () => {
    const [select, setSelect] = useState(false);
    return ( <div className="captcha">
        <div className="checkBox" onClick={()=> {
            setSelect(!select);
        }}>
           {select ? <div class="spinning-loader"></div> : null}
        </div>
        <h1 className="verify">Verify</h1>
        <div className="captchaCanvas">
            
        </div>
    </div> );
}
 
export default Captcha;
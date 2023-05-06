import Captcha from './Captcha';
import React from 'react';


function App() {
  return (
    <div className="App">
      <h1 className="kaptcha-title">Kaptcha</h1>
      <h2 className="kaptcha-author">Made by <a href="https://github.com/kietdo0602">Kiet</a></h2>
      <p className="kaptcha-desc">Different take on traditional Captchas, utilizing new and different techniques.</p>
      <p className="kaptcha-desc">React, Node.js, Express, Mongoose, Heroku</p>
      <b><p className="kaptcha-desc">Click on the circle to start authenticating!</p></b>
      {/* no_questions: 1-5 */}
      {/* question_types: int[] arr, 1 <= len <= 5 */}
      <Captcha 
        no_questions={3} 
        question_types={[2, 1, 4]} 
      />
    </div>
  );
}

export default App;

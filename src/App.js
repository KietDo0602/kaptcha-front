import Captcha from './Captcha';
import React, {useState, useEffect, useRef} from 'react';
import {imageData} from './assets/Data'
import So from './so.txt';
// import fs from 'fs';
import { Buffer } from 'buffer';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      {/* no_questions: 1-5 */}
      {/* question_types: int[] arr, 1 <= len <= 5 */}
      {/* key: secret string that shares with the backend */}
      <Captcha 
        no_questions={4} 
        question_types={[1, 4, 1, 4]} 
        key="3c9HZjyy6YfxSWsYzEj2UFgVBvbFbJyzNSd4mtsew"
      />
    </div>
  );
}

export default App;

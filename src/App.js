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
      <Captcha/>
    </div>
  );
}

export default App;

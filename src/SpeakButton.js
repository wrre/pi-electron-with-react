import React, { Component } from 'react';
import talk from './api';
import config from './ignore/config';
import BingSpeech from './lib/BingSpeech';
import './SpeakButton.css';

const client = new BingSpeech.RecognitionClient(config.bingSppech.key);
const recording = false;
let result = '';

class SpeakButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgName: 'mic_black.svg',
      result: ''
    };
  }

  handleClick() {
    if (!recording) {
      recording = true;
      result = '';
      this.setState({imgName: 'mic_gray.svg', result});

      client.startMicAndContinuousRecognition();
      client.onFinalResponseReceived = function (response) {
        console.log('You said: ' + response);
        result = result+ response;
      }
    } else {
      recording = false;

      client.endMicAndContinuousRecognition();
      result = result.replace(/\./g, ' ');
      if (result !== '')
        talk(result);

      this.setState({imgName: 'mic_black.svg', result});
    }
  }

  render() {
    const img = require(`./image/${this.state.imgName}`);
    return (
      <div className="Speak">
        <img src={img} width="70" height="100" onClick={this.handleClick.bind(this)}/>
        <h2>{this.state.result}</h2>
      </div>
    );
  }
}

export default SpeakButton;

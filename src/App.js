import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Polarity from "./components/Polarity";

const style = {
  marginLeft: 12,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      polarity: undefined
    };
  };

  analyzeSentence() {
    const { img } = this.state;
    fetch('http://127.0.0.1:57744/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({sentence: 'This'}) 
    })
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  handleImage(e) {
    const blob = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      this.setState({ img: reader.result })
    }
  }

  render() {
    const { polarity, sentence, img } = this.state;
    const polarityComponent = polarity !== undefined ?
      <Polarity sentence={sentence} polarity={polarity}/> :
      null;

    return (
      <MuiThemeProvider>
        <div className="centerize">
          <Paper zDepth={1} className="content">
            <h2>Cats vs Dogs</h2>
            {img && <img src={img} alt="Red dot" />}
            <label>
              <input type="file" onChange={this.handleImage.bind(this)} />
            </label>
            <RaisedButton label="Send" style={style} onClick={this.analyzeSentence.bind(this)}/>
            {polarityComponent}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

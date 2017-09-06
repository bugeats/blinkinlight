import React from 'react';

const LIT_INTERVAL = 1000;

import Lamp from './lamp';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lit: false
        };

        setInterval(() => {
            this.setState({ lit: !this.state.lit });
        }, LIT_INTERVAL);
    }

    render() {
        return (
          <div className='app'>
            <h1>Blinkinlight Dev Harness</h1>
            <div className='lamp-container'>
              <Lamp lit={ this.state.lit }/>
            </div>
          </div>
        );
    }
}

export default App;

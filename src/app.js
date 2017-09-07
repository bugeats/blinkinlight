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
            <Lamp lit={ this.state.lit } color='red'/>
          </div>
        );
    }
}

export default App;

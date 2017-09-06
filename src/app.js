import React from 'react';

import Lamp from './lamp';

const App = () => {
    return (
      <div className='app'>
        <h1>Blinkinlight Dev Harness</h1>
        <div className='lamp-container'>
          <Lamp/>
        </div>
      </div>
    );
};

export default App;

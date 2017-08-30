import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components'
import { Provider } from 'rebass'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

ReactDOM.render(<Provider>
  <App />
</Provider>, document.getElementById('root'));

registerServiceWorker();

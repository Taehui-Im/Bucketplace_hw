import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Indexpage from './routes/Indexpage';
import Bookmarkpage from './routes/Bookmarkpage'
import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <div>
        <Header/>
        <Route exact path='/' component={Indexpage} />
        <Route path='/book-mark' component={Bookmarkpage} />
      </div>
    </Router>
  );
};

export default App;

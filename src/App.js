import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Map, fromJS } from 'immutable';

import Indexpage from './routes/Indexpage';
import Bookmarkpage from './routes/Bookmarkpage'
import Header from './components/Header'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bookmarkData: Map(),
        bookmarkIds: new Set()
    }
  }

  addBookmark = (data) => {
    this.setState({
      bookmarkData: this.state.bookmarkData.set(data.get('id'), data),
      bookmarkIds: this.state.bookmarkIds.add(data.get('id'))
    })
  }

  delBookmark = (id) => {
    var newSet = this.state.bookmarkIds;
    newSet.delete(id);
    this.setState({
      bookmarkData: this.state.bookmarkData.delete(id),
      bookmarkIds: newSet
    })
  }

  findId = (id) => {
    return this.state.bookmarkIds.has(id);
  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path='/' render={(props) => 
            <Indexpage {...props} findId={this.findId} addBookmark={this.addBookmark} delBookmark={this.delBookmark}/>} />
          <Route path='/book-mark' render={(props) => 
            <Bookmarkpage {...props} data={this.state.bookmarkData} findId={this.findId} addBookmark={this.addBookmark} delBookmark={this.delBookmark}/>} />
        </div>
      </Router>
    );
  }
};

export default App;

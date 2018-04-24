import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Map, fromJS } from 'immutable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    this.numOfToast = 0;
}

addBookmark = (data) => {
    if (this.numOfToast > 1) {
    toast.dismiss();
    }
    toast(<div>북마크에 추가되었습니다. <div className='undo' onClick={()=>{this.delBookmark(data)}}>실행 취소</div></div>, {
        bodyClassName: 'toastBody',
        onOpen: ()=>{this.numOfToast += 1},
        onClose: ()=>{this.numOfToast -= 1},
    });
    this.setState({
    bookmarkData: this.state.bookmarkData.set(data.get('id'), data),
    bookmarkIds: this.state.bookmarkIds.add(data.get('id'))
    })
}

delBookmark = (data) => {
    if (this.numOfToast < 2) {
    toast.dismiss();
    }
    toast(<div>북마크에서 삭제되었습니다. <div className='undo' onClick={()=>{this.addBookmark(data)}}>실행 취소</div></div>, {
        bodyClassName: 'toastBody',
        onOpen: ()=>{this.numOfToast += 1},
        onClose: ()=>{this.numOfToast -= 1},
    });
    var newSet = this.state.bookmarkIds;
    newSet.delete(data.get('id'));
    this.setState({
    bookmarkData: this.state.bookmarkData.delete(data.get('id')),
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
        <ToastContainer 
                    position='bottom-center'
                    autoClose={5000}
                    pauseOnHover
                    hideProgressBar={true}
                    closeButton={false}/>
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

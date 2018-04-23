/* global history */
/* global location */
/* eslint no-restricted-globals: ["off"] */

import React, { Component } from 'react';
import { Map, List, fromJS } from 'immutable';
import './Common.css'
import Modal from './Modal'

class All extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = (t) => {
        this.setState({
            modal: t
        })
    }

    backButtonHandler = () => {
        history.pushState(null, document.title, location.href); 
        this.toggle(false);
        window.removeEventListener('popstate', this.backButtonHandler);
    }

    render() {
        return (
            <div className='card'>
                <Modal show={this.state.modal} src={this.props.src} toggle={this.toggle} backButtonHandler={this.backButtonHandler}/>
                <img src={this.props.src} className='cardImg' 
                    onClick={()=>{
                        this.toggle(true)
                        history.pushState(null, document.title, location.href); 
                        window.addEventListener('popstate', this.backButtonHandler);
                    }}/>
                <p className='type'>{this.props.type}</p>
                <img src={this.props.marked ? 
                        'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/res/action-scrap-circle-b.svg' :
                        'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/res/action-scrap-circle-w.svg'} 
                    className='icon'
                    onClick={()=>{
                        if (this.props.marked) {
                            this.props.delBookmark();
                        }
                        else {
                            this.props.addBookmark();
                        }
                            
                    }}/>
            </div>
        )
    }
}

export default All;

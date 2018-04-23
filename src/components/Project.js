/* global history */
/* global location */
/* eslint no-restricted-globals: ["off"] */

import React, { Component } from 'react';
import { Map, List, fromJS } from 'immutable';
import './Common.css'
import Modal from './Modal'

class Project extends Component {
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
        const { data } = this.props;
        return (
            <div className='card-with-info'>
                <Modal show={this.state.modal} src={data.get('image_url')} toggle={this.toggle} backButtonHandler={this.backButtonHandler}/>
                <img src={data.get('image_url')} className='cardImg' 
                    onClick={()=>{
                        this.toggle(true)
                        history.pushState(null, document.title, location.href); 
                        window.addEventListener('popstate', this.backButtonHandler);
                    }}/>
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
                <ul className='info'>
                    <li className='brand'>온라인 집들이</li>
                    <p>{data.get('title')}</p>
                </ul>
            </div>
        )
    }
}

export default Project;

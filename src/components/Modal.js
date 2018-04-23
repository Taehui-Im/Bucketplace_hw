/* global history */
/* global location */
/* eslint no-restricted-globals: ["off"] */

import React, { Component } from 'react';
import './Common.css'

class Modal extends Component {

    render() {
        if (!this.props.show) {
            return null;
        }
        else {
            return (
                <div>
                <div className='modalBackground' 
                    onClick={()=>{
                        this.props.toggle(false);
                        window.removeEventListener('popstate', this.props.backButtonHandler);
                    }} />
                <img className='modal' src={this.props.src}/>
                </div>
            )
        }
        
    }
}

export default Modal;
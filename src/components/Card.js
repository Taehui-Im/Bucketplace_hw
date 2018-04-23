import React, { Component } from 'react';
import { Map, List, fromJS } from 'immutable';
import './Common.css'

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <img src={this.props.src} className='cardImg'/>
                <p className='type'>{this.props.type}</p>
                <img src='https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/res/action-scrap-circle-w.svg' className='icon'/>
            </div>
        )
    }
}

export default Card;

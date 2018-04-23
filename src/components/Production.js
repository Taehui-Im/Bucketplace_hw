/* global history */
/* global location */
/* eslint no-restricted-globals: ["off"] */

import React, { Component } from 'react';
import { Map, List, fromJS } from 'immutable';
import './Common.css'
import Modal from './Modal'

class Production extends Component {
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

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { data, marked } = this.props;

        const rate = Math.round((Number(data.get('cost')) - Number(data.get('selling_cost')))/Number(data.get('cost'))*100);
        return (
            <div className='card-with-info'>
                <Modal show={this.state.modal} src={data.get('image_url')} toggle={this.toggle} backButtonHandler={this.backButtonHandler}/>
                <img src={data.get('image_url')} className='cardImg' 
                    onClick={()=>{
                        this.toggle(true)
                        history.pushState(null, document.title, location.href); 
                        window.addEventListener('popstate', this.backButtonHandler);
                    }}/>
                <img src={marked ? 
                        'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/res/action-scrap-circle-b.svg' :
                        'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/res/action-scrap-circle-w.svg'} 
                    className='icon'
                    onClick={()=>{
                        if (marked) {
                            this.props.delBookmark();
                        }
                        else {
                            this.props.addBookmark();
                        }
                            
                    }}/>
                <ul className='info'>
                    <li className='brand'>{data.get('brand_name')}</li>
                    <li className='name'>{data.get('name')}</li>
                    <li className='selling_cost'>
                        <span className='rate'>{rate + '%  '}</span>
                        {this.numberWithCommas(data.get('selling_cost')) + '원  '}
                        <del className='cost'>{this.numberWithCommas(data.get('cost'))}</del>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Production;

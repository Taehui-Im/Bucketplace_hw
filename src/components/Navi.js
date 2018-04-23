import React, { Component } from 'react';
import './Common.css'
import * as api from '../lib/api';
import { Map, List, fromJS } from 'immutable';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card'

class Navi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'All',
            data: List(),
            hasMore: true
        }
    }

    types = {
        'All': '모두',
        'Card': '사진',
        'Production': '제품',
        'Project': '집들이',
        'Exhibition': '기획전'
    }

    chooseType = (type) => {
        this.setState({
            type: type
        })
    }

    getPage = (page) => {
        console.log(page)
        api.getPage(page).then((response) => {
            console.log(response.data.length)
            this.setState({
                data: this.state.data.concat(fromJS(response.data))
            })
            
            if (response.data.length == 0) {
                console.log('finish')
                this.setState({
                    hasMore: false
                })
            }
        });
    }

    componentDidMount() {
    }

    render() {
        const loader = <div className="loader">Loading ...</div>;

        var items = [];

        this.state.data.map((cell) => {
            if (this.state.type === 'All' || this.state.type === cell.get('type')) {
                items.push(
                    <Card src={cell.get('image_url')} type={this.types[cell.get('type')]} />
                );
            }
        })

        return (
            <div>
                <div className='header'>
                    {Object.keys(this.types).map(
                        type => (
                        <a type={type} 
                            className={this.state.type == type ? 'item active' : 'item'} 
                            onClick={()=>this.chooseType(type)}>
                            {this.types[type]}
                        </a>)
                    )}
                </div>
                <InfiniteScroll
                    className='container'
                    pageStart={0}
                    loadMore={this.getPage.bind(this)}
                    loader={loader}
                    hasMore={this.state.hasMore}>
                    {items}
                </InfiniteScroll>
            </div>
        );
    }
};

export default Navi;
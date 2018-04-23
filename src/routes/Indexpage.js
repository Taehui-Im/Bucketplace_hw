import React, { Component } from 'react';
import '../components/Common.css'
import * as api from '../lib/api';
import { List, fromJS } from 'immutable';
import InfiniteScroll from 'react-infinite-scroller';
import All from '../components/All'
import Card from '../components/Card'
import Production from '../components/Production'
import Project from '../components/Project'
import Exhibition from '../components/Exhibition'

class Indexpage extends Component {
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
        api.getPage(page).then((response) => {
            this.setState({
                data: this.state.data.concat(fromJS(response.data))
            })
            
            if (response.data.length == 0) {
                this.setState({
                    hasMore: false
                })
            }
        });
    }

    render() {
        const loader = <div className="loader">Loading ...</div>;
        const { type, data, hasMore } = this.state;
        const { findId, addBookmark, delBookmark } = this.props;

        var items = [];

        data.map((cell) => {
            if (type === 'All' || type === cell.get('type')) {
                if (type === 'All')
                    items.push(
                        <All 
                            src={cell.get('image_url')} 
                            type={this.types[cell.get('type')]} 
                            marked={findId(cell.get('id'))}
                            addBookmark={()=>{addBookmark(cell)}}
                            delBookmark={()=>{delBookmark(cell)}}/>
                    );
                else if (type === 'Card')
                    items.push(
                        <Card
                            src={cell.get('image_url')} 
                            marked={findId(cell.get('id'))}
                            addBookmark={()=>{addBookmark(cell)}}
                            delBookmark={()=>{delBookmark(cell)}}/>
                    );
                else if (type === 'Production')
                    items.push(
                        <Production
                            data={cell} 
                            marked={findId(cell.get('id'))}
                            addBookmark={()=>{addBookmark(cell)}}
                            delBookmark={()=>{delBookmark(cell)}}/>
                    );
                else if (type === 'Project')
                    items.push(
                        <Project
                            data={cell} 
                            marked={findId(cell.get('id'))}
                            addBookmark={()=>{addBookmark(cell)}}
                            delBookmark={()=>{delBookmark(cell)}}/>
                    );
                else
                    items.push(
                        <Exhibition
                            data={cell} 
                            marked={findId(cell.get('id'))}
                            addBookmark={()=>{addBookmark(cell)}}
                            delBookmark={()=>{delBookmark(cell)}}/>
                    );
            }
        })

        return (
            <div>
                <div className='navi'>
                    <div className='navi-item'>
                    {Object.keys(this.types).map(
                        t => (
                        <a type={t}
                            href='#top'
                            className={t == type ? 'item active' : 'item'} 
                            onClick={()=>this.chooseType(t)}>
                            {this.types[t]}
                        </a>)
                    )}
                    </div>
                </div>
                <InfiniteScroll
                    className='container'
                    pageStart={0}
                    loadMore={this.getPage.bind(this)}
                    loader={loader}
                    hasMore={hasMore}>
                    {items}
                </InfiniteScroll>
            </div>
        );
    }
};

export default Indexpage;
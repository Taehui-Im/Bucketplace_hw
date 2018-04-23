import React, { Component } from 'react';
import '../components/Common.css'
import { List, fromJS } from 'immutable';
import All from '../components/All'
import Card from '../components/Card'
import Production from '../components/Production'
import Project from '../components/Project'
import Exhibition from '../components/Exhibition'

class Bookmarkpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'All',
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

    render() {
        const { type } = this.state;
        const { findId, addBookmark, delBookmark, data } = this.props;

        var items = [];

        data.toList().map((cell) => {
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
                <div className='container'>
                    {items}
                </div>
            </div>
        );
    }
};

export default Bookmarkpage;
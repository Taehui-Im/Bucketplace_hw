import React, { Component } from 'react';
import '../components/Common.css'
import { List, fromJS } from 'immutable';
import Card from '../components/Card'

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
                items.push(
                    <Card 
                        src={cell.get('image_url')} 
                        type={this.types[cell.get('type')]} 
                        marked={findId(cell.get('id'))}
                        addBookmark={()=>{addBookmark(cell)}}
                        delBookmark={()=>{delBookmark(cell)}}/>
                );
            }
        })

        return (
            <div>
                <div className='navi'>
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
                <div className='container'>
                    {items}
                </div>
            </div>
        );
    }
};

export default Bookmarkpage;
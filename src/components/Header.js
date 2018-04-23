import React from 'react';
import { NavLink } from 'react-router-dom';
import './Common.css'

const Header = () => {
    return (
        <div className='header'>
            <NavLink exact to='/' className='item' activeClassName='active'>전체보기</NavLink>
            <NavLink to='/book-mark' className='item' activeClassName='active'>북마크</NavLink>
        </div>
    );
};

export default Header;
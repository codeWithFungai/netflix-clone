import React from 'react'
import './Nav.css';
function Nav() {
  return (
    <div className='nav'>
        <img className='nav__logo' src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
        <img className='nav__avatar' src={require('./avatar.jpg')} alt='avatar' />
    </div>
  )
}

export default Nav
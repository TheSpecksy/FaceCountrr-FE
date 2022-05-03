import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className='f3 link b dim dark-green pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='f3 link b w4 br4 ph3 ba b--dark-green bg-dark-green dim washed-yellow pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link b dim dark-green pa3 pointer'>Register</p>
        </nav>
      );
    }
}

export default Navigation;
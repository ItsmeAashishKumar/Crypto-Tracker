import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

function Header({back}) {
  return (
    <header className='header'>
    <div className='width'>
        {back && (
            <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 48" width="24">
                <path fill="currentColor" d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
            </svg>
        </Link>
        )}
        
        <h1>Coiner!</h1>
    </div>
</header>

  )
}

export default Header;

import { Link } from 'react-router'

function Nav() {
  return (
      <nav className='nav'>
          <div className='navContainer'>
              <Link to='/' >Home</Link>
              &nbsp; | &nbsp;
              <Link to='/forecast'>Forecast</Link>
          </div>
          <div>
              <Link to='/about'>About</Link>
          </div>
      </nav>
  )
}

export default Nav
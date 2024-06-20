import { useContext } from 'react'

import Container from 'react-bootstrap/Container'
import NavLink from 'react-bootstrap/NavLink'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

import { UserContext } from '../contexts/UserContext'

export default function Header() {

  const { user } = useContext (UserContext)

  return (
    <Navbar data-bs-theme='dark' className='main-heading' sticky='top'>
      <Container>
        <Navbar.Brand>Pokedex Capstone</Navbar.Brand>
        {
          !user.accessToken ?
            <>
              <NavLink as={Link} to={'/home'}>Home</NavLink>
              <NavLink as={Link} to={'/register'}>Register</NavLink>
              <NavLink as={Link} to={'/login'}>Login</NavLink>
              <NavLink as={Link} to={'/Pokedex'}>Pokedex</NavLink>
            </> :
            <>
            <NavLink as={Link} to={'/Pokedex'}>Pokedex</NavLink>   
            <NavLink as={Link} to={'/favorites'}>Favorites</NavLink>
            <NavLink as={Link} to={'/logout'}>Logout</NavLink>
            </>
        }
      </Container>
    </Navbar>
  )
}
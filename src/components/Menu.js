import React from 'react'
import {NavLink} from 'react-router-dom'

const Menu = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">

                    <div className="collapse navbar-collapse  justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink exact to="/" className="nav-link nav-item">Home</NavLink>
                            <NavLink to="/articles-list" className="nav-link nav-item" href="#">Articles List</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default Menu;

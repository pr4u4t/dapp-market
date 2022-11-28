import React, { Component } from 'react';

class Footer extends Component {
    
    render() {
        return (
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">© 2022 Company, Inc</p>
                
                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img width="64px" height="64px" src="../logo192.png"/>
                </a>
                
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <a href="/" className="nav-link px-2 text-muted">Home</a>
                    </li>
                </ul>
            </footer> 
        );
    }
}

export default Footer;

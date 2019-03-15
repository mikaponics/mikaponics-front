import React from 'react';
import { Link } from "react-router-dom";

export default () => {
    return (
        <nav class="navbar fixed-top navbar-light bg-light">
        <Link to="/" className="navbar-brand">Mikaponics</Link>
        </nav>
    )
}

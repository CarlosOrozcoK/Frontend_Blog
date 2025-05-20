import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/">
                    <span role="img" aria-label="Blog" className="me-2"></span>
                    Blog
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAlt"
                    aria-controls="navbarNavAlt"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

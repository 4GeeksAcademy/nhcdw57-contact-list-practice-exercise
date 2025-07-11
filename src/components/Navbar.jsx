import { Link } from "react-router-dom";


export const Navbar = () => {



	return (
		<nav className="navbar navbar-light bg-light mt-2 mb-4">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Contacts List</span>
				</Link>
				<div className="ml-auto">
					<Link to="/addContact">
						<button className="btn btn-primary">Add new Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
import { useContext, useEffect } from "react";
import { MyContext } from "../hooks/myContext";
import { Link } from "react-router-dom";


export const Home = () => {

	const { contacts, manageContacts } = useContext(MyContext);
	console.log(contacts);

	return (
		<div className="container">
			{
				contacts.map((element, index) => (
					<div className="card bg-success-subtle m-3" key={index} style={{ width: "100%" }}>
						<div className="card-body">
							<div className="row">
								<div className="col-2 text-center">
									<img className="img-fluid rounded-circle" src="https://m.media-amazon.com/images/I/61me-U2akgL._AC_SL1000_.jpg" style={{ width: "70%" }}></img>
								</div>
								<div className="col">
									<h4 className="card-title">{element.name}</h4>
									<h6 className="card-subtitle mb-2 text-body-secondary"><i className="bi bi-geo-alt-fill me-2"></i>{element.address}</h6>
									<p className="card-text mb-0"><i className="bi bi-telephone-fill me-2"></i>{element.phone}</p>
									<p className="card-text"><i className="bi bi-envelope-at-fill me-2"></i>{element.email}</p>
								</div>
								<div className="col-2">
									<div className="container d-flex justify-content-evenly">
										<Link to={`/editContact/${element.id}`} className="btn btn-warning me-2">
											<i className="bi bi-pencil-fill"></i>
										</Link>
										<button className="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteContact"><i className="bi bi-trash3-fill"></i></button>
										
										<div class="modal fade" id="deleteContact" tabindex="-1" aria-labelledby="deleteContactLabel" aria-hidden="true">
											<div class="modal-dialog">
												<div class="modal-content">
													<div class="modal-header">
														<h1 class="modal-title fs-5" id="deleteContactLabel">Are you sure?</h1>
														<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
													</div>
													<div class="modal-body">
														You are about to delete {element.name}. Proceed?
													</div>
													<div class="modal-footer d-flex justify-content-between">
														<button type="button" onClick={()=>{manageContacts("delete",null,element.id)}} data-bs-dismiss="modal" class="btn btn-danger">Confirm</button>
														<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>)
				)
			}
		</div>
	);
};

/* How every element in contacts should look like:

{
	"name": "Example Contact 1",
	"phone": "111-111-1111",
	"email": "1@1.com",
	"address": "1 1st st",
	"id": 113
}

*/
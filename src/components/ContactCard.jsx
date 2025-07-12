import { useContext } from "react"
import { MyContext } from "../hooks/myContext"
import { Link } from "react-router-dom";

export function ContactCard(props) {

    const { manageContacts } = useContext(MyContext);

    return (
        <div className="card bg-success-subtle m-3" style={{ width: "100%" }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-2 text-center">
                        <img className="img-fluid rounded-circle" src="https://m.media-amazon.com/images/I/61me-U2akgL._AC_SL1000_.jpg" style={{ width: "70%" }}></img>
                    </div>
                    <div className="col">
                        <h4 className="card-title">{props.content.name}</h4>
                        <h6 className="card-subtitle mb-2 text-body-secondary"><i className="bi bi-geo-alt-fill me-2"></i>{props.content.address}</h6>
                        <p className="card-text mb-0"><i className="bi bi-telephone-fill me-2"></i>{props.content.phone}</p>
                        <p className="card-text"><i className="bi bi-envelope-at-fill me-2"></i>{props.content.email}</p>
                    </div>
                    <div className="col-2">
                        <div className="container d-flex justify-content-evenly">
                            <Link to={`/editContact/${props.content.id}`} className="btn btn-warning me-2">
                                <i className="bi bi-pencil-fill"></i>
                            </Link>
                            <button className="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target={`#deleteContact${props.content.id}`}><i className="bi bi-trash3-fill"></i></button>

                            <div className="modal fade" id={`deleteContact${props.content.id}`} tabIndex="-1" aria-labelledby={`deleteContact${props.content.id}Label`} aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id={`deleteContact${props.content.id}Label`}>Are you sure?</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            You are about to delete {props.content.name}. Proceed?
                                        </div>
                                        <div className="modal-footer d-flex justify-content-between">
                                            <button type="button" onClick={() => { manageContacts("delete", null, props.content.id) }} data-bs-dismiss="modal" className="btn btn-danger">Confirm</button>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
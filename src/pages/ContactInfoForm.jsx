import { useContext, useEffect, useState } from "react";
import { MyContext } from "../hooks/myContext";
import { Link, useNavigate, useParams } from "react-router-dom";


export const ContactInfoForm = (props) => {

    const { contacts, manageContacts } = useContext(MyContext);
    const { theId } = useParams();
    const [formData, setFormData] = useState({
        "name": "",
        "phone": "",
        "email": "",
        "address": "",
        "id": -1
    });
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.formType === "edit") {
            console.log(contacts);
            let targetContact = contacts.find((element) => element.id === Number(theId));
            if (targetContact !== undefined) {
                setLoaded(true);
                setFormData(targetContact);
            }
        }else if(props.formType === "add"){
            setLoaded(true);
        }
    }, [contacts]);



    function submitContactData(event) {
        event.preventDefault();
        let body = { ...formData };
        delete body.id;
        if (props.formType === "add") {
            manageContacts("add", body);
        } else if (props.formType === "edit") {
            manageContacts("edit", body, formData.id);
        }
        navigate("/");
    }

    if (!loaded) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>)
    }

    return (
        <div className="card container mt-5">
            <h1 className="text-center my-5">{(props.formType === "add") ? "Add a new contact" : "Edit contact"}</h1>
            <form className="row d-flex justify-content-center">
                <div className="col-8">
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="FirstName LastName" onChange={(event) => {setFormData((oldData)=>{return{...oldData,"name":event.target.value}})}} value={formData.name} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={(event) => {setFormData((oldData)=>{return{...oldData,"email":event.target.value}})}} value={formData.email} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-control" id="phone" name="phone" placeholder="012-345-6789" onChange={(event) => {setFormData((oldData)=>{return{...oldData,"phone":event.target.value}})}} value={formData.phone} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" placeholder="00 Example St" onChange={(event) => {setFormData((oldData)=>{return{...oldData,"address":event.target.value}})}} value={formData.address} />
                    </div>
                    <span><button onClick={submitContactData} className="btn btn-primary mb-5">Save</button> <Link to={"/"} className="btn btn-secondary mb-5">Cancel</Link></span>
                </div>
            </form>

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
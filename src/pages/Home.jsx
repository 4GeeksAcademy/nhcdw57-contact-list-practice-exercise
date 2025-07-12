import { useContext, useEffect } from "react";
import { MyContext } from "../hooks/myContext";
import { ContactCard } from "../components/ContactCard";


export const Home = () => {

	const { contacts, manageContacts } = useContext(MyContext);
	console.log(contacts);

	return (
		<div className="container">
			{
				contacts.map((element, index) => (<ContactCard key={index} content={element}/>))
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
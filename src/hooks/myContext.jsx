// creating my own context for practice
// also not creating a global reducer function to get used to 


import { createContext, useEffect, useReducer, useState } from "react";

const baseAPIURL = "https://playground.4geeks.com/contact";
const userName = "Connor";
export const MyContext = createContext();

const validSimpleFetchActions = ["ReadUser", "CreateUser", "ReadContacts", "CreateContacts", "UpdateContact", "DeleteContact"];
const [readUserAction, createUserAction, readContactsAction, createContactAction, updateContactAction, deleteContactAction] = validSimpleFetchActions; // destructuring the validSimpleFetchActions to enable autofilling to prevent typos of user actions

function simpleFetch(action, bodyContent = null, contactID = null) {
    let header = {
        "Content-Type": "application/json",
    }
    if (action === readUserAction) {
        return fetch(`${baseAPIURL}/agendas/${userName}`)
    } else if (action === createUserAction) {
        return fetch(`${baseAPIURL}/agendas/${userName}`, { method: "POST" })
    } else if (action === readContactsAction) {
        return fetch(`${baseAPIURL}/agendas/${userName}/contacts`)
    } else if (action === createContactAction && bodyContent !== null) {
        return fetch(`${baseAPIURL}/agendas/${userName}/contacts`, { method: "POST", headers: header, body: JSON.stringify(bodyContent) })
    } else if (action === updateContactAction && bodyContent !== null && contactID !== null) {
        return fetch(`${baseAPIURL}/agendas/${userName}/contacts/${contactID}`, { method: "PUT", headers: header, body: JSON.stringify(bodyContent) })
    } else if (action === deleteContactAction && bodyContent === null && contactID !== null) {
        return fetch(`${baseAPIURL}/agendas/${userName}/contacts/${contactID}`, { method: "DELETE" })
    } else {
        return Promise.reject(new Error(`Invalid parameters in the simpleFetch function. Attempted action: ${action}. Extra Parameter values: bodyContent = ${bodyContent}, contactID = ${contactID}`))
    }
}

export function MyProvider({ children }) {

    const [contacts, setContacts] = useState([]);

    function manageContacts(action, contact = null, contactID = null){
        if(action === "add" && contact !== null){
            simpleFetch(createContactAction,contact)
            .catch((error)=>console.error(error))
            .finally(()=>{
                simpleFetch(readUserAction)
                .then((rawData)=>rawData.json())
                .then((data)=>setContacts(data.contacts));
            });
        }else if(action === "edit" && contact !== null && contactID !== null){
            simpleFetch(updateContactAction,contact,contactID)
            .catch((error)=>console.error(error))
            .finally(()=>{
                simpleFetch(readUserAction)
                .then((rawData)=>rawData.json())
                .then((data)=>setContacts(data.contacts));
            });
        }else if(action === "delete" && contact === null && contactID !== null){
            simpleFetch(deleteContactAction,null,contactID)
            .catch((error)=>console.error(error))
            .finally(()=>{
                simpleFetch(readUserAction)
                .then((rawData)=>rawData.json())
                .then((data)=>setContacts(data.contacts));
            });
        }else{
            console.error(`Invalid parameters in the manageContacts function. Attempted action: ${action}. Extra Parameter values: contact = ${contact}, contactID = ${contactID}`)
        }
    }

    useEffect(() => { //initializes context data
        simpleFetch(readUserAction)
        .then((rawData) => {
            if(!rawData.ok){
                throw new Error(`Cannot find user with the name of ${userName}, Attempting to create such a user.`)
            }
            return rawData.json()
            
        })
            .then((data) => {
                setContacts(data.contacts);
            })
            .catch((error) => {
                console.error(error);
                let initializedContacts = [
                    {
                        "name": "Example Contact 1",
                        "phone": "111-111-1111",
                        "email": "1@1.com",
                        "address": "1 1st st"
                    },
                    {
                        "name": "Example Contact 2",
                        "phone": "222-222-2222",
                        "email": "22@22.com",
                        "address": "22 22nd st"
                    },
                    {
                        "name": "Example Contact 3",
                        "phone": "333-333-3333",
                        "email": "333@333.com",
                        "address": "333 333rd st"
                    }
                ];
                simpleFetch(createUserAction)
                    .then((rawUserPost) => {
                        if (!rawUserPost.ok) {
                            throw new Error(`Failed to both attempting to read and attempting to create user named ${userName}. The API may be down and the application may not work.`)
                        }
                        return Promise.all([
                                manageContacts("add", initializedContacts[0]),
                                manageContacts("add", initializedContacts[1]),
                                manageContacts("add", initializedContacts[2])
                            ])
                    })
                    .catch((error) => console.error(error));
            });
    }, []);


    return (
        <MyContext.Provider value={{ contacts, manageContacts }}>
            {children}
        </MyContext.Provider>
    )
}

/* How every element in contacts should look like:

{
    "name": "Example Contact 1",
    "phone": "111-111-1111",
    "email": "1@1.com",
    "address": "1 1st st",
    "id": 113
}

*/


import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        user_type: "",
        division: "",
        district: ""
    })
    const { id } = useParams()

    useEffect(() => {
        loadUsers()
    }, [])
    const loadUsers = async () => {
        const result = await axios.get(`https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`)
        setUser(result.data)
    }
    return (
        
        <div className="container ">
        <div className="user-page">
            <div className="row">
                <div className="col-md-8 detail" >
                    <div className="top">
                        <h2 className="page-title"> User ID: {id}</h2>
                        <Link className="back-button" id="addUser" to="/">Back To User List</Link>
                    </div>
                    <hr />
                    <ul className="list-group my-2 list">
                        <li className="list-group-item"><div className="row"><span className="span-title">First Name</span> <span className="span-title">{user.first_name}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="span-title">Last Name</span> <span className="col-6">{user.last_name}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="span-title">Division</span> <span className="col-6">{user.division}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="span-title">Distict</span> <span className="col-6">{user.district}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="span-title">User Type</span> <span className="col-6">{user.user_type}</span></div></li>
                    </ul>
                    <Link className="update-user" to={`/user/edit/${id}`}> Update User</Link>
                </div>
            </div>
        </div>
        </div>

    )

}

export default User;
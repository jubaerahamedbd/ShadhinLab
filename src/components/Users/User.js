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
            <div className="row">
                <div className="col-md-8 detail" >
                    <div className="top">
                        <h2> User ID: {id}</h2>
                        <Link className="btn btn-outline-dark col-md-6 " id="addUser" to="/">Back To User List</Link>
                    </div>
                    <hr />
                    <ul className="list-group my-2">
                        <li className="list-group-item"><div className="row"><span className="col-6">First Name</span> <span className="col-6">{user.first_name}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="col-6">Last Name</span> <span className="col-6">{user.last_name}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="col-6">Division</span> <span className="col-6">{user.division}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="col-6">Distict</span> <span className="col-6">{user.district}</span></div></li>
                        <li className="list-group-item"><div className="row"><span className="col-6">User Type</span> <span className="col-6">{user.user_type}</span></div></li>
                    </ul>
                    <Link className="btn btn-primary" to={`/user/edit/${id}`}> Update User</Link>
                </div>
            </div>
        </div>

    )

}

export default User;
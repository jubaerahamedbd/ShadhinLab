import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddUser from "./Users/AddUser";

const Home = () => {
    const [tabValue, settabValue] = useState('admin')
    const [users, setUsers] = useState([])

    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        console.log(tabValue);
        loadUsers()
    }, [tabValue])

    const loadUsers = async () => {
        const result = await axios.get("https://60f2479f6d44f300177885e6.mockapi.io/users")
        result.data.reverse()
        setUsers(
            result.data.filter((data) => {
                if (data.user_type === tabValue) return true;
            })
        )
    }
    const deleteUser = async id => {
        await axios.delete(`https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`)
        loadUsers();
    }
   
    return (
        <div className="home-container">
        
        <div className="container">
        {openModal && <AddUser closeModal={setOpenModal} setUsers={setUsers} tabValue={tabValue} />}
            <div className="top">
                <h3 className="page-title">Users List</h3>
                <Link className="back-button-home" id="addUser" onClick={() => setOpenModal(true)} to="/">Add User</Link>
            </div>
            <hr />

            <div className={openModal === false? "tabshow":"tabhide"}>
                <button className={tabValue ==="admin" ? "admin":"button"} id="admin" name="mytabs" checked="checked" onClick={() => settabValue('admin')}>Admin</button>
                <button className={tabValue ==="employee" ? "employee":"button"} id="employee" name="mytabs" checked="checked" onClick={() => settabValue('employee')}>Employee</button>
              
                <div className="tab">
                    <table class="table">
                        <thead>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Division</th>
                            <th scope="col">District</th>
                            <th scope="col">User Type</th>
                            <th scope="col">Details View</th>

                        </thead>
                        <tbody>
                            {

                                users.map((user) => (

                                    <tr>
                                        <td data-label="First Name">{user.first_name}</td>
                                        <td data-label="Last Name">{user.last_name} </td>
                                        <td data-label="Division">{user.division}</td>
                                        <td data-label="District">{user.district}</td>
                                        <td data-label="User Type">{user.user_type}</td>
                                        <td data-label="Details View"><Link className="btn-primary" to={`/user/${user.id}`}>Details</Link>
                                            <Link className="btn-warn" onClick={() => deleteUser(user.id)}>Delete</Link>
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div>                          
            </div>
            
            
        </div>
        </div>
    )
}

export default Home;
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
        <div className="container">
            <div className="top">
                <h3 >Users List</h3>
                <Link className="btn btn-outline-dark col-md-3 " id="addUser" onClick={() => setOpenModal(true)} to="/">Add User</Link>
            </div>
            <hr />

            <div className="mytabs">
                <input type="radio" id="admin" name="mytabs" checked="checked" onClick={() => settabValue('admin')} />
                <label for="admin" >Admin View</label>
                <div className="tab">
                    <table class="table table-striped text-center shadow">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Division</th>
                                <th scope="col">District</th>
                                <th scope="col">User Type</th>
                                <th scope="col">Details View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                users.map((user) => (

                                    <tr>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name} </td>
                                        <td>{user.division}</td>
                                        <td>{user.district}</td>
                                        <td>{user.user_type}</td>
                                        <td><Link className="btn btn-primary mx-2" to={`/user/${user.id}`}>Details</Link>
                                            <Link className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</Link>
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <input type="radio" id="employee" name="mytabs" checked="checked" onClick={() => settabValue('employee')} />
                <label for="employee"  >Employee View</label>
                <div className="tab">
                    <table class="table table-striped text-center shadow">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Division</th>
                                <th scope="col">District</th>
                                <th scope="col">User Type</th>
                                <th scope="col">Details View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                users.map((user) => (

                                    <tr>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name} </td>
                                        <td>{user.division}</td>
                                        <td>{user.district}</td>
                                        <td>{user.user_type}</td>
                                        <td><Link className="btn btn-primary mx-2" to={`/user/${user.id}`}>Details</Link>
                                            <div className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</div>
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {openModal && <AddUser closeModal={setOpenModal} setUsers={setUsers} tabValue={tabValue} />}
        </div>
    )
}

export default Home;
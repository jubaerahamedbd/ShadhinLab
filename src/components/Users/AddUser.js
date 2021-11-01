import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Country, State, City } from "country-state-city";
const AddUser = ({ closeModal,setUsers,tabValue }) => {
    
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        user_type: "",
        division: "",
        district: ""
    })
   
    const { first_name, last_name, user_type, division, district } = user
    const [divisions, setDivisions] = useState(
        State.getStatesOfCountry("BD").filter((dataItem) => {
            if (dataItem.name.includes("Division")) return true;
        })
    );
    const [districts, setDistricts] = useState([]);

    const OnInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:
                e.target.name === "division"
                    ? e.target.value.split("-")[0]
                    : e.target.value,
        });
        if(e.target.user_type === 'admin'){
            tabValue = 'admin'
        }
    };
    const onSubmit = async e => {
        e.preventDefault()
        await axios.post("https://60f2479f6d44f300177885e6.mockapi.io/users", user)
        const result = await axios.get("https://60f2479f6d44f300177885e6.mockapi.io/users")
        result.data.reverse()
        setUsers(
            result.data.filter((data) => {
                if (data.user_type === tabValue) return true;
            })
        )
        closeModal(false)
    }
    useEffect(() => {
        console.log(State.getStatesOfCountry("BD"));
    }, []);
    return (
        <div className="AddUserLayout">
            <div className="container">
                <div className="col-md-8 updateUser">
                    <div className="top">
                        <h2 className="page-title">Add User</h2>
                        <Link className="back-button" id="addUser" onClick={() => closeModal(false)} to="/">Back To User List</Link>
                    </div>
                    <hr />
                    <form onSubmit={e => onSubmit(e)}>
                        <div class="form-group row my-2">

                            <label class="col-sm-3 col-form-label col-form-label-sm">First Name:</label>

                            <div class="col-sm-9" >
                                <input
                                    class="col-sm-9"
                                    type="text"
                                    class="form-control"
                                    name="first_name"
                                    value={first_name}
                                    placeholder="Enter First Name"
                                    onChange={e => OnInputChange(e)}
                                />
                            </div>
                        </div>
                        <div class="form-group row my-2">

                            <label class="col-sm-3 col-form-label col-form-label-sm">Last Name</label>
                            <div class="col-sm-9" >
                                <input
                                    type="text"
                                    class="form-control"
                                    name="last_name"
                                    value={last_name}
                                    placeholder="Enter Last Name"
                                    onChange={e => OnInputChange(e)}
                                />
                            </div>

                        </div>
                        <div class="form-group row my-2">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                                Division
                            </label>
                            <div class="col-sm-9">
                                <select
                                    onChange={(e) => {
                                        //OnInputChange(e);
                                        setDistricts(
                                            City.getCitiesOfState("BD", e.target.value.split("-")[1])
                                        );
                                    }}
                                    class="form-control form-control-sm"
                                    name="division"
                                >
                                    {divisions.map((dataItem) => {
                                        return (
                                            <option value={dataItem.name + "-" + dataItem.isoCode}>
                                                {dataItem.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <div class="form-group row my-2">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                                District
                            </label>
                            <div class="col-sm-9">
                                <select
                                    onChange={(e) => {
                                        OnInputChange(e);
                                    }}
                                    class="form-control form-control-sm"
                                    name="district"
                                >
                                    {districts.map((dataItem) => {
                                        return <option value={dataItem.name}>{dataItem.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div class="form-group row my-2">
                            <label class="col-sm-3 col-form-label col-form-label-sm"    >User Type</label>
                            <div class="col-sm-9">

                                <select
                                    onChange={(e) => OnInputChange(e)}
                                    class="form-control form-control-sm"
                                    name="user_type"
                                >
                                    <option value={"admin"}>admin</option>
                                    <option value={"employee"}>employee</option>
                                </select>
                            </div>

                        </div>

                        <button type="submit" class="btn btn-primary updatebtn">Add User</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddUser;
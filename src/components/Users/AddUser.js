import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { State, City } from "country-state-city";
import { Formik } from "formik";

const AddUser = ({ closeModal, settabValue }) => {
    const [users, setUsers] = useState({
        first_name: "",
        last_name: "",
        user_type: "",
        division: "",
        district: "",
    });
    const [divisions, setDivisions] = useState(
        State.getStatesOfCountry("BD").filter((dataItem) => {
            if (dataItem.name.includes("Division")) return true;
        })
    );
    const [districts, setDistricts] = useState([]);

    const postUserData = async (useData) => {
        await axios.post("https://60f2479f6d44f300177885e6.mockapi.io/users", useData);
        const result = await axios.get(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=${useData.user_type}&?page=${0}&limit=${5}`);
        result.data.reverse();
        if (useData.user_type === "admin") {
            settabValue("admin");
        } else {
            settabValue("employee");
        }
        setUsers(result.data);
        closeModal(false);
    };
    const initialValues = {
        first_name: "",
        last_name: "",
        user_type: "admin",
        division: "",
        district: "",
    };
    const validate = (values) => {

        let errors = {};
        if (!values.first_name) {
            errors.first_name = "first name is required";
        }
        if (!values.last_name) {
            errors.last_name = "last name is required";
        }
        if (values.user_type === "employee" && !values.division) {
            errors.division = "Division is required";
        }
        if (values.user_type === "employee" && !values.district) {
            errors.district = "District is required";
        }

        if (!values.user_type) {
            errors.user_type = "user type is required";
        }
        return errors;
    };
    const submitForm = async (values) => {
        let userData = {
            ...values,
            ...{ division: values.division.split("-")[0] },
        };
        postUserData(userData);
    };
    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
        >
            {(formik) => {
                const {
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    dirty,
                } = formik;
                return (
                    <div className="AddUserLayout">
                        <div className="container">
                            <div className="col-md-8 updateUser">
                                <div className="top">
                                    <h2 className="page-title">Add User</h2>
                                    <Link className="back-button" id="addUser" onClick={() => closeModal(false)} to="/" >Back To User List</Link>
                                </div>
                                <hr />
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group row my-2">
                                        <label class="col-sm-3 col-form-label col-form-label-sm">First Name:</label>
                                        <div class="col-sm-9">
                                            <input
                                                class="col-sm-9"
                                                type="text"
                                                class="form-control"
                                                name="first_name"
                                                value={values.first_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Enter First Name"
                                            />
                                            {errors.first_name && touched.first_name && (<span className="error">{errors.first_name}</span>)}
                                        </div>
                                    </div>

                                    <div class="form-group row my-2">
                                        <label class="col-sm-3 col-form-label col-form-label-sm">Last Name</label>
                                        <div class="col-sm-9">
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="last_name"
                                                value={values.last_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Enter Last Name"
                                            />
                                            {errors.last_name && touched.last_name && (<span className="error">{errors.last_name}</span>)}
                                        </div>
                                    </div>

                                    {values.user_type === "employee" ? (
                                        <div>
                                            <div class="form-group row my-2">
                                                <label class="col-sm-3 col-form-label col-form-label-sm">
                                                    Division
                                                </label>
                                                <div class="col-sm-9">
                                                    <select
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setDistricts(
                                                                City.getCitiesOfState(
                                                                    "BD",
                                                                    e.target.value.split("-")[1]
                                                                )
                                                            );
                                                        }}
                                                        value={values.division}
                                                        onBlur={handleBlur}
                                                        class="form-control form-control-sm"
                                                        name="division"
                                                    >
                                                        <option disabled selected value={""}>-- select a division --</option>
                                                        {divisions.map((dataItem) => {
                                                            return (
                                                                <option value={dataItem.name + "-" + dataItem.isoCode} >
                                                                    {dataItem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                    {errors.division && touched.division && (<span className="error">{errors.division}</span>)}
                                                </div>
                                            </div>
                                            <div class="form-group row my-2">
                                                <label class="col-sm-3 col-form-label col-form-label-sm">District</label>
                                                <div class="col-sm-9">
                                                    <select
                                                        onChange={handleChange}
                                                        value={values.district}
                                                        onBlur={handleBlur}
                                                        class="form-control form-control-sm"
                                                        name="district"
                                                    >
                                                        <option disabled value={""}>-- select a district --</option>
                                                        {districts.map((dataItem) => {
                                                            return (
                                                                <option value={dataItem.name}>
                                                                    {dataItem.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                    {errors.district && touched.district && (<span className="error">{errors.district}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <div class="form-group row my-2">
                                        <label class="col-sm-3 col-form-label col-form-label-sm">User Type</label>
                                        <div class="col-sm-9">
                                            <select
                                                value={values.user_type}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                onBlur={handleBlur}
                                                class="form-control form-control-sm"
                                                name="user_type"
                                            >
                                                <option value={"admin"}>admin</option>
                                                <option value={"employee"}>employee</option>
                                            </select>
                                            {errors.user_type && touched.user_type && (<span className="error">{errors.user_type}</span>)}
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-primary updatebtn"> Add User</button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default AddUser;

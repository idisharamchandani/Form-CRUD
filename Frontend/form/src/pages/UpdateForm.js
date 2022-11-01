import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateForm() {

    let navigate = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
    const params = useParams(); //The useParams() hook helps us to access the URL parameters from a current route. 


    const [user, setUser] = useState({
        Name: "",
        Colour: ""
    })


    const { Name, Colour } = user;

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);


    const updateUser = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/edit/${params.id}`, user);
        navigate("/");
    };

    const loadUser = (id) => {
        fetch(`http://localhost:5000/getanuser/${params.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result, "rrrrrr");
                setUser({
                    _id: id,
                    update: true,
                    Name: result.Name,
                    Colour: result.Colour

                });
                console.log(Name, "name");
            })
            .catch((error) => console.log("error", error));
    };
    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="card w-25">
                <div className="card-body">
                <form>
                <div class="form-group">
                    <label htmlFor='name'>Name</label>
                    <input className="form-control" type='text' id='name' name='Name' value={Name} onChange={e => handleChange(e)} />
                    </div>
                    <div class="form-group  mt-3">
                    <select name='Colour' className="form-control" id='colour' value={Colour} onChange={e => handleChange(e)}>

                        <option value='sc'>Select a Colour</option>
                        <option value='red'>Red</option>
                        <option value='blue'>Blue</option>
                        <option value='green'>Green</option>
                        <option value='yellow'>Yellow</option>
                    </select>
                    </div>
                    <div className='d-flex justify-content-center'>
                    <button type='submit' className="btn btn-success mt-3"  onClick={updateUser}>Update</button>
                    </div>
                </form>
            </div>
        </div>
        </div >
    );
};
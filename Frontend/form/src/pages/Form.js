import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Form() {

    const [user,setuser] = useState({
        Name:"",
        Colour:""
    })

    const [usersdetails,setusersdetails] = useState([])


    const {Name,Colour} = user;
    const handleChange = e => {
      setuser({ ...user, [e.target.name]: e.target.value });
    };
     
    // On Page load display all records 
    const Usersdetail = async () =>  
    {
      var response = fetch('http://localhost:5000/getallusers')
         .then(function(response){
            return response.json();
          })
         .then(function(myJson) {
            setusersdetails(myJson);
          });
    }
    useEffect(() => {
        Usersdetail();
    }, []);
 
    // Insert Employee Records 
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post("http://localhost:5000/user",user);
      
         
        Usersdetail();
    };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();



    //     const { Name,Colour } = user;




    //     const res = await fetch("http://localhost:5000/user", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             Name, Colour

    //         })
    //     });
    //     const data = await res.json();
    //     console.log(data,"data")
    //     res.send(data);

    //     loadEmployeeDetail();





    // }
    // let name, value;
    // const handleChange = (e) => {
    //     name = e.target.name;
    //     value = e.target.value;

    //     setuser({ ...user, [name]: value })
    //   };


    //   const loadEmployeeDetail = async () =>  
    // {
    //   var response = fetch('http://localhost:5000/getallusers')
    //      .then(function(response){
    //         return response.json();
    //       })
    //      .then(function(myJson) {
    //         setusersdetails(myJson);
    //       });
    // }
    // useEffect(() => {
    //   loadEmployeeDetail();
    // }, []);


    //   const users = async () => {
    //     const response = await fetch("http://localhost:5000/getallusers")
    //         .then((response) => response.json());
    //         setusersdetails(response);
    // };

    // useEffect(() => {
    //     users();
    // }, []);


                       
    const deleteuser = (id) =>
    {
      axios.delete(`http://localhost:5000/deleteuser/${id}`)
      .then((result)=>{
        Usersdetail();
      })
      .catch(()=>{
        alert('Error in the Code');
      });
    };
    
    return(
        <div>
            <div className='container mt-4 d-flex justify-content-center'>
                <div className="card w-25">
                <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label htmlFor='name'>Name</label>
                    <input type='text' className="form-control" id='name' name='Name' value={user.Name} onChange={e => handleChange(e)}/>
                    </div>
                    <div class="form-group  mt-3">
                    <select name='Colour' className="form-control" id='colour' value={user.Colour} onChange={e => handleChange(e)}>

                        <option value='sc'>Select a Colour</option>
                        <option value='red'>Red</option>
                        <option value='blue'>Blue</option>
                        <option value='green'>Green</option>
                        <option value='yellow'>Yellow</option>
                    </select>
                    </div>
                    <div className='d-flex justify-content-center'>
                    <button className="btn btn-success mt-3" type='submit'>Submit</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-5'>
              
                <table className='table table-hover w-50'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Colour</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {usersdetails.map((ud) => {
                        return (
                            <tr>
                                <td>{ud.Name}</td>
                                <td>{ud.Colour}</td>
                                <td><button className='btn btn-primary'><Link className=' text-white text-decoration-none' to={"/edit/"+ud._id}>Update</Link></button></td>
                                <td>
                                <a  className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete "+ ud.Name
                          )
                          if (confirmBox === true) {
                            deleteuser(ud._id)
                          }
                        }}><button className='btn btn-danger'>Delete</button></a></td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
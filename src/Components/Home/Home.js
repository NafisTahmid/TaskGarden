import React from 'react'
import { loadAllTodos } from '../../Utilities/Functions'
import { useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';

function Home() {

    const {user, logOut} = useAuth();

    useEffect(() => {
        loadAllTodos();
    }, []);


  return (
    <div className="container mt-5">
        <h1 className="text-center text-white">Your Todo's</h1>

        <div id="todos" className="my-5 text-white text-center"></div>
        <div id="update" className="my-5 text-white"></div>

        <div className="container my-5">
            <form action="/addTodo" method="post">

                <div className="form-group col-md-4 mx-auto d-block">

                    <label for="name" className="text-white">Todo Name</label>
                    <input type="text" name="name" class="form-control mb-3" placeholder="Name" required/>

                    <label for="name" className="text-white">Todo Location</label>
                    <input type="text" name="location" class="form-control mb-3" placeholder="Location" required/>

                    <label for="name" className="text-white">Start Time</label>
                    <input type="text" name="start_time" class="form-control mb-3" placeholder="Start Time" required/>

                    <label for="name" className="text-white">End Time</label>
                    <input type="text" name="end_time" class="form-control mb-3" placeholder="End Time" required/>

                </div>
                <button class="btn btn-success mx-auto d-block">Add New Todo</button>
            </form>
        </div>
        <div className="mt-3 d-flex justify-content-end">
            <button onClick={logOut} className="btn btn-danger btn-sm">Log Out</button> 
        </div>
    </div>
  )
}

export default Home
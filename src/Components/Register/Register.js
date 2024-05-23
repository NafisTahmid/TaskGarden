import React from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import bcrypt from 'bcryptjs-react';
const Register = () => {

    const {registerUser,user,  error} = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    let from = location?.state?.from?.pathname || "/home"; 

    user.email && navigate(from , {replace: true}); 

    const {register,handleSubmit,formState: { errors },} = useForm()

    const onSubmit = (data) => {
        const encryptedPassword = bcrypt.hashSync(data.password, 10);
        registerUser(data.name, data.image, data.email, encryptedPassword);
    
        // Retrieve existing credentials array or initialize as an empty array
        const existingCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];
    
        // Add new credentials to the existing array
        const updatedCredentials = [...existingCredentials, { email: data.email, password: encryptedPassword }];
    
        // Store the updated array in local storage
        localStorage.setItem('userCredentials', JSON.stringify(updatedCredentials));
    }
    
       
    return (
        <section className="">
            
            <div className="container mt-5">
                <h1 className="fs-4 text-center text-white">Register</h1>
              
                        <div className="col-md-6 col-sm-8 mx-auto d-block">  
                        <form onSubmit={handleSubmit(onSubmit)}>
                         <div class="form-group mt-2">
                            <label htmlFor="name" className="form-label text-white">Name</label>
                            <input type="text" className="form-control"  {...register("name", {required: true})}/>
                            {errors.name && <span className="text-danger">Name is required</span>}
                        </div> 

                        <div class="form-group mt-2">
                            <label htmlFor="image" className="form-label text-white">Copy your Profile Picture Link from the Internet</label>
                            <input type="text" className="form-control"  {...register("image", {required: true})}/>
                            {errors.image && <span className="text-danger">Profile Picture is required</span>}
                        </div>
        
                        <div class="form-group mt-2">
                            <label htmlFor="email" className="form-label text-white">Email</label>
                            <input type="email" className="form-control"  {...register("email", {required: true})}/>
                            {errors.email && <span className="text-danger">Address is required</span>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="password" className="form-label p-1 text-white">Password</label>
                            <input type="password" className="form-control" id="password" {...register("password", {required: true})}/>
                            {errors.password && <span className="text-danger">Password is required</span>}
                        </div>

                        <p>{error}</p>

                        <p className="text-white"> <small>We'll never share your information with anyone else</small></p>                       
                        
                        <input className = "btn btn-dark p-2 mt-1" type="submit" value="Register"/>
                        </form> 
                    </div>
               

                <div className="mt-3 d-flex justify-content-center align-items-center">
                        <Link to='/login' className='text-black text-decoration-none mb-3 text-white'>
                            Already have an account? <span className='text-decoration-underline text-danger'>Login to your account.</span>
                        </Link>
                    </div>
            </div>
        </section>
    );
};

export default Register;
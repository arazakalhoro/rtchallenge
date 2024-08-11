import React from 'react'
import { useForm,SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'
import  styles from './ForgetPass.module.css'
import AnimatedPage from '../../../AnimatedPage/AnimatedPage';

type AuthInputs = {
  email: string;
  code : string;
};
export default function ForgetPass() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const onSubmit : SubmitHandler<AuthInputs> = async(data) => {
    console.log(data)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/forgot-password', data)
      console.log(res)
      toast.success('Your request is being processed, please check your email')
      navigate('/login')
    }
    catch (error:any) {
      toast.error(error.response.data.message)
    }

  }
  return (

    

    <div className='auth-container'>
      <div className='container-fluid'>
        <div className="row d-flex vh-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <AnimatedPage>
         <form action="#" onSubmit={handleSubmit(onSubmit)} className='form-auth' style={{ padding: "80px 60px" }}>
              <h1 className='auth-title'>Forget Password</h1>
              <span className='e-mail'>E-mail</span> <br />
              <div className='auth-standard-basic'>
                <input className='input' placeholder='Enter your E-mail'
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invlid mail"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="alert alert-danger">{errors.email.message} </p>
              )}

              <div className='text-center mt-5'>
                <button className="btn btn-warning verify">Verify</button>
              </div>
            </form>
            </AnimatedPage>

   
          </div>
        </div>
      </div>
    </div>
  )
}
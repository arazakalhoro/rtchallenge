import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Styles from "./Register.module.css";
import { useToast } from "../../../Context/ToastContext";
import AnimatedPage from "../../../AnimatedPage/AnimatedPage";

interface IFormInput {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [visible, setVisible] = useState(false);
  const { getToast } = useToast();
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();
  // const imgValue = watch();
  const imgValue = watch("profileImage");
  const password = useRef({});
  password.current = watch("password", "");
  const appendToFormData = (data: any) => {
    const formData = new FormData();
    formData.append("username", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirmPassword);
    return formData;
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const registerFormData = appendToFormData(data);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/signup",
        registerFormData
      );
      console.log(response);

      getToast("success", "User Registered Successfully");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      getToast("error", error.response.data.message);
    }
  };

  return (
    <>
      <div className={` ${Styles.authcontainer}  `}>
        <div className="container-fluid bg-blac">
          <div className="row d-flex justify-content-center align-items-center bg-dange ">
            <div className="col-md-7 bg-warnin ">
              <div className="text-center">
              </div>
              <AnimatedPage>
                <div className={`  ${Styles.bgFormContainer} p-4 px-5 pt-5 `}>
                  <h6 className="text-white">welcome to Task Management</h6>
                  <h2 className={`${Styles.textGold}`}>
                    <span className="text-decoration-underline">C</span>reate New
                    Account
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row py-3">
                      <div className="col-md-6">
                        <label className={`${Styles.textGold}`}>Username</label>
                        <div>
                          <input
                            type="text"
                            className={`${Styles.input} p-1 text-white w-100`}
                            placeholder="Enter your name"
                            {...register("userName", {
                              required: "Username is required",
                            })}
                          />
                        </div>
                        {errors.userName && <p className='alert alert-danger mt-2'>{(errors.userName as FieldError).message}</p>}
                      </div>
                      <div className="col md-6">
                        <label className={`${Styles.textGold}`}>E-mail</label>
                        <div>
                          <input
                            type="text"
                            className={`${Styles.input} p-1 text-white w-100`}
                            placeholder="Enter your email"
                            {...register("email", {
                              required: "email is required",
                            })}
                          />
                        </div>
                        {errors.email && <p className='alert alert-danger mt-2'>{(errors.email as FieldError).message}</p>}
                      </div>
                      <div className="col-md-6">
                        <label className={`${Styles.textGold}`}>Password</label>

                        <div className={`${Styles.input} d-flex`}>
                          <input
                            type={visible ? "text" : "password"}
                            className={`${Styles.input1} p-1 text-white w-100 z-0`}
                            placeholder="Enter your Password"
                            {...register("password", {
                              minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                              },
                              required: "password is required",
                            })}
                          />
                          <span
                            onClick={() => setVisible(!visible)}
                            className={`${Styles.passEye} text-white  `}
                          >
                            {visible ? (
                              <i className="fa-regular fa-eye  "></i>
                            ) : (
                              <i className="fa-regular fa-eye-slash "></i>
                            )}
                          </span>
                        </div>
                        {errors.password && <p className='alert alert-danger mt-2'>{(errors.password as FieldError).message}</p>}
                      </div>
                      <div className="col md-6">
                        <label className={`${Styles.textGold}`}>
                          Confirm Password
                        </label>
                        <div className={`${Styles.input} d-flex`}>
                          <input
                            type={visible ? "text" : "password"}
                            className={`${Styles.input1} p-1 text-white w-100 z-0`}
                            placeholder="Confirm New Password"
                            {...register("confirmPassword", {
                              required: "confirm Password is required",
                              validate: (value) =>
                                value === password.current ||
                                "The passwords do not match",
                            })}
                          />
                          <span
                            onClick={() => setVisible(!visible)}
                            className={`${Styles.passEye2} text-white `}
                          >
                            {visible ? (
                              <i className="fa-regular fa-eye"></i>
                            ) : (
                              <i className="fa-regular fa-eye-slash"></i>
                            )}
                          </span>
                        </div>
                        {errors.confirmPassword && <p className='alert alert-danger mt-2'>{(errors.confirmPassword as FieldError).message}</p>}
                      </div>
                    </div>
                    <div className="text-center">
                      <button className={`${Styles.btnGold} btn px-5 w-50 text-white rounded-pill p-2 my-4`}>
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </AnimatedPage>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

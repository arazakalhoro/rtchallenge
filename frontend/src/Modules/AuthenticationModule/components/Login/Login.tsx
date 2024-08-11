import styles from "./Login.module.css";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { useToast } from "../../../Context/ToastContext";
import AnimatedPage from "../../../AnimatedPage/AnimatedPage";
import Transition from "../../../Tramsition/Transition";

type AuthInputs = {
  email: string;
  password: string;
};


export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getUserData } = useAuth();
  const timeoutRef = useRef<number>();

  const { getToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/auth/login`,
        data
      );
      localStorage.setItem("token", res.data.token);
      getUserData();
      timeoutRef.current = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
      setLoading(false);
      getToast("success", "Logged in Successfuly");
    } catch (err: any) {
      setLoading(false);
      getToast("error", err.response.data.message);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (

   <div className={styles.authContainer}>
        <div className={`container-fluid`}>
          <div
            className={`row vh-100 justify-content-center align-items-center overflow-hidden`}
          >
            <div className={`col-lg-6 col-md-8 col-sm-8 bg-inf`}>
              <div className={styles.login}>
                <div className={`text-center pb-2`}>
                </div>
                <AnimatedPage>
      <div className={`${styles.content} p-5`}>
                  <div className={`mb-5`}>
                    <p>Welcome to Task Management</p>
                    <h4>Login</h4>
                  </div>
                  <form
                    className="d-flex flex-column gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="bg-blac">
                      <div
                        className={`${styles.inputContainer} ${
                          errors.email && styles.inputError
                        }`}
                      >
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="text"
                          id="email"
                          {...register("email", {
                            required: "*Email is required",
                            pattern: {
                              value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                              message: "Invaild mail",
                            },
                          })}
                          className={styles.inputLogin}
                          placeholder="Enter your E-mail"
                        />
                      </div>
                      {errors.email && (
                <p className="alert alert-danger mt-2">
                          {(errors.email as FieldError).message}
                        </p>
                      )}
                    </div>

                    <div className="bg-inf">
                      <div
                        className={`${styles.inputContainer} ${
                          errors.email && styles.inputError
                        }`}
                      >
                        <label htmlFor="password">Password</label>
                        <div className="d-flex align-items-center">
                          <input
                            type={showPass ? "text" : "password"}
                            id="password"
                            {...register("password", {
                              required: "*Password is required",
                            })}
                            placeholder="Enter your password"
                            className={styles.inputLogin}
                          />
                          <i
                            className={`fa-regular ${
                              showPass ? "fa-eye" : "fa-eye-slash"
                            } ${styles.showPass}`}
                            onClick={() => setShowPass(!showPass)}
                          ></i>
                        </div>
                      </div>
                      {errors.password && (
                        <p className="text-warning mt-2">
                          {(errors.password as FieldError).message}
                        </p>
                      )}
                    </div>

                    <div
                      className={`d-flex align-items-center justify-content-between mb-4 ${styles.textGold}`}
                    >
                      <Link
                        to="/register"
                        className={`text-decoration-none  ${styles.textGold}`}
                      >
                        Register Now ?
                      </Link>
                      <Link
                        to="/forgot-password"
                        className={`text-decoration-none   ${styles.textGold} `}
                      >
                        Forget Password ?
                      </Link>
                    </div>
                    <button
                      disabled={loading}
                      className={`btn ${styles.btn_main}`}
                       >
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </form>
                </div>
                </AnimatedPage>
          
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

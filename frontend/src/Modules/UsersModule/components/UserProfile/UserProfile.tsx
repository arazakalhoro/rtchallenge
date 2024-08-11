import React, {useEffect, useState} from "react";
import axios from "axios";
import {useToast} from "../../../Context/ToastContext";
import {useAuth} from "../../../Context/AuthContext.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {Header} from "../../../SharedModule/components/Header/Header.tsx";
import Loading from "../../../SharedModule/components/Loading/Loading.tsx";

type AuthInputs = {
    username: string,
    email: string,
};
export default function UserProfile() {
    const {baseUrl, requestHeaders} = useAuth();
    const {getToast} = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState([])
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm<AuthInputs>();
    const getUserProfile = () => {
        setIsLoading(true);
        axios
            .get(`${baseUrl}/users/profile`, {
                headers: requestHeaders,
            })
            .then((response) => {
                setIsLoading(false);
                let data = response.data.data;
                setEmail(data.email);
                setUsername(data.username);
                setUserDetails(response.data.data);
                reset({
                   ...data,
                })
            })
            .catch((error) => {
                setIsLoading(false);
                getToast("error", "Error fetching user details");
                console.error(error);
            });
    }

    const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
        try {
            let response = await axios.put("http://127.0.0.1:8000/api/users/update-details", data, {
                headers: requestHeaders,
            })
            toast.success(response.data.message)
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    // *===============================>> UseEffect <<=============================
    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <>
          <Header title='User Profile'/>
            {isLoading ? (
                <Loading />
            ) : (
                <div
                    className="d-flex container justify-content-center bg-white align-items-center my-5 py-5 shadow gap-5 dark-p dark-tabel">
                    <div className="row">
                        <div className="col-lg-12">
                            <form action="#" onSubmit={handleSubmit(onSubmit)} className='form-auth'
                                  style={{padding: "15px 60px"}}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text"
                                           {...register("username", {
                                               required: "Username is required",
                                           })}
                                           className="form-control" id="uesrname"
                                           aria-describedby="emailHelp"/>
                                    {errors.username && (
                                        <div className="form-text">
                                            {errors.username.message}
                                        </div>
                                    )}

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input type="email"
                                           {...register("email", {
                                               required: "Email is required",
                                           })}
                                           className="form-control" id="email"
                                           aria-describedby="emailHelp"/>
                                    {errors.email && (
                                        <div className="form-text">
                                            {errors.email.message}
                                        </div>
                                    )}

                                </div>
                                <div className='text-center mt-5'>
                                    <button className="btn btn-warning verify">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
    

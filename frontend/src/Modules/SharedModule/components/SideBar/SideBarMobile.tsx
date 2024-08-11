import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';




import SideBarStyle from '../SideBar/sidebar.module.css';



import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useToast } from "../../../Context/ToastContext";

export default function SideBarMobile() {
    const { setLoginUser, baseUrl, requestHeaders, loginUser,ChangePassword } = useAuth();
    let { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { getToast } = useToast();
    const navigate = useNavigate();
    const [placeholder, setPlaceholder] = useState<Placeholders>({
        oldPassword: 'Enter your old password',
        newPassword: 'Enter your new password',
        confirmNewPassword: 'Confirm your new password',
    });
    const [showPassword, setShowPassword] = useState({
        oldPassword: true,
        newPassword: true,
        confirmNewPassword: true,
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [iconRotation, setIconRotation] = useState(1);
    let [isCollapse, setIsCollapse] = useState(true);
    let [collapsedWidth, setCollapsedWidth] = useState("100%");

    const updateCollapsedWidth = () => {
        const width = window.innerWidth;
        if (width <= 576) {
            setCollapsedWidth("100%");

        } else {
            setCollapsedWidth("0%");
        }
    };

    useEffect(() => {
        updateCollapsedWidth();
        window.addEventListener('resize', updateCollapsedWidth);
        return () => window.removeEventListener('resize', updateCollapsedWidth);
    }, []);

    function logout() {
        localStorage.removeItem("token");
        setLoginUser(null);
        navigate("/login");
    }

    // ?============================================================================================
    interface PasswordState {
        oldPassword: boolean;
        newPassword: boolean;
        confirmNewPassword: boolean;
    }

    interface Placeholders {
        oldPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }

    const togglePassword = (field: keyof PasswordState) => {
        setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
        setIconRotation(prevRotation => prevRotation === 1 ? -1 : 1);
    }

    const onSubmit = async (data: any) => {
        try {

            let response = await axios.put(`${baseUrl}/Users/ChangePassword`, data,
                {
                    headers: requestHeaders
                });



            getToast("success", response.data.message)
            logout()
            console.log(data);

        }
        catch (error) {

            console.log(error);
        }
    }
    return (
        <>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="offcanvasControl offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body d-flex flex-column justify-content-center align-content-center vh-100">
                    <ul className={SideBarStyle.sidebarMobileUl}>

                        <Link className={SideBarStyle.sidebarMobileLinkes} to="">
                            <i className="fa-solid fa-house icons"></i>
                            Home
                        </Link>
                        <Link className={SideBarStyle.sidebarMobileLinkes} to="users">
                            <i className="fa-solid fa-user icons"></i>
                            Users</Link>
                        <Link className={SideBarStyle.sidebarMobileLinkes} to="tasks">
                            <i className="fa-solid fa-list-check icons"></i>
                            Tasks</Link>
                        <Link className={SideBarStyle.sidebarMobileLinkes} to="users">
                            {/* onClick={handleShow} */}
                            <i className="fa-solid fa-lock icons"></i>
                            Change Password</Link>
                        <Link className={SideBarStyle.sidebarMobileLinkes} to="users">
                            <i className="fa-solid fa-right-from-bracket icons"></i>
                            Logout</Link>
                    </ul>

                </div>
            </div>
        </>
    )
}

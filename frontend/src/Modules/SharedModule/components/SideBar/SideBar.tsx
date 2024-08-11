import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal, Navbar } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


import { useForm } from 'react-hook-form';
import Style from './sidebar.module.css'
import axios from 'axios';

import { FieldError } from 'react-hook-form';
import { useToast } from "../../../Context/ToastContext";



export default function SideBar() {

  const { setLoginUser, baseUrl, requestHeaders, loginUser } = useAuth();
  let { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { getToast } = useToast();
  const navigate = useNavigate();
  const [placeholder, setPlaceholder] = useState<Placeholders>({
    password: 'Enter your new password',
    confirm_password: 'Confirm your new password',
  });
  const [showPassword, setShowPassword] = useState({
    password: true,
    confirm_password: true,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [iconRotation, setIconRotation] = useState(1);
  let [isCollapse, setIsCollapse] = useState(true);
  let [collapsedWidth, setCollapsedWidth] = useState("80px");

  const updateCollapsedWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setCollapsedWidth("0px");
    } else if (width <= 768) {
      setCollapsedWidth("80px");
    } else if (width <= 992) {
      setCollapsedWidth("80px");
    } else {
      setCollapsedWidth("80px");
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
    password: boolean;
    confirm_password: boolean;
  }

  interface Placeholders {
    password: string;
    confirm_password: string;
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

      let response = await axios.put(`${baseUrl}/users/update-password`, data,
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


  // *========================================><=============================================//
  return (

    <>

      <div className='sidebar-container sticky-top'>
        <Sidebar
          collapsed={isCollapse}
          // breakPoint={breakPoint}
          collapsedWidth={collapsedWidth}
        >
          <Menu className='my-5 py-5'>

            <MenuItem
              className='text-center d-none d-md-block'
              onClick={handleCollapse}
            >
              <div className="icon-container bg-warnin p-2 rounded-3" style={isCollapse ? { transform: `scaleX(${iconRotation})` } :
               { transform: `scaleX(${iconRotation})`, background: "#ef9b28" }}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </MenuItem>

            <MenuItem
              className='mt-4 mb-2'
              component={<Link to="" />}
              icon={<i className="fa-solid fa-house"></i>}
            >
              <span>Home</span>
            </MenuItem>
            <MenuItem
                className="mb-2"
                component={<Link to="profile" />}
                icon={<i className="fa-solid fa-user"></i>}
            >
              Tasks
            </MenuItem>

            <MenuItem
              className="mb-2"
              component={<Link to="tasks" />}
              icon={<i className="fa-solid fa-tasks"></i>}
            >
              Tasks
            </MenuItem>

            <MenuItem
              className="mb-2"
              onClick={handleShow}
              icon={<i className="fa-solid fa-unlock"></i>}
            >
              Change Password
            </MenuItem>

            <MenuItem
              className="mb-2"
              onClick={logout}
              icon={<i className="fa-solid fa-circle-left"></i>}
            >
              Logout
            </MenuItem>



          </Menu>
        </Sidebar>

        <Modal className='pt-4' show={show} onHide={handleClose}>


          <Modal.Body className={`${Style.modalBody} form-container p-5 bg-main rounded-2 dark-tabel`}>
            <p className='text-white pt-md-3'>welcome to APP</p>
            <h3 className='fw-bold mb-5 text-main position-relative'>Change Password</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-2'>
              <div className={`${Style.height} `}>
                <div className={`${Style.inputContainer} ${errors.password && Style.inputError}`}>
                  <label htmlFor="new" className="me-1">
                    New Password
                  </label>
                  <div className="d-flex align-items-end">
                    <input
                      type={showPassword.password ? 'text' : 'password'}
                      className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                      placeholder={placeholder.password}
                      id="new"
                      {...register('password', {
                        required: '* New Password is required',
                        pattern: {
                          value: /.{3,}/,
                          message: '* Invalid Password'
                        }
                      })}
                      onFocus={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, newPassword: '' }))}
                      onBlur={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, newPassword: 'Enter your new password' }))}
                    />
                    <span
                      onClick={() => togglePassword('password')}
                      className={`text-white ${Style.icon}`}>
                      {showPassword.password ?
                        <i className="fa-regular fa-eye"></i> :
                        <i className="fa-regular fa-eye-slash"></i>
                      }
                    </span>
                  </div>
                </div>
                {errors.password && <p className='text-warning mt-1'>{(errors.password as FieldError).message}</p>}
              </div>


              <div className={`${Style.height} `}>
                <div className={`${Style.inputContainer} ${errors.confirm_password && Style.inputError}`}>
                  <label htmlFor="confirm" className="me-1">
                    Confirm New Password
                  </label>
                  <div className="d-flex align-items-end">
                    <input
                      type={showPassword.confirm_password ? 'text' : 'password'}
                      className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                      placeholder={placeholder.confirm_password}
                      id="confirm"
                      {...register('confirm_password', {
                        required: '* Please confirm your password',
                        validate: (value) =>
                          value === watch('password') ||
                          "* Password isn't a match"
                      })}
                      onFocus={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, confirmNewPassword: '' }))}
                      onBlur={() => setPlaceholder((prevPlaceholders) => ({ ...prevPlaceholders, confirmNewPassword: 'Confirm your new password' }))}
                    />
                    <span
                      onClick={() => togglePassword('confirm_password')}
                      className={`text-white bg-inf ${Style.icon}`}>
                      {showPassword.confirm_password ?
                        <i className="fa-regular fa-eye"></i> :
                        <i className="fa-regular fa-eye-slash"></i>
                      }
                    </span>
                  </div>
                </div>
                {errors.confirm_password && <p className='text-warning mt-1'>{(errors.confirm_password as FieldError).message}</p>}

              </div>

              <div className='mt-3 pb-md-3'>
                <button className="btn btn-warning w-100 mt-4">Save</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>




    </>
  )
}

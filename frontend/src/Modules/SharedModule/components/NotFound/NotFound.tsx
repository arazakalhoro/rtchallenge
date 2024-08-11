import React from 'react'
import notfoundImg from "../../../../assets/images/not.svg";
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
    <section className='bg-body-secondar'>
      <div className="container notfound-container">
        <div className="row bg-danger-subtl vh-100 flex-column justify-content-center gap-5 flex-lg-row gap-lg-0 align-items-md-center">

          <div className="col-md-10 col-lg-5 bg-warnin">
            <div className='bg-dange ps-lg-5'>

              <div className='bg-blac d-flex w-fi flex-column align-items-center align-items-lg-start gap-2 ps-lg-5'>
                <h1 className='bg-inf fw-bold m-0'>Oops!</h1>
                <h2 className='bg-inf fw-bold'>Page Not Found!</h2>
                <p className='mb-4 bg-inf'>This Page doesn’t exist or was removed! We suggest you back to home.</p>
                <Link to='/' className="btn btn-success rounded-3 px-5 py-2 mt-1 d-flex align-items-center">
                  <i className="fa-solid fa-arrow-left me-3"></i>
                  <span>Home</span>
                </Link>
              </div>

            </div>
          </div>

          <div className="col-md-10 col-lg-6 bg-inf">
            <div className='bg-inf d-flex justify-content-center justify-content-lg-star mt-4 mt-lg-'>
              <img src={notfoundImg} className='notfound-img bg-success-subtl' alt="" />
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}

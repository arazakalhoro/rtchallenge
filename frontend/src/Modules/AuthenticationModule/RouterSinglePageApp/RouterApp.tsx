import {Route, Routes, useLocation} from 'react-router-dom'
import AuthLayout from '../../SharedModule/components/AuthLayout/AuthLayout'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import ForgetPass from '../components/ForgetPass/ForgetPass'
import ProtectedRoute from '../../SharedModule/components/ProtectedRoute/ProtectedRoute'
import MasterLayout from '../../SharedModule/components/MasterLayout/MasterLayout'
import Dashboard from '../../DashboardModule/components/Dashboard/Dashboard'
import ResetPass from '../components/ResetPass/ResetPass'
import UserProfile from "../../UsersModule/components/UserProfile/UserProfile.tsx";
import NotFound from "../../SharedModule/components/NotFound/NotFound.tsx";

export default function RouterApp() {
    const location = useLocation()
    return (

        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AuthLayout/>}>
                    <Route
                        path=""
                        element={<Login/>}
                    />
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="forgot-password" element={<ForgetPass/>}/>
                    <Route path="reset-password/:token" element={<ResetPass/>}/>
                </Route>
                <Route path="DashBoard" element={
                    <ProtectedRoute>
                        <MasterLayout/>
                    </ProtectedRoute>}>
                    <Route
                        path=""
                        element={<Dashboard/>}
                    />
                    {/*<Route path="tasks" element={<TasksList/>}/>*/}
                    <Route path="profile" element={<UserProfile/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>

    )
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserProvider, UserContext } from "./UserProvider";
import Home from "./pages/Home";
import Logout from "./Logout";
import About from "./pages/About";
import CarAuction from "./pages/CarAuction";
import ContectUs from "./pages/ContectUs";
import CarOverview from "./pages/CarOverview";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import NormalCarPage from "./pages/NormalCarPage";
import AuctionCarPage from "./pages/AuctionCarPage";
import CarUpload from "./pages/CarUpload";
import Login from "./pages/Auth/Login";
import UploadCar from "./pages/Auth/UploadCar";
import Signup from "./pages/Auth/Signup";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import ResetPssword from "./pages/Auth/ResetPssword";
import Otp from "./pages/Auth/Otp";
import AdminUser from "./pages/admin/AdminUser";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminCar from "./pages/admin/AdminCar";
import AdminMessage from "./pages/admin/AdminMessage";
import Payment from "./pages/pyment";

function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useContext(UserContext);

    if (loading) return <div>Loading...</div>;

    return isLoggedIn ? children : <Navigate to="/Login" replace />;
}

function AdminRoute({ children }) {
    const { isLoggedIn, user, loading } = useContext(UserContext);

    if (loading) return <div>Loading...</div>;

    if (!isLoggedIn) return <Navigate to="/Login" replace />;

    return user?.role === "admin" ? children : <Navigate to="/" replace />;
}

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/CarAuction" element={<CarAuction />} />
                    <Route path="/ContectUs" element={<ContectUs />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/UploadCar" element={<UploadCar />} />
                    <Route path="/ForgetPassword" element={<ForgetPassword />} />
                    <Route path="/ResetPssword" element={<ResetPssword />} />
                    <Route path="/UpdatePassword" element={<UpdatePassword />} />
                    <Route path="/Otp" element={<Otp />} />
                    <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/logout" element={<Logout />} />


                    <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    {/* <Route path="/CarFind" element={<ProtectedRoute><CarFind /></ProtectedRoute>} /> */}
                    <Route path="/CarUpload" element={<ProtectedRoute><CarUpload /></ProtectedRoute>} />
                    <Route path="/CarOverview" element={<ProtectedRoute><CarOverview /></ProtectedRoute>} />
                    <Route path="/normal-cars" element={<ProtectedRoute><NormalCarPage /></ProtectedRoute>} />
                    <Route path="/auction-cars" element={<ProtectedRoute><AuctionCarPage /></ProtectedRoute>} />

                    {/* Admin Routes (Only Admins Can Access) */}
                    <Route path="/AdminUser" element={<AdminRoute><AdminUser /></AdminRoute>} />
                    <Route path="/AdminCar" element={<AdminRoute><AdminCar /></AdminRoute>} />
                    <Route path="/AdminOverview" element={<AdminRoute><AdminOverview /></AdminRoute>} />
                    <Route path="/AdminMessage" element={<AdminRoute><AdminMessage /></AdminRoute>} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;

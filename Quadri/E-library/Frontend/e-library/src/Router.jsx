import { Routes, Route } from "react-router";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Component/Dashboard/Dashboard";
import LibraryPage from "./Pages/LibraryPage";
import ShelfPage from "./Pages/ShelfPage";
import RequestPage from "./Pages/RequestPage";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute"

const Router = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
          
          
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<LibraryPage />} />
          <Route path="shelf" element={<ShelfPage />} />
          <Route path="request-book" element={<RequestPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;

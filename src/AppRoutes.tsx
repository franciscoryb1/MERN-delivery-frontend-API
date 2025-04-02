import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth-callback" element={<AuthCallbackPage />} />

            <Route path="/search/:city" element={
                <Layout showHero={false}>
                    <SearchPage />
                </Layout>}
            />

            <Route path="/detail/:restaurantId" element={
                <Layout showHero={false}>
                    <DetailPage />
                </Layout>}
            />

            <Route path="/" element={
                <Layout showHero={true}>
                    <HomePage />
                </Layout>}
            />

            {/* Ruta protegida: user-profile solo se muestra si el usuario esta loggeado */}
            <Route element={<ProtectedRoute />}>
                {/* UserProfilePage */}
                <Route
                    path="/user-profile"
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>}
                />
                {/* ManageRestaurantPage */}
                <Route
                    path="/manage-restaurant"
                    element={
                        <Layout>
                            <ManageRestaurantPage />
                        </Layout>}
                />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes;
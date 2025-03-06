import { Home } from "./home/Home";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import AuthGuard from "./auth/security/AuthGuard";
import Profil from "./profil/Profil";
import HomeGuard from "./auth/security/HomeGuard";
import Feed from "./posts/Feed";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import AddPost from "./posts/components/AddPost";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import PostView from "./posts/components/PostView";
import Notifications from "./notifications/Notifications";
import withNotifications from "./notifications/hoc/withNotifications";
import SearchPage from "./search/pages/SearchPage";

const AuthenticatedComponent = withNotifications(
  ({ Component, ...props }: { Component: React.ComponentType<any> }) => {
    return <Component {...props} />;
  }
);

export const Router = () => {
  const isConnected = useSelector((state: RootState) => state.auth.token);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden md:h-[calc(100vh-64px)] h-[calc(100vh-120px)]">
          {isConnected && (
            <div className="hidden md:block w-64 flex-shrink-0">
              <Navbar />
            </div>
          )}
          <div className="flex-1 overflow-y-auto md:h-[calc(100vh-64px)] h-[calc(100vh-120px)]">
            <Routes>
              <Route
                path="/"
                element={
                  <HomeGuard
                    AuthComponent={(props) => (
                      <AuthenticatedComponent Component={Feed} {...props} />
                    )}
                    NonAuthComponent={Home}
                  />
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/profile/:id"
                element={
                  <AuthGuard
                    Component={(props) => <AuthenticatedComponent Component={Profil} {...props} />}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthGuard
                    Component={(props) => <AuthenticatedComponent Component={Profil} {...props} />}
                  />
                }
              />
              <Route
                path="/notifications"
                element={
                  <AuthGuard
                    Component={(props) => (
                      <AuthenticatedComponent Component={Notifications} {...props} />
                    )}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <AuthGuard
                    Component={(props) => (
                      <AuthenticatedComponent Component={SearchPage} {...props} />
                    )}
                  />
                }
              />
              <Route
                path="/feed/new-post"
                element={
                  <AuthGuard
                    Component={(props) => <AuthenticatedComponent Component={AddPost} {...props} />}
                  />
                }
              />
              <Route
                path="/feed/edit-post/:id"
                element={
                  <AuthGuard
                    Component={(props) => (
                      <AuthenticatedComponent Component={AddPost} edit={true} {...props} />
                    )}
                  />
                }
              />
              <Route
                path="/feed/:id"
                element={
                  <AuthGuard
                    Component={(props) => (
                      <AuthenticatedComponent Component={PostView} {...props} />
                    )}
                  />
                }
              />
            </Routes>
          </div>
        </div>
        {isConnected && (
          <div className="md:hidden">
            <Navbar />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

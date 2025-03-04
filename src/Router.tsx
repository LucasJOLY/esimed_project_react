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

export const Router = () => {
  const isConnected = useSelector((state: RootState) => state.auth.token);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          {isConnected && (
            <div className="hidden md:block w-64 flex-shrink-0">
              <Navbar />
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <HomeGuard AuthComponent={Feed} NonAuthComponent={Home} />
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/profile/:id"
                element={<AuthGuard Component={Profil} />}
              />
              <Route
                path="/profile"
                element={<AuthGuard Component={Profil} />}
              />
              <Route
                path="/notifications"
                element={
                  <AuthGuard Component={() => <div>Notifications</div>} />
                }
              />
              <Route
                path="/messages"
                element={<AuthGuard Component={() => <div>Messages</div>} />}
              />
              <Route
                path="/feed/new-post"
                element={<AuthGuard Component={() => <AddPost />} />}
              />
              <Route
                path="/feed/edit-post/:id"
                element={
                  <AuthGuard Component={() => <AddPost edit={true} />} />
                }
              />
              <Route
                path="/feed/:id"
                element={<AuthGuard Component={() => <PostView />} />}
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

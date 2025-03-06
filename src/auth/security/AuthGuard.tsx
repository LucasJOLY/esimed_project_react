import { useEffect, ComponentType } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { getMe } from "../store/slice";
import { RootState, AppDispatch } from "../../app/store";

interface DecodedToken {
  sub: string;
}

const AuthGuard = ({ Component }: { Component: ComponentType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId: number = Number(decodedToken?.sub);
        if (!userId) {
          navigate("/login");
          return;
        }

        if (!user) {
          try {
            const response = await dispatch(getMe(userId));
            if (!response) {
              navigate("/login");
            }
          } catch {
            navigate("/login");
          }
        }
      } catch (error) {
        navigate("/login");
      }
    };

    verifyAuth();
  }, [token, user]);

  return user ? <Component /> : null;
};

export default AuthGuard;

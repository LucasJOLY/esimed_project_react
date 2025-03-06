import { ComponentType, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { jwtDecode } from "jwt-decode";
import { getMe } from "../store/slice";

interface HomeGuardProps {
  AuthComponent: ComponentType;
  NonAuthComponent: ComponentType;
}

interface DecodedToken {
  sub: string;
}

const HomeGuard = ({ AuthComponent, NonAuthComponent }: HomeGuardProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId: number = Number(decodedToken?.sub);

        if (!userId) {
          setLoading(false);
          return;
        }

        if (!user) {
          try {
            const response = await dispatch(getMe(userId));
            if (!response) {
              setLoading(false);
              return;
            }
          } catch {
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        setLoading(false);
        return;
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token, user, dispatch]);

  if (loading) return null;
  return user ? <AuthComponent /> : <NonAuthComponent />;
};

export default HomeGuard;

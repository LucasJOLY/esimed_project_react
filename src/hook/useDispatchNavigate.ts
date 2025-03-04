import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "../app/store";

const useDispatchNavigate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const dispatchNavigate = async (action: any, route: string) => {
    try {
      const result = await dispatch(action);

      if (
        (!result.meta && result) ||
        result.meta?.requestStatus === "fulfilled"
      ) {
        if (route) {
          navigate(route);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return dispatchNavigate;
};

export default useDispatchNavigate;

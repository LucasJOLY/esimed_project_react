import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const useDispatchNavigate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dispatchNavigate = async (action: any, route: string) => {
    try {
      await dispatch(action);
      if (route) navigate(route);
    } catch (error) {
      console.log(error);
    }
  };

  return dispatchNavigate;
};

export default useDispatchNavigate;

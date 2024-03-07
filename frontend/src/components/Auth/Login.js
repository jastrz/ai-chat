import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import AuthHeader from "./AuthHeader";
import { postLogin } from "api/authApi";
import { useDispatch } from "react-redux";
import { setUserData } from "store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const loginFormValues = getValues();
      const { username, password } = loginFormValues;
      const response = await postLogin(username, password);
      dispatch(setUserData(response));
      navigate("/chat");

      // Handle the response data as needed, e.g., store in state, redirect, etc.
    } catch (error) {
      console.error("Error occurred during login: ", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg content-center">
          <AuthHeader title="Login" nextTitle="Sign In >" nextRoute="/signin" />
          <form>
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                type="text"
                id="username"
                {...register("username")}
                placeholder="Enter your username"
                autoComplete="username"
              />

              <Input
                label="Password"
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              <Button onClick={onLogin}>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

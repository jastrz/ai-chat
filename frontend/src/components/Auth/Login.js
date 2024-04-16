import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import AuthHeader from "./AuthHeader";
import { postLogin } from "api/authApi";
import { useDispatch } from "react-redux";
import { setUserData } from "store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { register, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const loginFormValues = getValues();
      const { username, password } = loginFormValues;
      const data = await postLogin(username, password);
      dispatch(setUserData(data));
      localStorage.setItem("userToken", data.token);
      navigate("/chat");
    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error("Error occurred during login: ", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="p-8 bg-white rounded-lg shadow-lg content-center">
          <AuthHeader title="Login" nextTitle="Sign In >" nextRoute="/signin" />
          <form onSubmit={onLogin}>
            <div className="flex flex-col gap-4 w-80">
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

              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

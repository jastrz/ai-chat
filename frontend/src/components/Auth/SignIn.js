import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import React from "react";
import AuthHeader from "./AuthHeader";
import { postSignIn } from "api/authApi";
import { useDispatch } from "react-redux";
import { setUserData } from "store/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { register, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignIn = async () => {
    try {
      const { username, password, repeatPassword } = getValues();
      if (password !== repeatPassword) {
        throw new Error("Passwords do not match.");
      }
      const data = await postSignIn(username, password, repeatPassword);
      dispatch(setUserData(data));
      navigate("/chat");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg content-center">
          <AuthHeader title="Sign In" nextTitle="Login >" nextRoute="/login" />
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
                autoComplete="new-password"
              />

              <Input
                label="Repeat password"
                type="password"
                id="repeatPassword"
                {...register("repeatPassword")}
                placeholder="Repeat password"
                autoComplete="new-password"
              />

              <Button onClick={onSignIn}>Sign In</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

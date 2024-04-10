import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import api from "./api/axiosConfig";

const LoadingIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.interceptors.request.use((config) => {
      setIsLoading(true);
      return config;
    });

    api.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        return Promise.reject(error);
      }
    );
  });

  return (
    isLoading && (
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        style={{ zIndex: "99999" }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Oval
            visible={true}
            height="30"
            width="30"
            color="red"
            secondaryColor="red"
            ariaLabel="oval-loading"
          />
        </div>
      </div>
    )
  );
};

export default LoadingIndicator;

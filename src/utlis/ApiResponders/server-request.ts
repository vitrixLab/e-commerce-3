import axios, { type AxiosRequestConfig } from "axios";

type ServerRequestConfig = AxiosRequestConfig & {
  authorization?: boolean;
  config?: Record<string, unknown>;
};

const serverRequest = async (configuration: ServerRequestConfig) => {
  const { authorization, config, ...restConfiguration } = configuration;

  const defaultHeader: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return await axios({
    ...restConfiguration,
    headers: defaultHeader,
  })
    .then(async (resp) => {
      if ((resp?.data as { errors?: unknown[] })?.errors) {
        const errors = (resp.data as { errors: { message?: string }[] }).errors;
        throw new Error(errors[0]?.message);
      }
      return resp?.data?.data;
    })
    .catch(async (err) => {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err?.message;
      throw new Error(message);
    });
};

export default serverRequest;

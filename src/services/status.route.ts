import vars from "../config/vars";
import axios, { AxiosError } from "axios";
import { ApiHealth, ApiHealtResponse } from "../models";

const { BASE_URL, names: API_NAMES, statusEndpoint } = vars;

const fetchStatus = async (name: string): Promise<ApiHealtResponse> => {
  try {
    const res = await axios.get<ApiHealth>(
      `${BASE_URL}/${name}/${statusEndpoint}`
    );
    return { ...res.data, name };
  } catch (e) {
    return {
      name,
      success: false,
      hostname: "",
      message: (e as AxiosError).message,
      time: 0,
    };
  }
};

const getAllStatus = async () => {
  const data = await Promise.allSettled(API_NAMES.map(fetchStatus));
  //To get values from promises
  return (data as PromiseFulfilledResult<ApiHealtResponse>[]).map(
    (r) => r.value
  );
};

export default getAllStatus;

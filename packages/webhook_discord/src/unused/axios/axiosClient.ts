import axios from "axios";

const instance = axios.create();

instance.defaults.headers.common.Accept = "*/*";

export const axiosClient = instance;

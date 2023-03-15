import { axiosClient } from "../axios/axiosClient";
import VercelReq from "./vercelRequest";
import * as dotenv from "dotenv";
dotenv.config();

export const vercelReq = new VercelReq({
  initBaseUrl: process.env.PETBOOK_VERCEL_URL as string,
  commonUri: process.env.PETBOOK_VERCEL_URL as string,
  client: axiosClient,
});

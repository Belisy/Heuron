import axios from "axios";

const PICSUM_URL = "https://picsum.photos/v2";
const limit = 6;

export const getPicsumList = async (page: number) => {
  const res = await axios.get(`${PICSUM_URL}/list?page=${page}&limit=${limit}`);
  return res.data;
};

import axios from "axios";

const PICSUM_URL = "https://picsum.photos/v2";

export const getPicsumList = async (page: number) => {
  const res = await axios.get(`${PICSUM_URL}/list?page=${page}`);
  return res.data;
};

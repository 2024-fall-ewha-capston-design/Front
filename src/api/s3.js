import { client } from "./api";

//이미지 업로드
export const postImage = async (fileName) => {
  try {
    const response = await client.post(`/file`, { fileName });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

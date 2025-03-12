import { client } from "./api";

//키워드 변경
export const putKeyword = async (
  chatRoomId,
  positiveKeywords,
  negativeKeywords
) => {
  try {
    const response = await client.put(`/chatRooms/${chatRoomId}/settings`, {
      positiveKeywords,
      negativeKeywords,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

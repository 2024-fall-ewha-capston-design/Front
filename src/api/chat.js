import { client } from "./api";

//채팅방 연결(구독)
export const postChat = async (roomId) => {
  try {
    const response = await client.post(`/topic/public/${roomId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

//메세지 전송
export const postMessage = async (roomId) => {
  try {
    const response = await client.post(`/topic/public/${roomId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

//채팅 내역 조회
export const getChat = async (chatRoomId) => {
  try {
    const response = await client.get(`/chats/${chatRoomId}/messages`);
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

import { client } from "./api";

//채팅방 신규 입장-실명 채팅방
export const postNamedChat = async (chatRoomId, isOwner) => {
  try {
    const response = await client.post(
      `/chatRooms/${chatRoomId}/participants/real`,
      { isOwner }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

//채팅방 신규 입장-익명 채팅방
export const postAnonyChat = async (
  chatRoomId,
  isOwner,
  roomNickname,
  participantImgUrl
) => {
  try {
    const response = await client.post(
      `/chatRooms/${chatRoomId}/participants/anonymous`,
      { isOwner, roomNickname, participantImgUrl }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

//참여중인 채팅방 목록 조회
export const getChatList = async () => {
  try {
    const response = await client.get(`/chatRooms/my`);
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

//채팅방 탈퇴
export const deleteChat = async (chatRoomId) => {
  try {
    const response = await client.delete(
      `/chatRooms/${chatRoomId}/participants/me`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

//채팅방 생성
export const postChat = async (
  roomName,
  isSecretChatRoom,
  password,
  isAnonymousChatRoom,
  chatRoomImgUrl
) => {
  try {
    const response = await client.post(`/chatRooms`, {
      roomName,
      isSecretChatRoom,
      password,
      isAnonymousChatRoom,
      chatRoomImgUrl,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

//방장 변경
export const putManager = async (chatRoomId, newOwnerId) => {
  try {
    const response = await client.put(`/chatRooms/${chatRoomId}/owner`, {
      newOwnerId,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

//채팅방 이름으로 조회
export const getSearchChatName = async (roomName) => {
  try {
    const response = await client.get(`/chatRooms?roomName=${roomName}`);
    return response;
  } catch (err) {
    throw err;
  }
};

//채팅방 코드로 조회
export const getSearchChatCode = async (code) => {
  try {
    const response = await client.get(`/chatRooms/${code}`);
    return response;
  } catch (err) {
    throw err;
  }
};

//채팅방 상세내용 조회
export const getChatDetails = async (chatRoomId) => {
  try {
    const response = await client.get(`/chatRooms/${chatRoomId}/info`);
    return response;
  } catch (err) {
    throw err;
  }
};

//방장권한 채팅방 삭제
export const deleteChatRoom = async (chatRoomId) => {
  try {
    const response = await client.delete(`/chatRooms/${chatRoomId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

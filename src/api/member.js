import { client } from "./api";

//멤버정보 조회
export const getMemberInfo = async () => {
  try {
    const response = await client.get(`/members/my`);
    return response;
  } catch (err) {
    throw err;
  }
};

//멤버정보 수정
export const putMemberInfo = async (nickname, profileImgUrl) => {
  try {
    const response = await client.put(`/members/profile`, {
      nickname,
      profileImgUrl,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

//익명 프로필 목록 조회
export const getAnonyProfile = async () => {
  try {
    const response = await client.get(`/members/my/anonymous-profile`);
    return response;
  } catch (err) {
    throw err;
  }
};

//익명 프로필 개별 조회
export const getOneAnonyProfile = async (participantId) => {
  try {
    const response = await client.get(`/participants/${participantId}`);
    return response;
  } catch (err) {
    throw err;
  }
};
//익명 프로필 수정
export const putAnonyProfile = async (
  participantId,
  nickname,
  profileImgUrl
) => {
  try {
    const response = await client.put(
      `/participants/${participantId}/anonymous`,
      { nickname, profileImgUrl }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

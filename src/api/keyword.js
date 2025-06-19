import { client } from "./api";

//긍정 키워드 수정(추가)
export const postPositiveKeyword = async (participantId, keywordPositive) => {
  try {
    const response = await client.post(
      `/participants/${participantId}/positive-keywords`,
      { keyword: keywordPositive }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

//부정 키워드 수정(추가)
export const postNegativeKeyword = async (
  participantId,
  keywordNegative,
  penaltyScore
) => {
  try {
    const response = await client.post(
      `/participants/${participantId}/negative-keywords`,
      { keyword: keywordNegative, penaltyScore: penaltyScore }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

//긍정 키워드 목록 조회
export const getPositiveKeyword = async (participantId) => {
  try {
    const response = await client.get(
      `/participants/${participantId}/positive-keywords`
    );
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

//부정 키워드 목록 조회
export const getNegativeKeyword = async (participantId) => {
  try {
    const response = await client.get(
      `/participants/${participantId}/negative-keywords`
    );
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

//긍정 키워드 삭제
export const deletePositiveKeyword = async (participantId, keywordId) => {
  try {
    const response = await client.delete(
      `/participants/${participantId}/positive-keywords/${keywordId}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

//부부정 키워드 삭제
export const deleteNegativeKeyword = async (participantId, keywordId) => {
  try {
    const response = await client.delete(
      `/participants/${participantId}/negative-keywords/${keywordId}`
    );
    return response;
  } catch (err) {
    throw err;
  }
};

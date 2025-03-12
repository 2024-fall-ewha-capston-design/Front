import styled from "styled-components";
import { useState } from "react";
import TopBarCommon from "../../components/common/TopBarCommon";
import { putKeyword } from "../../api/keyword";
import { ReactComponent as Enter } from "../../assets/chat/enter.svg";

const KeywordSettings = () => {
  const [likeKeywords, setLikeKeywords] = useState([
    "좋아요",
    "취업",
    "동아리",
    "노트북",
    "이화여대",
  ]);
  const [dislikeKeywords, setDislikeKeywords] = useState([
    "싫어요",
    "수강",
    "프론트엔드",
    "수강신청",
    "케이묵",
  ]);
  const chatRoomId = 1;
  const removeKeyword = (keyword, type) => {
    if (type === "like") {
      setLikeKeywords(likeKeywords.filter((item) => item !== keyword));
    } else {
      setDislikeKeywords(dislikeKeywords.filter((item) => item !== keyword));
    }
  };

  //키웓 변경 API 연결
  const updateKeyword = async () => {
    try {
      const response = await putKeyword(
        chatRoomId,
        likeKeywords,
        dislikeKeywords
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Layout>
      <TopBarCommon />
      <SectionTitle>스타트 2024-2</SectionTitle>
      <KeywordSection>
        <KeywordLabel>좋아요 키워드 (최대 5개)</KeywordLabel>
        <InputContainer>
          <KeywordTextarea placeholder="키워드는 최대 5글자" /> <EnterIcon />
        </InputContainer>
        <KeywordBox>
          {likeKeywords.map((keyword, index) => (
            <Keyword key={index}>
              {keyword}{" "}
              <RemoveButton onClick={() => removeKeyword(keyword, "like")}>
                ×
              </RemoveButton>
            </Keyword>
          ))}
        </KeywordBox>
      </KeywordSection>
      <KeywordSection>
        <KeywordLabel>싫어요 키워드 (최대 5개)</KeywordLabel>
        <InputContainer>
          <KeywordTextarea placeholder="키워드는 최대 5글자" />
          <EnterIcon />
        </InputContainer>
        <KeywordBox>
          {dislikeKeywords.map((keyword, index) => (
            <Keyword key={index}>
              {keyword}{" "}
              <RemoveButton onClick={() => removeKeyword(keyword, "dislike")}>
                ×
              </RemoveButton>
            </Keyword>
          ))}
        </KeywordBox>
      </KeywordSection>
    </Layout>
  );
};

export default KeywordSettings;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  height: 100vh;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin-top: 34px;
  font-size: 18px;
  font-weight: bold;
`;

const KeywordSection = styled.div`
  width: 320px;
  background-color: white;
  border-radius: 10px;
  padding: 0px 14px 16px 16px;
  margin-top: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;
const KeywordTextarea = styled.textarea`
  margin-bottom: 10px;
  width: 300px;
  height: 20px;
  border: none;
  border-bottom: 1px solid var(--black);
  resize: none;
  outline: none;
`;
const EnterIcon = styled(Enter)`
  postion: absolute;
  right: 10px;
  bottom: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const KeywordLabel = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const KeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Keyword = styled.span`
  display: flex;
  align-items: center;
  background-color: #e9dcff;
  color: #7b61ff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  color: #7b61ff;
  margin-left: 5px;
  cursor: pointer;
`;

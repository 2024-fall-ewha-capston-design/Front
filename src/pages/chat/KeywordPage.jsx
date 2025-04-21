import styled from "styled-components";
import { useState, useEffect } from "react";
import TopBarCommon from "../../components/common/TopBarCommon";
import {
  postNegativeKeyword,
  postPositiveKeyword,
  getNegativeKeyword,
  getPositiveKeyword,
  deleteNegativeKeyword,
  deletePositiveKeyword,
} from "../../api/keyword";
import { getMemberInfo } from "../../api/member";
import { ReactComponent as Enter } from "../../assets/chat/enter.svg";
import { ReactComponent as X } from "../../assets/common/x_blue.svg";
import { useLocation } from "react-router-dom";
const KeywordSettings = () => {
  const location = useLocation();
  const roomId = location.state?.roomId;
  const roomName = location.state?.roomName;
  const participantId = location.state?.participantId;
  const [keywordPositive, setKeywordPositive] = useState("");
  const [keywordNegative, setKeywordNegative] = useState("");
  const [likeKeywords, setLikeKeywords] = useState([]);
  const [dislikeKeywords, setDislikeKeywords] = useState([]);

  const removeKeyword = async (keywordId, type) => {
    try {
      if (type === "like") {
        await deletePositiveKeyword(participantId, keywordId);
        setLikeKeywords(
          likeKeywords.filter((item) => item.keywordId !== keywordId)
        );
      } else {
        await deleteNegativeKeyword(participantId, keywordId);
        setDislikeKeywords(
          dislikeKeywords.filter((item) => item.keywordId !== keywordId)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  //긍정 키워드 조회 API 연결
  const readPositiveKeyword = async () => {
    try {
      const response = await getPositiveKeyword(participantId);
      setLikeKeywords(
        response.data.map((item) => ({
          keywordId: item.keywordId,
          keyword: item.content,
        }))
      );
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  //부정 키워드 조회 API 연결
  const readNegativeKeyword = async () => {
    try {
      const response = await getNegativeKeyword(participantId);
      setDislikeKeywords(
        response.data.map((item) => ({
          keywordId: item.keywordId,
          keyword: item.content,
        }))
      );
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (participantId) {
      readPositiveKeyword();
      readNegativeKeyword();
    }
  }, [participantId]);
  //긍정 키워드 등록 API 연결
  const createPositiveKeyword = async () => {
    try {
      if (keywordPositive.length > 0 && likeKeywords.length < 5) {
        const response = await postPositiveKeyword(
          participantId,
          keywordPositive
        );
        setLikeKeywords([
          ...likeKeywords,
          {
            keywordId: response.data.keywordId,
            keyword: keywordPositive,
          },
        ]);
        setKeywordPositive("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //부정 키워드 등록 API 연결
  const createNegativeKeyword = async () => {
    try {
      if (keywordNegative.length > 0 && dislikeKeywords.length < 5) {
        const response = await postNegativeKeyword(
          participantId,
          keywordNegative
        );
        setDislikeKeywords([
          ...dislikeKeywords,
          { keywordId: response.data.keywordId, keyword: keywordNegative },
        ]);
        setKeywordNegative("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Enter키로 등록 처리
  const handleEnterKey = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "like") {
        createPositiveKeyword();
      } else {
        createNegativeKeyword();
      }
    }
  };

  return (
    <Layout>
      <TopBarCommon text="키워드 관리" />
      <SectionTitle>{roomName}</SectionTitle>
      <KeywordSection>
        <KeywordLabel>좋아요 키워드 (최대 5개)</KeywordLabel>
        <InputContainer>
          <KeywordTextarea
            value={keywordPositive}
            onChange={(e) => setKeywordPositive(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, "like")}
            placeholder="키워드는 최대 5글자"
          />
          <EnterIcon onClick={createPositiveKeyword} />
        </InputContainer>
        <KeywordBox>
          {likeKeywords.map((item) => (
            <Keyword key={item.keywordId}>
              {item.keyword}
              <X onClick={() => removeKeyword(item.keywordId, "like")}></X>
            </Keyword>
          ))}
        </KeywordBox>
      </KeywordSection>
      <KeywordSection>
        <KeywordLabel>싫어요 키워드 (최대 5개)</KeywordLabel>
        <InputContainer>
          <KeywordTextarea
            value={keywordNegative}
            onChange={(e) => setKeywordNegative(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, "dislike")}
            placeholder="키워드는 최대 5글자"
          />
          <EnterIcon onClick={createNegativeKeyword} />
        </InputContainer>
        <KeywordBox>
          {dislikeKeywords.map((item) => (
            <Keyword key={item.keywordId}>
              {item.keyword}
              <X onClick={() => removeKeyword(item.keywordId, "dislike")}></X>
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
  height: 100vh;
  padding: 20px;
`;

const SectionTitle = styled.div`
  margin-top: 30px;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const KeywordSection = styled.div`
  width: 315px;
  background-color: white;
  border-radius: 10px;
  padding: 0px 14px 16px 16px;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const KeywordTextarea = styled.textarea`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 7px;
  border-radius: 8px;
  width: 270px;
  height: 20px;
  border: none;
  background-color: var(--gray-100);
  resize: none;
`;
const EnterIcon = styled(Enter)`
  cursor: pointer;
`;
const EnterBtn = styled.div`
  background-color: var(--red-pri);
  padding: 7px;
  border-radius: 8px;
`;
const EnterText = styled.div`
  font-size: 15px;
  color: var(--white);
`;
const KeywordLabel = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const KeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Keyword = styled.span`
  display: flex;
  align-items: center;
  color: var(--red-pri);
  border: 1px solid var(--red-pri);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  gap: 7px;
`;

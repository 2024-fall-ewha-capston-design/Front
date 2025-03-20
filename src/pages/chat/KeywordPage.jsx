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
import { useLocation } from "react-router-dom";
const KeywordSettings = () => {
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [participantId, setParticipantId] = useState("");
  const [keywordPositive, setKeywordPositive] = useState("");
  const [keywordNegative, setKeywordNegative] = useState("");
  const [likeKeywords, setLikeKeywords] = useState([]);
  const [dislikeKeywords, setDislikeKeywords] = useState([]);

  //사용자 프로필 조회 API 연결
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo();
        const id = response.data.memberId;
        setParticipantId(id);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMemberInfo();
  }, []); // 처음 한 번 실행

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
      <TopBarCommon />
      <SectionTitle>스타트 2024-2</SectionTitle>
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
              <RemoveButton
                onClick={() => removeKeyword(item.keywordId, "like")}
              >
                ×
              </RemoveButton>
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
              <RemoveButton
                onClick={() => removeKeyword(item.keywordId, "dislike")}
              >
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

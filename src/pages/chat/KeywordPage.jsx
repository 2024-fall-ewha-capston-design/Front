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
  const [keywordNegative1, setKeywordNegative1] = useState("");
  const [keywordNegative2, setKeywordNegative2] = useState("");
  const [keywordNegative3, setKeywordNegative3] = useState("");
  const [keywordNegative, setKeywordNegative] = useState("");
  const [likeKeywords, setLikeKeywords] = useState([]);
  const [dislikeKeywords, setDislikeKeywords] = useState([]);
  const [penaltyScore, setPenaltyScore] = useState(1);

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
          penaltyScore: item.penaltyScore,
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
  const createNegativeKeyword = async (penaltyScore) => {
    try {
      const keyword =
        penaltyScore === 1
          ? keywordNegative1
          : penaltyScore === 2
          ? keywordNegative2
          : keywordNegative3;

      if (keyword.length > 0 && dislikeKeywords.length < 5) {
        const response = await postNegativeKeyword(
          participantId,
          keyword,
          penaltyScore
        );
        setDislikeKeywords([
          ...dislikeKeywords,
          {
            keywordId: response.data.keywordId,
            keyword: keyword,
            penaltyScore: penaltyScore,
          },
        ]);

        // 등록 후 해당 텍스트박스 초기화
        if (penaltyScore === 1) setKeywordNegative1("");
        else if (penaltyScore === 2) setKeywordNegative2("");
        else setKeywordNegative3("");
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
        <SubLabel>
          * 벌점에 가중치를 매길 수 있습니다. 3점, 2점, 1점에 해당하는 키워드를
          등록해주세요
        </SubLabel>

        <InputContainer>
          <KeywordTextarea
            value={keywordNegative1}
            onChange={(e) => setKeywordNegative1(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createNegativeKeyword(1)}
            placeholder="1점 키워드 입력"
          />
          <EnterIcon onClick={() => createNegativeKeyword(1)} />
        </InputContainer>

        <InputContainer>
          <KeywordTextarea
            value={keywordNegative2}
            onChange={(e) => setKeywordNegative2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createNegativeKeyword(2)}
            placeholder="2점 키워드 입력"
          />
          <EnterIcon onClick={() => createNegativeKeyword(2)} />
        </InputContainer>

        <InputContainer>
          <KeywordTextarea
            value={keywordNegative3}
            onChange={(e) => setKeywordNegative3(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createNegativeKeyword(3)}
            placeholder="3점 키워드 입력"
          />
          <EnterIcon onClick={() => createNegativeKeyword(3)} />
        </InputContainer>

        <KeywordBox>
          {dislikeKeywords.map((item) => (
            <Keyword key={item.keywordId}>
              {item.keyword} ({item.penaltyScore}점)
              <X onClick={() => removeKeyword(item.keywordId, "dislike")} />
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
  width: 340px;
  padding: 0px 14px 16px 14px;
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
  border: none;
  border-bottom: 1px solid var(--gray-300);
  width: 300px;
  height: 20px;
  resize: none;
  &::placeholder {
    color: var(--gray-300);
    font-size: 13px;
  }
`;
const EnterIcon = styled(Enter)`
  cursor: pointer;
`;
const KeywordLabel = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
  margin-left: 5px;
`;
const SubLabel = styled.div`
  font-size: 12px;
  color: var(--gray-300);
  margin-left: 4px;
  margin-bottom: 8px;
`;
const KeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const Keyword = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--red-pri);
  border: 1px solid var(--red-pri);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.4;
  gap: 7px;
`;

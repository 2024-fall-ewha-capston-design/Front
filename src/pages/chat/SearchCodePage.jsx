import styled from "styled-components";
import TopBarCommon from "../../components/common/TopBarCommon";
import { ReactComponent as SearchIcon } from "../../assets/common/search.svg";
import { useEffect, useState } from "react";
import { getSearchChatCode, postAnonyChat } from "../../api/chatroom";
const SearchCodePage = () => {
  const [code, setCode] = useState("");
  const [count, setCount] = useState("");
  const [roomName, setRoomName] = useState("");
  const [image, setImage] = useState("");
  const [roomId, setRoomId] = useState("");
  //코드로 채팅방 조회 API 연결
  const readSearchChatCode = async () => {
    try {
      const response = await getSearchChatCode(code);
      setRoomName(response.data.roomName);
      setImage(response.data.chatRoomImgUrl);
      setCount(response.data.participantCount);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Layout>
      <TopBarCommon text="코드로 채팅방 찾기" />

      <SearchContainer>
        <SearchInput
          placeholder="코드를 입력하세요"
          onChange={(e) => setCode(e.target.value)}
        />
        <SearchButton onClick={readSearchChatCode}>
          <SearchIcon />
        </SearchButton>
      </SearchContainer>

      {roomName && (
        <ChatRoomCard>
          <ChatRoomImage
            src="https://source.unsplash.com/100x100/?flowers"
            alt="채팅방 이미지"
          />
          <ChatRoomTitle>{roomName}</ChatRoomTitle>
          <ChatRoomInfo>{count}명 참여중</ChatRoomInfo>
          <JoinButton>참여하기</JoinButton>
        </ChatRoomCard>
      )}
    </Layout>
  );
};

export default SearchCodePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--purple-sec);
  height: 100vh;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 130px;
`;

const SearchInput = styled.input`
  width: 126px;
  height: 25px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 10px;
  margin-right: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const SearchButton = styled.button`
  width: 45px;
  height: 45px;
  background: none;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatRoomCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  width: 80%;
  margin-top: 20px;
  text-align: center;
  background-color: var(--purple-sec);
`;

const ChatRoomImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 16px;
  object-fit: cover;
`;

const ChatRoomTitle = styled.h2`
  font-size: 18px;
  margin-top: 10px;
`;

const ChatRoomInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const JoinButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #bbb;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
`;

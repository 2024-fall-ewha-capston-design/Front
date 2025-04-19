import styled from "styled-components";
import TopBarCommon from "../../components/common/TopBarCommon";
import { ReactComponent as SearchIcon } from "../../assets/common/search.svg";
import { useEffect, useState } from "react";
import {
  getSearchChatCode,
  postAnonyChat,
  postNamedChat,
  getChatRoomPassword,
} from "../../api/chatroom";
import ModalComponent from "../../components/chatroom/ModalComponent";
import { useNavigate } from "react-router-dom";
import { getChat } from "../../api/chat";
const SearchCodePage = () => {
  const [code, setCode] = useState("");
  const [count, setCount] = useState("");
  const [roomName, setRoomName] = useState("");
  const [image, setImage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [isSecretChatRoom, setIsSecretChatRoom] = useState("");
  const [isAnonymousChatRoom, setIsAnonymousChatRoom] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  //코드로 채팅방 조회 API 연결
  const readSearchChatCode = async () => {
    try {
      const response = await getSearchChatCode(code);
      setRoomName(response.data.roomName);
      setImage(response.data.chatRoomImgUrl);
      setCount(response.data.participantCount);
      setIsSecretChatRoom(response.data.isSecretChatRoom);
      setIsAnonymousChatRoom(response.data.isAnonymousChatRoom);
      setRoomId(response.data.roomId);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  //실명채티방 입장 API 연결
  const createNamedChat = async () => {
    try {
      const response = await postNamedChat(roomId, isOwner);
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
          <JoinButton
            onClick={() =>
              setSelectedChat({ roomName, roomId, isAnonymousChatRoom })
            }
          >
            참여하기
          </JoinButton>
        </ChatRoomCard>
      )}
      {selectedChat && (
        <ModalComponent
          roomName={selectedChat.roomName}
          message="해당 채팅방에 정말로 입장하시겠습니까?"
          isSecretChatRoom={isSecretChatRoom}
          roomId={selectedChat.roomId}
          onConfirm={async () => {
            if (isAnonymousChatRoom) {
              navigate(`/setanonyprofile/${roomId}`);
            } else {
              await createNamedChat();
              navigate(`/chatdetail/${roomId}`);
            }
            setSelectedChat(null); // 모달 닫기
          }}
          onCancel={() => setSelectedChat(null)} // 모달 닫기
        />
      )}
    </Layout>
  );
};

export default SearchCodePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: 1px solid var(--gray-200);
`;

const SearchButton = styled.button`
  width: 45px;
  height: 45px;
  background: none;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-100);
`;

const ChatRoomCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  width: 80%;
  margin-top: 20px;
  text-align: center;
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

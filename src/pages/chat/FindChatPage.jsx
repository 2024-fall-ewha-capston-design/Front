import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import TopBarChat from "../../components/common/TopBarChat";
import { ReactComponent as Search } from "../../assets/chat/search.svg";
import ChatItem from "../../components/chat/ChatItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  getChatList,
  getSearchChatName,
  postNamedChat,
} from "../../api/chatroom";
import ModalComponent from "../../components/chatroom/ModalComponent";
import _ from "lodash"; // lodash의 debounce 사용

const FindChatPage = () => {
  const [chat, setChat] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isSecretChatRoom, setIsSecretChatRoom] = useState("");
  const [isAnonymousChatRoom, setIsAnonymousChatRoom] = useState("");
  const [filteredChat, setFilteredChat] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  // 채팅방 이름으로 채팅방 조회 API 연결
  const readSearchChatName = async (name) => {
    try {
      if (!name.trim()) {
        setFilteredChat(chat); // 검색어가 없으면 전체 리스트 표시
        return;
      }
      const response = await getSearchChatName(name);
      setFilteredChat(response.data);
      setIsAnonymousChatRoom(response.data.isAnonymousChatRoom);
      setRoomId(response.data.roomId);
      console.log(isAnonymousChatRoom);
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
  //Debounce를 사용하여 API 호출 최적화 (300ms)
  const debouncedSearch = useCallback(_.debounce(readSearchChatName, 300), [
    chat,
  ]);

  // 검색 입력 이벤트 핸들러
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
    debouncedSearch(value);
  };

  return (
    <Layout>
      <TopBarChat text="채팅" showIcons="true" />
      <NavigationBar />
      <SearchContainer>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <SearchInput
          placeholder="채팅방명으로 검색하세요"
          value={roomName}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <ChatContainer>
        {filteredChat.map((chatItem) => (
          <ChatItem
            key={chatItem.roomId}
            image={chatItem.chatRoomImgUrl}
            title={chatItem.roomName}
            count={chatItem.participantCount}
            message={chatItem.latestChat?.content || ""}
            time={chatItem.createdAt}
            anony={chatItem.isAnonymousChatRoom}
            secret={chatItem.isSecretChatRoom}
            onClick={() => setSelectedChat(chatItem)}
          />
          //navigate(`/chatdetail/${chatItem.roomId}`)
        ))}
      </ChatContainer>
      {selectedChat && (
        <ModalComponent
          roomName={selectedChat.roomName}
          message="해당 채팅방에 정말로 입장하시겠습니까?"
          onConfirm={async () => {
            const { isAnonymousChatRoom, roomId } = selectedChat;
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

export default FindChatPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  height: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 52px;
  padding: 4px;
  width: 345px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 0 0.1px black; /* 아주 얇은 테두리 효과 */
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

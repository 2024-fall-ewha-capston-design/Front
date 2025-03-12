import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import TopBarChat from "../../components/common/TopBarChat";
import { ReactComponent as Search } from "../../assets/chat/search.svg";
import ChatItem from "../../components/chat/ChatItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getChatList, getSearchChatName } from "../../api/chatroom";
import _ from "lodash"; // lodash의 debounce 사용

const ChatListPage = () => {
  const [chat, setChat] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [filteredChat, setFilteredChat] = useState([]); // 검색 결과를 저장할 상태
  const navigate = useNavigate();
  // 채팅방 목록 조회 API 연결
  const readChatList = async () => {
    try {
      const response = await getChatList();
      setChat(response.data);
      setFilteredChat(response.data); // 초기값 설정
    } catch (err) {
      console.error(err);
    }
  };

  // 채팅방 이름으로 채팅방 조회 API 연결
  const readSearchChatName = async (name) => {
    try {
      if (!name.trim()) {
        setFilteredChat(chat); // 검색어가 없으면 전체 리스트 표시
        return;
      }
      const response = await getSearchChatName(name);
      setFilteredChat(response.data);
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

  useEffect(() => {
    readChatList();
  }, []);

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
          onChange={handleSearchChange} // 🔹 타이핑할 때 검색 실행
        />
      </SearchContainer>

      <ChatContainer>
        {filteredChat.map((chatItem) => (
          <ChatItem
            key={chatItem.roomId}
            image={chatItem.chatRoomImgUrl}
            anony={chatItem.isAnonymousChatRoom}
            secret={chatItem.isSecretChatRoom}
            title={chatItem.roomName}
            count={chatItem.participantCount}
            message={chatItem.latestChat?.content || ""}
            time={chatItem.createdAt}
            onClick={() => navigate(`/chatdetail/${chatItem.roomId}`)}
          />
        ))}
      </ChatContainer>
    </Layout>
  );
};

export default ChatListPage;

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

import styled from "styled-components";
import { useState, useEffect } from "react";
import { ReactComponent as Arrow } from "../../assets/chat/arrow.svg";
import { ReactComponent as CrownIcon } from "../../assets/chat/crown.svg"; // 방장 관리 아이콘
import { ReactComponent as EditIcon } from "../../assets/chat/edit.svg"; // 프로필 수정 아이콘
import { ReactComponent as KeywordIcon } from "../../assets/chat/keyword.svg"; // 키워드 관리 아이콘
import { ReactComponent as ExitIcon } from "../../assets/chat/exit.svg"; // 방 나가기 아이콘
import { deleteChat, getChatDetails } from "../../api/chatroom";
import { getChat } from "../../api/chat";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ModalComponent from "../../components/chatroom/ModalComponent";
import MemberItem from "../../components/chatroom/MemberItem";

const ChatPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [participantList, setParticipantList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const stompClientRef = useRef(null);

  //채팅방 상세내용 조회 API 연결
  const readChatRoomDetail = async () => {
    try {
      const response = await getChatDetails(roomId);
      setRoomName(response.data.roomName);
      setIdentifier(response.data.identifier);
      setParticipantList(response.data.participantList);
    } catch (err) {
      console.error(err);
    }
  };
  //채팅내용 조회 API 연결
  const readChat = async () => {
    try {
      const response = await getChat(roomId);
      setMessages(response.data);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const displayMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { content: message }]);
  };

  useEffect(() => {
    if (stompClientRef.current && stompClientRef.current.connected) return; // 중복 연결 방지

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_BASE_URL}/ws-chat`, null, {
          transports: ["websocket"],
        }),
      connectHeaders: { "accept-version": "1.1" },
      onConnect: (frame) => {
        console.log("Connected: " + frame);
        client.subscribe(`/topic/public/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.warn("STOMP 연결이 끊어졌습니다. 1초 후 재연결 시도...");
        setTimeout(() => {
          if (stompClientRef.current && !stompClientRef.current.connected) {
            stompClientRef.current.activate();
          }
        }, 1000);
      },
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
    };
  }, [roomId]);

  /*
  //websockekt 연결
  const stompClient = Stomp.over(
    () => new SockJS(`${process.env.REACT_APP_BASE_URL}/ws-chat`)
  );
  stompClient.connect({}, function (frame) {
    console.log("Connected:" + frame);
    console.log("STOMP 상태", stompClient.connected);
    stompClient.subscribe(`/topic/public/${roomId}`, function (message) {
      const receivedMessage = JSON.parse(message.body); // receivedMessage 정의
      console.log("Received message:", receivedMessage);
      displayMessage(receivedMessage.content); // 올바른 필드 사용

      readChat();
    });
  });
*/
  const sendMessage = () => {
    if (
      stompClientRef.current &&
      stompClientRef.current.connected &&
      inputMessage.trim()
    ) {
      const message = {
        roomId: roomId,
        type: "CHAT",
        senderId: 1,
        content: inputMessage,
      };

      stompClientRef.current.publish({
        destination: "/app/chat/send",
        body: JSON.stringify(message),
      });

      // 메시지 전송 후 바로 화면에 반영
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: inputMessage, isMine: true }, // 내가 보낸 메시지는 isMine: true로 설정
      ]);

      setInputMessage("");
    } else {
      console.warn("STOMP 연결이 안 되어 있거나 메시지가 비어 있습니다.");
    }
  };

  //채팅방 탈퇴 API 연결
  const delChat = async () => {
    try {
      const response = await deleteChat(roomId);
      navigate("/home");
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!roomId) return;
    readChat();
    readChatRoomDetail();
  }, [roomId]);

  return (
    <Layout>
      <Header>
        <Arrow onClick={() => navigate("/home")} />
        <Title>{roomName}</Title>
        <MenuIcon onClick={() => setShowParticipants(!showParticipants)}>
          ☰
        </MenuIcon>
      </Header>

      {showParticipants && (
        <ParticipantsContainer>
          <ParticipantsTitle>참여자 목록</ParticipantsTitle>
          <Participant>
            {participantList.map((participant) => (
              <MemberItem
                key={participant.id}
                name={participant.roomNickname}
                profile={participant.participantImgUrl}
              />
            ))}
          </Participant>
          <RoomCodeContainer>
            <RoomCodeTitle>채팅방 코드</RoomCodeTitle>
            <RoomCode>{identifier}</RoomCode>
          </RoomCodeContainer>

          <BottomMenu>
            <MenuItem
              onClick={() =>
                navigate(`/ownerpage/${roomId}`, {
                  state: { participantList, roomName },
                })
              }
            >
              <CrownIcon />
              방장관리
            </MenuItem>
            <MenuItem>
              <EditIcon />
              프로필수정
            </MenuItem>
            <MenuItem>
              <KeywordIcon />
              키워드관리
            </MenuItem>
            <MenuItem onClick={() => setShowModal(true)}>
              <ExitIcon />
              채팅방나가기
            </MenuItem>
            {showModal && (
              <ModalComponent
                roomName={roomName}
                mesage="정말로 채팅방을 나가시겠습니까?"
                onConfirm={delChat}
                onCancel={() => setShowModal(false)}
              />
            )}
          </BottomMenu>
        </ParticipantsContainer>
      )}

      <Date>2025년 2월 8일(토)</Date>

      <ChatContainer>
        {messages.map((msg) => (
          <Message key={msg.id} isMine={msg.isMine}>
            {!msg.isMine && (
              <ProfileImage src="/profile-placeholder.png" alt="profile" />
            )}
            <MessageContent>
              {!msg.isMine && <Sender>{msg.senderId}</Sender>}
              <MessageBox isMine={msg.isMine}>{msg.content}</MessageBox>
              <Time>{msg.createdAt}</Time>
            </MessageContent>
          </Message>
        ))}
      </ChatContainer>

      <InputContainer>
        <AttachButton>+</AttachButton>
        <Input
          placeholder="채팅 입력창"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <SendButton onClick={sendMessage}>➤</SendButton>
      </InputContainer>
    </Layout>
  );
};

export default ChatPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--white);
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 12px 3px 12px;
  background-color: white;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 16px;
`;

const MenuIcon = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const ParticipantsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100svh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ParticipantsTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Participant = styled.div`
  display: flex;
  font-size: 14px;
  gap: 10px;
  margin-bottom: 5px;
`;

const RoomCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 0;
`;

const RoomCodeTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const RoomCode = styled.p`
  font-size: 17px;
  background: var(--gray-100);
  padding: 5px;
  border-radius: 5px;
  width: fit-content;
`;

const BottomMenu = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 270px;
  justify-content: space-around;
  padding: 10px 5px 10px 5px;
  border-top: 1px solid var(--gray-200);
  background-color: white;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: gray;
  cursor: pointer;
  gap: 5px;

  &:hover {
    color: black;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Date = styled.div`
  text-align: center;
  font-size: 12px;
  color: gray;
  margin: 10px 0;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Sender = styled.div`
  font-size: 12px;
  color: gray;
  margin-bottom: 3px;
`;

const MessageBox = styled.div`
  padding: 10px;
  border-radius: 10px 10px 10px 0px;
  border: 1px solid var(--gray-200);
  background-color: ${(props) => (props.isMine ? "#7b61ff" : "white")};
  color: ${(props) => (props.isMine ? "white" : "black")};
  max-width: 60%;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
`;
const Time = styled.div`
  font-size: 10px;
  color: gray;
  margin-left: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 12px 3px 12px;
  background-color: white;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
`;

const AttachButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 14px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
const ProfileImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 15px;
  margin-right: 10px;
  margin-top: 5px;
`;

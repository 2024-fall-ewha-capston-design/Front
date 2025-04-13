import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const NoticeItem = ({ keyword, chatRoomName, roomId, chatId }) => {
  const navigate = useNavigate();
  return (
    <Layout
      onClick={() => navigate(`/chatdetail/${roomId}`, { state: { chatId } })}
    >
      <TextContainer>
        <Title>{chatRoomName}</Title>
        <Message>
          회원님이 설정하신
          <span style={{ color: "var(--red-pri)" }}>{keyword}</span>에 대한
          채팅이 왔어요!
        </Message>
      </TextContainer>
    </Layout>
  );
};

export default NoticeItem;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
  width: 375px;
  background-color: var(--white);
  background-color: var(--white);
  cursor: pointer;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Title = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--black);
`;
const Message = styled.span`
  font-size: 12px;
  color: var(--black);
`;

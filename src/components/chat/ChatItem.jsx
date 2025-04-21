import styled from "styled-components";
const ChatItem = ({
  image,
  title,
  anony,
  secret,
  count,
  message,
  time,
  onClick,
}) => {
  return (
    <Layout onClick={onClick}>
      <Image src={image} alt="chat"></Image>
      <TextContainer>
        <Title>{title}</Title>
        <Count>
          {count}명 {anony ? "익명" : "실명"} {secret ? "비공개" : "공개"}
        </Count>
        <MessageContainer>
          <Message>{message}</Message>
          <Time>{time}</Time>
        </MessageContainer>
      </TextContainer>
    </Layout>
  );
};

export default ChatItem;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  width: 345px;
  height: 57px;
  border-radius: 10px;
`;
const Image = styled.img`
  display: flex;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: var(--gray-200);
  object-fit: cover;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Title = styled.span`
  font-size: 13px;
  font-weight: bold;
`;
const Count = styled.span`
  font-size: 11px;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Message = styled.span`
  font-size: 11px;
  color: var(--gray-200);
`;
const Time = styled(Message)``;

import styled from "styled-components";

const NoticeItem = ({ title, message, onClick }) => {
  return (
    <Layout onClick={onClick}>
      <TextContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </TextContainer>
    </Layout>
  );
};

export default NoticeItem;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width: 330px;
  height: 67px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
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
const Message = styled.span`
  font-size: 11px;
  color: var(--gray-200);
`;

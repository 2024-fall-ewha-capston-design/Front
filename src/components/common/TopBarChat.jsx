import styled from "styled-components";
import { ReactComponent as AddChat } from "../../assets/chat/addchat.svg";
import { ReactComponent as ChatCode } from "../../assets/chat/chatcode.svg";
import { useNavigate } from "react-router-dom";

const TopBarChat = ({ text, showIcons }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Text>{text}</Text>
      {showIcons && <StyledChatCode onClick={() => navigate("/searchcode")} />}
      {showIcons && <StyledAddChat onClick={() => navigate("/createchat")} />}
    </Layout>
  );
};

export default TopBarChat;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 375px;
  height: 47px;
  background-color: var(--white);
  position: absolute;
  top: 0;
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  font-size: 16px;
  margin-left: 15px;
`;

const StyledAddChat = styled(AddChat)`
  position: absolute;
  right: 1px;
  margin-right: 15px;
  cursor: pointer;
  width: 19px;
`;

const StyledChatCode = styled(ChatCode)`
  position: absolute;
  right: 35px;
  margin-right: 15px;
  cursor: pointer;
  width: 23px;
`;

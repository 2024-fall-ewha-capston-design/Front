import styled from "styled-components";
import { ReactComponent as AddChat } from "../../assets/chat/addchat.svg";
import { ReactComponent as ChatCode } from "../../assets/chat/chatcode.svg";
import { ReactComponent as Search } from "../../assets/common/search.svg";
import { useNavigate } from "react-router-dom";

const TopBarChat = ({
  text,
  showSearch = true,
  showChatCode = true,
  showAddChat = true,
}) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Text>{text}</Text>
      {showSearch && <StyledSearch onClick={() => navigate("/findchat")} />}
      {showChatCode && (
        <StyledChatCode onClick={() => navigate("/searchcode")} />
      )}
      {showAddChat && <StyledAddChat onClick={() => navigate("/createchat")} />}
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
  position: fixed;
  top: 0;
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
  width: 23px;
`;

const StyledChatCode = styled(ChatCode)`
  position: absolute;
  right: 30px;
  margin-right: 15px;
  cursor: pointer;
  width: 23px;
`;

const StyledSearch = styled(Search)`
  width: 23px;
  height: 23px;
  position: absolute;
  right: 64px;
  margin-right: 15px;
  cursor: pointer;
`;

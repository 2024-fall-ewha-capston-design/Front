import styled from "styled-components";
import { ReactComponent as Submit } from "../../assets/common/submit.svg";
import { ReactComponent as Arrow } from "../../assets/common/arrow.svg";
import { ReactComponent as ArrowW } from "../../assets/chat/arrow_white.svg";
import { useNavigate } from "react-router-dom";

const TopBarCommon = ({ text }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Left>
        <Arrow onClick={() => navigate(-1)} />
      </Left>
      <Center>
        <Text>{text}</Text>
      </Center>
      <Right>
        <ArrowW />
      </Right>
    </Layout>
  );
};

export default TopBarCommon;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 340px;
  padding: 10px 16px;
  background-color: var(--white);
`;

const Left = styled.div`
  width: 24px;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Right = styled.div`
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Text = styled.span`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

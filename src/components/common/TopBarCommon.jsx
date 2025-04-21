import styled from "styled-components";
import { ReactComponent as Submit } from "../../assets/common/submit.svg";
import { ReactComponent as Arrow } from "../../assets/common/arrow.svg";
import { ReactComponent as ArrowW } from "../../assets/chat/arrow_white.svg";
import { useNavigate } from "react-router-dom";

const TopBarCommon = ({ text }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Arrow onClick={() => navigate(-1)} />
      <Text>{text}</Text>
      <ArrowW />
    </Layout>
  );
};

export default TopBarCommon;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: space-between;
  position: fixed;
  top: 0;
  gap: 100px;
  width: 1005;
  margin: 10px;
  background-color: var(--white);
`;

const Text = styled.span`
  font-size: 14px;
`;

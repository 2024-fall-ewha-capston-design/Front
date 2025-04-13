import styled from "styled-components";
import { ReactComponent as Submit } from "../../assets/common/submit.svg";
import { ReactComponent as Arrow } from "../../assets/common/arrow.svg";
import { useNavigate } from "react-router-dom";

const TopBarCommon = ({ text }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Arrow onClick={() => navigate(-1)} />
      <Text>{text}</Text>
    </Layout>
  );
};

export default TopBarCommon;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  gap: 100px;
  width: 345px;
  margin: 10px;
  background-color: var(--white);
`;

const Text = styled.span`
  font-size: 15px;
  margin-left: 15px;
`;

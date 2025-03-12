import styled from "styled-components";
import { ReactComponent as Submit } from "../../assets/common/submit.svg";
import { ReactComponent as X } from "../../assets/common/x.svg";
import { useNavigate } from "react-router-dom";

const TopBarCommon = ({ onSubmit, text }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <StyledX onClick={() => navigate(-1)} />
      <Text>{text}</Text>
      <StyledSubmit onClick={onSubmit} />
    </Layout>
  );
};

export default TopBarCommon;

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
  font-size: 15px;
  margin-left: 15px;
`;

const StyledX = styled(X)`
  margin-left: 10px;
`;

const StyledSubmit = styled(Submit)`
  margin-right: 10px;
`;

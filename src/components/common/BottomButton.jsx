import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const BottomButton = ({ text, onClick }) => {
  return <Layout onClick={onClick}>{text}</Layout>;
};

export default BottomButton;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  bottom: 0;
  align-items: center;
  color: var(--white);
  width: 334px;
  height: 41px;
  background-color: var(--red-pri);
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;

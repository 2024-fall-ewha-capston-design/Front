import styled from "styled-components";
import { useState } from "react";

const MemberItem = ({ newOwnerId, profile, name }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Layout isChecked={isChecked} onClick={handleCheck}>
      <Profile src={profile} alt="profile" />
      <Name>{name}</Name>
    </Layout>
  );
};

export default MemberItem;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin: 10px;
  opacity: ${(props) => (props.isChecked ? 0.5 : 1)};
  cursor: pointer;
`;
const Profile = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 7px;
`;
const Name = styled.span`
  font-size: 17px;
`;

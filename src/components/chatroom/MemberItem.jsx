import styled from "styled-components";
import { ReactComponent as Owner } from "../../assets/chat/owner.svg";
const MemberItem = ({
  memberId,
  profile,
  isOwner,
  name,
  selectedId,
  onSelect,
  myId,
}) => {
  const isChecked = memberId === selectedId;

  const handleCheck = () => {
    onSelect(memberId);
  };
  const isMe = memberId === myId;
  return (
    <Layout isChecked={isChecked} onClick={handleCheck}>
      <Profile src={profile} alt="profile" />
      <Name>{name}</Name>
      {isOwner && <Owner />}
      {isMe && <Label>나</Label>}
    </Layout>
  );
};

export default MemberItem;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  opacity: ${(props) => (props.isChecked ? 0.5 : 1)};
  cursor: pointer;
`;
const Profile = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
`;
const Name = styled.span`
  font-size: 13px;
`;
const Crown = styled.span`
  font-size: 17px;
  margin-left: 5px;
`;

const Label = styled.label`
  color: #ffa100;
`;

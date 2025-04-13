import styled from "styled-components";
const MemberItem = ({
  memberId,
  profile,
  isOwner,
  name,
  selectedId,
  onSelect,
}) => {
  const isChecked = memberId === selectedId;

  const handleCheck = () => {
    onSelect(memberId);
  };

  return (
    <Layout isChecked={isChecked} onClick={handleCheck}>
      <Profile src={profile} alt="profile" />
      <Name>{name}</Name>
      {isOwner && <Crown>👑</Crown>}
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
  border-radius: 10px;
`;
const Name = styled.span`
  font-size: 13px;
`;
const Crown = styled.span`
  font-size: 17px;
  margin-left: 5px;
`;

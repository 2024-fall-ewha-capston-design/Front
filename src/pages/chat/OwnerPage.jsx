import styled from "styled-components";
import TopBarCommon from "../../components/common/TopBarCommon";
import { ReactComponent as Search } from "../../assets/chat/search.svg";
import { useState } from "react";
import MemberItem from "../../components/chatroom/MemberItem";
import { deleteChatRoom, putManager } from "../../api/chatroom";
import { useParams, useLocation } from "react-router-dom";

const OwnerPage = () => {
  const [name, setName] = useState();
  const { roomId } = useParams();
  const location = useLocation();
  const participantList = location.state?.participantList || [];
  const roomName = location.state?.roomName;
  const [newOwnerId, setNewOwnerId] = useState("");
  // 방장 변경 API 연결
  const updateManager = async () => {
    try {
      const response = await putManager(roomId, newOwnerId);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  //방장권한 채팅방 삭제 API 연결
  const delChatRoom = async () => {
    try {
      const response = await deleteChatRoom(roomId);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  // 검색 입력 이벤트 핸들러
  const handleSearchChange = (e) => {
    setName(e.target.value);
  };
  return (
    <Layout>
      <TopBarCommon text="방장 권한" onSubmit={updateManager} />
      <Title>{roomName}</Title>
      <SearchContainer>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <SearchInput
          placeholder="이름으로 검색하세요"
          value={name}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <MemberContainer>
        {participantList.map((participant) => (
          <MemberItem
            key={participant.id}
            newOwnerId={participant.participantId}
            profile={participant.participantImgUrl}
            name={participant.roomNickname}
          />
        ))}
      </MemberContainer>
      <DeleteContainer onClick={delChatRoom}>
        <Text>{roomName} 삭제</Text>
        <SubText>
          방장 권한으로 삭제하시면 채팅방의 모든 정보가 다 사라집니다
        </SubText>
      </DeleteContainer>
    </Layout>
  );
};
export default OwnerPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--purple-sec);
  height: 100svh;
`;
const Title = styled.span`
  margin-top: 60px;
  font-size: 19px;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 4px;
  width: 345px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 0 0.1px black; /* 아주 얇은 테두리 효과 */
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;
const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 10px 20px 20px 30px;
`;
const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 320px;
  position: absolute;
  bottom: 0;
  background-color: var(--white);
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
`;
const Text = styled.span`
  font-size: 21px;
`;
const SubText = styled.span`
  font-size: 10px;
`;

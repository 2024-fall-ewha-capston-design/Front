import styled from "styled-components";
import TopBarCommon from "../../components/common/TopBarCommon";
import { ReactComponent as Search } from "../../assets/chat/search.svg";
import { useState } from "react";
import MemberItem from "../../components/chatroom/MemberItem";
import { deleteChatRoom, putManager } from "../../api/chatroom";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/chat/defaultprofile.svg";
import ModalComponent from "../../components/chatroom/ModalComponent"; // 모달 컴포넌트 경로

const OwnerPage = () => {
  const [name, setName] = useState("");
  const { roomId } = useParams();
  const location = useLocation();
  const [participantList, setParticipantList] = useState(
    location.state?.participantList || []
  );
  const roomName = location.state?.roomName;
  const [selectedId, setSelectedId] = useState(""); // 하나만 선택되도록 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newManagerNickname, setNewManagerNickname] = useState("");
  const navigate = useNavigate();
  // 방장 변경 API 연결
  const updateManager = async () => {
    try {
      if (!selectedId) {
        alert("방장을 선택해주세요.");
        return;
      }
      console.log("선택된 방장 ID:", selectedId);
      const response = await putManager(roomId, selectedId);
      const selectedMember = participantList.find(
        (p) => p.participantId === selectedId
      );

      if (selectedMember) {
        setNewManagerNickname(selectedMember.roomNickname);
        setIsModalOpen(true); // 모달 열기
      }
      const updatedList = participantList.map((p) => ({
        ...p,
        isOwner: p.participantId === selectedId,
      }));
      setParticipantList(updatedList);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  // 방장권한 채팅방 삭제 API 연결
  const delChatRoom = async () => {
    try {
      const response = await deleteChatRoom(roomId);
      navigate("/home");
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  // 검색 입력 이벤트 핸들러
  const handleSearchChange = (e) => {
    setName(e.target.value);
  };

  // 멤버 선택 핸들러
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <Layout>
      <TopBarCommon text="방장 권한" />
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
            memberId={participant.participantId} // 고유 ID
            profile={participant.participantImgUrl || defaultProfile}
            isOwner={participant.isOwner}
            name={participant.roomNickname}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        ))}
      </MemberContainer>
      <Button onClick={updateManager}>방장 변경</Button>
      <DeleteContainer onClick={delChatRoom}>
        <Text>{roomName} 삭제</Text>
        <SubText>
          방장 권한으로 삭제하시면 채팅방의 모든 정보가 다 사라집니다
        </SubText>
      </DeleteContainer>
      {isModalOpen && (
        <ModalComponent
          roomName="방장 변경"
          message={`${newManagerNickname}님이 새로운 방장이 되었습니다!`}
          roomImg={null} // 필요한 경우 기본 이미지
          isSecretChatRoom={false}
          onConfirm={() => setIsModalOpen(false)}
        />
      )}
    </Layout>
  );
};
export default OwnerPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 350px;
  gap: 13px;
  margin: 20px 20px 20px 30px;
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
  padding: 16px;
  cursor: pointer;
  border: 1px solid var(--gray-200);
`;
const Text = styled.span`
  font-size: 21px;
`;
const SubText = styled.span`
  font-size: 10px;
`;

const Button = styled.button`
  display: flex;
  width: 80px;
  background-color: var(--white);
  color: var(--black);
  border-radius: 8px;
  padding: 5px;
  border: 1px solid var(--gray-200);
  justify-content: center;
`;

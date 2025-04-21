import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import { FaEdit } from "react-icons/fa";
import TopBarChat from "../../components/common/TopBarChat";
import { useNavigate } from "react-router-dom";
import { getAnonyProfile, getMemberInfo } from "../../api/member";
import { useEffect, useState } from "react";
import defaultProfile from "../../assets/chat/defaultprofile.svg";

const MyPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [anonymousProfiles, setAnonymousProfiles] = useState([]);

  const readMemberInfo = async () => {
    try {
      const response = await getMemberInfo();
      setNickname(response.data.nickname);
      setProfile(response.data.profileImgUrl);
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  const readAnonyMemberInfo = async () => {
    try {
      const response = await getAnonyProfile();
      setAnonymousProfiles(response.data);
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    readMemberInfo();
    readAnonyMemberInfo();
  }, []);
  return (
    <Layout>
      <TopBarChat
        text="마이페이지"
        showSearch={false}
        showChatCode={false}
        showAddChat={false}
      />
      <ProfileSection>
        <SectionTitle>기본 프로필</SectionTitle>
        <ProfileCard>
          <ProfileImageBig src={profile || defaultProfile} alt="chat" />
          <UserNameBig>{nickname}</UserNameBig>
          <EditProfile onClick={() => navigate("/updateprofile")}>
            수정
            <FaEdit size={12} />
          </EditProfile>
        </ProfileCard>
      </ProfileSection>

      {/* 익명 채팅방별 프로필 */}
      <AnonymousProfileSection>
        <SectionTitle>익명 채팅방별 프로필</SectionTitle>
        <ProfileList>
          {anonymousProfiles.map((profile) => (
            <SmallProfileCard key={profile.participantId}>
              <RoomName>{profile.roomName}</RoomName>
              <ProfileImage src={profile.participantImgUrl || defaultProfile} />
              <UserName>{profile.roomNickname}</UserName>
              <EditProfile
                onClick={() =>
                  navigate(`/anonyprofile/${profile.participantId}`, {
                    state: { roomName: profile.roomName },
                  })
                }
              >
                수정
                <FaEdit size={12} />
              </EditProfile>
            </SmallProfileCard>
          ))}
        </ProfileList>
      </AnonymousProfileSection>

      <NavigationBar />
    </Layout>
  );
};

export default MyPage;

// 스타일 정의
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100svh;
  overflow-y: auto;
  padding-bottom: 70px;
`;

const ProfileSection = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 40px;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: ${(props) => (props.small ? "40px" : "80px")};
  height: ${(props) => (props.small ? "40px" : "80px")};
  background: gray;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;
const ProfileImageBig = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
`;
const UserNameBig = styled(UserName)`
  font-size: 23px;
`;
const EditProfile = styled.div`
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AnonymousProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  width: 343px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProfileList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const SmallProfileCard = styled.div`
  width: 86px;
  background: white;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--gray-200);
`;

const RoomName = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

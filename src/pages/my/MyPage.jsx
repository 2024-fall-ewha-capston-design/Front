import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import { FaEdit } from "react-icons/fa";
import TopBarChat from "../../components/common/TopBarChat";
import { useNavigate } from "react-router-dom";
import { getAnonyProfile, getMemberInfo } from "../../api/member";
import { useEffect, useState } from "react";

const MyPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const [anonymousProfiles, setAnonymousProfiles] = useState([]);

  const readMemberInfo = async () => {
    try {
      const response = await getMemberInfo();
      setNickname(response.data.nickname);

      setProfile(response.data.profile);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  const readAnonyMemberInfo = async () => {
    try {
      const response = await getAnonyProfile();
      setAnonymousProfiles(response.data);
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
      <TopBarChat text="마이페이지" />
      <ProfileSection>
        <SectionTitle>기본 프로필</SectionTitle>
        <ProfileCard>
          <ProfileImageBig />
          <UserNameBig>{nickname}</UserNameBig>
          <EditProfile>
            프로필 편집
            <FaEdit size={12} onClick={() => navigate("/updateprofile")} />
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
              <ProfileImage>{profile.participantImgUrl}</ProfileImage>
              <UserName>{profile.roomNickname}</UserName>
              <EditProfile>
                프로필 편집
                <FaEdit
                  size={12}
                  onClick={() =>
                    navigate(`/anonyprofile/${profile.participantId}`)
                  }
                />
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
  padding: 20px;
  background-color: var(--purple-sec);
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 40px;
`;

const ProfileCard = styled.div`
  width: 90%;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: ${(props) => (props.small ? "40px" : "80px")};
  height: ${(props) => (props.small ? "40px" : "80px")};
  background: gray;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const ProfileImageBig = styled(ProfileImage)`
  width: 140px;
  height: 140px;
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
  width: 100%;
  padding: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProfileList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const SmallProfileCard = styled.div`
  width: 100px;
  background: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomName = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

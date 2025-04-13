import { useState, useEffect } from "react";
import styled from "styled-components";
import { Camera } from "lucide-react";
import { getOneAnonyProfile, putAnonyProfile } from "../../api/member";
import { postAnonyChat } from "../../api/chatroom";
import { postImage } from "../../api/s3";
import { useNavigate, useParams } from "react-router-dom";
import TopBarCommon from "../../components/common/TopBarCommon";
import BottomButton from "../../components/common/BottomButton";
import { ReactComponent as Profile } from "../../assets/common/profile.svg";
import { ReactComponent as CameraButton } from "../../assets/common/camerabutton.svg";

const UpdateAnonyProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [profile, setProfile] = useState("");
  const [participantId, setParticipantId] = useState("");
  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadened = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //채팅방 신규입장-익명채팅방 API 연결
  const createAnonyChat = async () => {
    try {
      const response = await postAnonyChat(
        roomId,
        isOwner,
        nickname,
        profileImage
      );
      const participantId = response.data.participantId;
      setParticipantId(participantId);
      console.log("id" + participantId);
      navigate(`/chatdetail/${roomId}`);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <TopBarCommon text="프로필 수정" />
      <Title>스타트 2024-2</Title>
      <SubTitle>에서 사용할 익명 프로필을 수정해주세요</SubTitle>
      <ProfileContainer>
        {profile ? <ProfileImage src={profile} alt="Profile" /> : <Profile />}
        <input
          type="file"
          accept="image/*"
          id="profile-image"
          onChange={handleProfileChange}
          style={{ display: "none" }}
        />
        <ImageLabel htmlFor="profile-image">
          <StyledCameraButton />
        </ImageLabel>
      </ProfileContainer>
      <InputContainer>
        <Legend>닉네임</Legend>
        <NameText
          placeholder="별명은 최대 5글자"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></NameText>
      </InputContainer>
      <BottomButton text="등록" onClick={createAnonyChat} />
    </Layout>
  );
};

export default UpdateAnonyProfile;

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 5px;
`;
const SubTitle = styled.span`
  text-align: center;
  font-size: 15px;
`;
const Legend = styled.legend`
  font-size: 18px;
`;
const NameText = styled.textarea`
  height: 20px;
  width: 224px;
  border: none;
  border-bottom: 1px solid black;
  resize: none;
  outline: none;
`;
const ProfileImage = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 50%;
  object-fit: cover;
  margin: 50px;
`;
const ImageLabel = styled.label`
  display: flex;
`;
const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  width: 196px;
  height: 196px;
  margin: 40px;
`;
const StyledCameraButton = styled(CameraButton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

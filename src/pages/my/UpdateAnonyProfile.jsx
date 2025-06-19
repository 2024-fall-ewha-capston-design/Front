import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Camera } from "lucide-react";
import { getOneAnonyProfile, putAnonyProfile } from "../../api/member";
import { postAnonyChat } from "../../api/chatroom";
import { postImage } from "../../api/s3";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import TopBarCommon from "../../components/common/TopBarCommon";
import BottomButton from "../../components/common/BottomButton";
import { ReactComponent as Profile } from "../../assets/common/profile.svg";
import { ReactComponent as CameraButton } from "../../assets/common/camerabutton.svg";
import defaultProfile from "../../assets/chat/defaultprofile.svg";
const UpdateAnonyProfile = () => {
  const { participantId } = useParams();
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [profile, setProfile] = useState("");
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const roomName = location.state?.roomName;
  console.log("roomName", roomName);

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const createImage = await postImage(file.name);

        await fetch(createImage, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
        const url = createImage.split("?")[0];
        setProfile(url);
      } catch (err) {
        console.error(err);
      }
    }
  };

  //익명 프로필 개별 조회 API 연결
  const readOneAnonyProfile = async () => {
    try {
      const response = await getOneAnonyProfile(participantId);
      setEmail(response.data.email);
      setNickname(response.data.roomNickname);
      setProfile(response.data.participantImgUrl);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //익명 프로필 수정 API 연결
  const updateMemberInfo = async () => {
    try {
      const response = await putAnonyProfile(participantId, nickname, profile);
      navigate("/my");
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (participantId) {
      readOneAnonyProfile(participantId);
    }
  }, [participantId]);
  return (
    <Layout>
      <TopBarCommon text="프로필 수정" onSubmit={updateMemberInfo} />
      <Title>{roomName}</Title>
      <SubTitle>에서 사용할 익명 프로필을 수정해주세요</SubTitle>
      <ProfileContainer>
        <ProfileImage src={profile || defaultProfile} alt="Profile" />
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
      <BottomButton text="수정" onClick={updateMemberInfo} />
    </Layout>
  );
};

export default UpdateAnonyProfile;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
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
`;
const ImageLabel = styled.label`
  display: flex;
`;
const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  width: 210px;
  height: 210px;
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

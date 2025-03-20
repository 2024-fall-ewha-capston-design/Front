import { useState, useEffect } from "react";
import styled from "styled-components";
import { Camera } from "lucide-react";
import { getOneAnonyProfile, putAnonyProfile } from "../../api/member";
import { postAnonyChat } from "../../api/chatroom";
import { postImage } from "../../api/s3";
import { useNavigate, useParams } from "react-router-dom";
import TopBarCommon from "../../components/common/TopBarCommon";

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
      reader.onlaoadened = () => {
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
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  //익명 프로필 수정 API 연결
  const updateMemberInfo = async () => {
    try {
      const response = await putAnonyProfile(participantId, nickname, profile);
      console.log("update response", response);
      navigate(`/chatdetail/${roomId}`);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await createAnonyChat();

      if (response && response.data) {
        await updateMemberInfo();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Layout>
      <TopBarCommon text="프로필 수정" onSubmit={handleSubmit} />
      <Title>익명프로필을 등록해주세요</Title>
      <ProfileImage src={profile} alt="프로필 사진" />
      <input type="file" accept="image/*" onChange={handleProfileChange} />
      <Legend>닉네임</Legend>
      <NameText
        placeholder="별명은 최대 5글자"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      ></NameText>
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
  font-size: 20px;
  text-align: center;
  margin-top: 100px;
`;
const Legend = styled.legend`
  font-size: 18px;
`;
const NameText = styled.textarea`
  height: 20px;
  width: 250px;
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

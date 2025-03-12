import { useState, useEffect } from "react";
import styled from "styled-components";
import { Camera } from "lucide-react";
import { getOneAnonyProfile, putAnonyProfile } from "../../api/member";
import { postImage } from "../../api/s3";
import { useParams } from "react-router-dom";
import { postAnonyChat } from "../../api/chatroom";

const SetAnonyProfile = () => {
  const { participantId } = useParams();
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const { chatRoomId } = useParams();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //채팅방 신규입장-익명채팅방 API 연결
  const createAnonyChat = async () => {
    try {
      const response = await postAnonyChat(
        chatRoomId,
        isOwner,
        nickname,
        profileImage
      );
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  //익명 프로필 개별 조회 API 연결
  const readOneAnonyProfile = async () => {
    try {
      const response = await getOneAnonyProfile(participantId);
      setEmail(response.data.email);
      setNickname(response.data.roomNickname);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //익명 프로필 수정 API 연결
  const updateMemberInfo = async () => {
    try {
      if (!imageFile) {
        alert("이미지를 선택하세요");
        return;
      }

      const presignedResponse = await postImage(imageFile.name);
      const presignedUrl = presignedResponse.data.data;

      await fetch(presignedUrl, {
        method: "PUT",
        body: imageFile,
        headers: {
          "Content-Type": imageFile.type,
        },
      });
      const uploadedImageUrl = presignedUrl.split("?")[0];

      const response = await putAnonyProfile(
        participantId,
        nickname,
        uploadedImageUrl
      );
      console.log("프로필 업데이트 성공", response);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Card>
        <Title>챗시피에 오신걸 환영합니다</Title>
        <Subtitle>여러분의 프로필을 등록해주세요!</Subtitle>
        <ProfileWrapper htmlFor="profile-upload">
          <ProfileImage>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "🙂"
            )}
          </ProfileImage>
          <CameraIcon>
            <Camera size={20} color="#6b7280" />
          </CameraIcon>
        </ProfileWrapper>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          hidden
        />
        <div>
          <label>이름</label>
          <Input
            type="text"
            maxLength={4}
            placeholder="이름은 최대 4자"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <Button onClick={createAnonyChat}>등록</Button>
      </Card>
    </Container>
  );
};

export default SetAnonyProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
`;

const ProfileWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: #d1d5db;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #6b7280;
`;

const CameraIcon = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: white;
  padding: 4px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 4px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #7c3aed;
  color: white;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
  &:hover {
    background-color: #6d28d9;
  }
`;

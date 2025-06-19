import TopBarCommon from "../../components/common/TopBarCommon";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { putMemberInfo, getMemberInfo } from "../../api/member";
import { postImage } from "../../api/s3";
import { useNavigate } from "react-router-dom";
import BottomButton from "../../components/common/BottomButton";
import { ReactComponent as Profile } from "../../assets/common/profile.svg";
import { ReactComponent as CameraButton } from "../../assets/common/camerabutton.svg";
import defaultProfile from "../../assets/chat/defaultprofile.svg";
const UpdateProfilePage = () => {
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  //프로필 조회 API 연결
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
  useEffect(() => {
    readMemberInfo();
  }, []);
  //프로필 사진 변경 핸들러
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
  //프로필 수정 API 연결
  const updateMemberInfo = async () => {
    try {
      const response = await putMemberInfo(nickname, profile);
      navigate("/my");
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Layout>
      <TopBarCommon text="프로필 수정" />
      <Title>기본프로필을</Title>
      <SubTitle>수정해주세요</SubTitle>
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
        <Legend>이름</Legend>
        <NameText
          placeholder="이름은 최대 5글자"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></NameText>
      </InputContainer>
      <BottomButton text="수정" onClick={updateMemberInfo} />
    </Layout>
  );
};

export default UpdateProfilePage;
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
const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  width: 210px;
  height: 210px;
  margin: 40px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Legend = styled.legend`
  font-size: 18px;
`;
const NameText = styled.textarea`
  height: 20px;
  width: 224px;
  font-size: 18px;
  padding: 10px 0px 10px 0px;
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
const StyledCameraButton = styled(CameraButton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const ImageLabel = styled.label`
  display: flex;
`;

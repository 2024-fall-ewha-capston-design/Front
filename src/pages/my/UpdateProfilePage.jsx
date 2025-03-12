import TopBarCommon from "../../components/common/TopBarCommon";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { putMemberInfo, getMemberInfo } from "../../api/member";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const [name, setName] = useState("스타트");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  //프로필 조회 API 연결
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
  useEffect(() => {
    readMemberInfo();
  }, []);
  //프로필 사진 변경 핸들러
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
      <TopBarCommon text="프로필 수정" onSubmit={updateMemberInfo} />
      <Title>기본프로필을 수정해주세요</Title>
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

export default UpdateProfilePage;
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

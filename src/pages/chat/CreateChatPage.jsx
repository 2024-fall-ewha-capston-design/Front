import styled from "styled-components";
import { useState, useRef } from "react";
import TopBarCommon from "../../components/common/TopBarCommon";
import { postChat, postNamedChat } from "../../api/chatroom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Lock_W } from "../../assets/chat/lock_white.svg";
import { ReactComponent as Unlock_B } from "../../assets/chat/unlock_black.svg";
import { ReactComponent as Lock_B } from "../../assets/chat/lock_black.svg";
import { ReactComponent as Unlock_W } from "../../assets/chat/unlock_white.svg";
import { ReactComponent as Anony_W } from "../../assets/chat/anony_white.svg";
import { ReactComponent as Anony_B } from "../../assets/chat/anony_black.svg";
import { ReactComponent as Name_W } from "../../assets/chat/name_white.svg";
import { ReactComponent as Name_B } from "../../assets/chat/name_black.svg";
import BottomButton from "../../components/common/BottomButton";

const CreateChatPage = () => {
  const [roomName, setRoomName] = useState("");
  const [isSecretChatRoom, setIsSecretChatRoom] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAnonymousChatRoom, setIsAnonymousChatRoom] = useState(true);
  // 미리보기용 URL과 실제 파일 객체를 따로 관리
  const [chatRoomImgUrl, setChatRoomImgUrl] = useState("");
  const [chatRoomImgFile, setChatRoomImgFile] = useState(null);
  const [roomId, setRoomId] = useState("");
  const isOwner = true;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 각 그룹 내 모든 input의 값을 합쳐 업데이트하는 함수
  const handleInputChange = (e, setter) => {
    const { value, maxLength } = e.target;
    if (value.length >= maxLength) {
      const inputs = e.target.parentElement.querySelectorAll("input");
      const index = Array.from(inputs).indexOf(e.target);
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
    const inputs = e.target.parentElement.querySelectorAll("input");
    let combinedValue = "";
    inputs.forEach((input) => {
      combinedValue += input.value;
    });
    setter(combinedValue);
  };

  // 파일 선택 시 state에 파일 객체와 미리보기 URL 저장
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setChatRoomImgFile(file);
    setChatRoomImgUrl(URL.createObjectURL(file));
  };

  const handleCreateChat = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 첫 번째 API 요청: 채팅방 생성

      const response = await postChat(
        roomName,
        isSecretChatRoom,
        Number(password),
        isAnonymousChatRoom,
        chatRoomImgUrl
      );
      console.log(
        roomName,
        isSecretChatRoom,
        password,
        isAnonymousChatRoom,
        chatRoomImgUrl
      );
      const newRoomId = response.data.roomId;
      setRoomId(newRoomId);

      // 두 번째 API 요청: 실명 채팅방 입장
      await postNamedChat(newRoomId, isOwner);
      console.log("success");

      // 성공하면 홈으로 이동
      navigate(`/home`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <TopBarCommon text="채팅방 생성" />
      <Container>
        <ItemContainer>
          <Label>채팅방 이름 *</Label>
          <Textarea
            value={roomName}
            placeholder="채팅방 이름은 최대 8자"
            onChange={(e) => setRoomName(e.target.value)}
          />
        </ItemContainer>
        <HLine />
        <ItemContainer>
          <Label>공개/비공개 설정 여부 *</Label>
          <ButtonGroup>
            <Button
              selected={isSecretChatRoom === true}
              onClick={() => setIsSecretChatRoom(true)}
            >
              {isSecretChatRoom ? <Unlock_W /> : <Unlock_B />}
              비공개
            </Button>
            <Button
              selected={isSecretChatRoom === false}
              onClick={() => setIsSecretChatRoom(false)}
            >
              {isSecretChatRoom ? <Lock_B /> : <Lock_W />}
              공개
            </Button>
          </ButtonGroup>
        </ItemContainer>
        <HLine />
        <ItemContainer>
          <Label>비밀번호</Label>
          <PasswordInputGroup>
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
          </PasswordInputGroup>
          <Label>비밀번호 확인</Label>
          <PasswordInputGroup>
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
            />
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
            />
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
            />
            <PasswordInput
              type="password"
              maxLength={1}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
            />
          </PasswordInputGroup>
        </ItemContainer>
        <HLine />
        <ItemContainer>
          <Label>별명/실명 여부 *</Label>
          <ButtonGroup>
            <Button
              selected={isAnonymousChatRoom === true}
              onClick={() => setIsAnonymousChatRoom(false)}
            >
              {isAnonymousChatRoom ? <Anony_W /> : <Anony_B />}
              별명
            </Button>
            <Button
              selected={isAnonymousChatRoom === false}
              onClick={() => setIsAnonymousChatRoom(true)}
            >
              {isAnonymousChatRoom ? <Name_B /> : <Name_W />}
              실명
            </Button>
          </ButtonGroup>
        </ItemContainer>
        <HLine />
        <ItemContainer>
          <Label>채팅방 커버 사진</Label>
          <ImageUpload onClick={() => fileInputRef.current.click()}>
            {chatRoomImgUrl ? (
              <img
                src={chatRoomImgUrl}
                alt="채팅방 대표 이미지"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                }}
              />
            ) : (
              "+"
            )}
          </ImageUpload>
          <HiddenFileInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </ItemContainer>
      </Container>
      <BottomButton text="등록" />
    </Layout>
  );
};

export default CreateChatPage;

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 333px;
  gap: 18px;
  margin-top: 45px;
  margin-bottom: 40px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const Label = styled.span`
  font-size: 15px;
`;

const Textarea = styled.textarea`
  display: flex;
  align-items: center;
  width: 319px;
  height: 21px;
  padding: 7px;
  border: none;
  border: 0.5px solid var(--gray-300);
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  resize: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  width: 80px;
  height: 35px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  gap: 5px;
  background-color: ${(props) =>
    props.selected ? "var(--red-pri)" : "var(--white)"};
  color: ${(props) => (props.selected ? "var(--white)" : "var(--black)")};
  border: 0.01rem solid var(--gray-200);
`;

const PasswordInputGroup = styled.div`
  display: flex;
  gap: 5px;
`;

const PasswordInput = styled.input`
  width: 35px;
  height: 35px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ImageUpload = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const HLine = styled.div`
  width: 333px;
  border: 0.5px solid var(--gray-100);
`;

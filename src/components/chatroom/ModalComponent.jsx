import styled from "styled-components";
import { useState } from "react";
import { getChatRoomPassword } from "../../api/chatroom";
const ModalComponent = ({
  roomName,
  message,
  isSecretChatRoom,
  roomId,
  onConfirm,
  onCancel,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (isSecretChatRoom) {
      try {
        const response = await getChatRoomPassword(roomId, password);
        if (response.data == true) {
          onConfirm();
        } else {
          setError("비밀번호가 올바르지 않습니다.");
        }
      } catch (err) {
        setError("비밀번호 확인 중 오류가 발생했습니다.");
      }
    } else {
      onConfirm();
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Logo src="/ewha-logo.png" alt="Ewha Logo" />
        <Title>{roomName}</Title>
        <Subtitle>{message}</Subtitle>
        {isSecretChatRoom && (
          <PasswordInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <ConfirmButton onClick={handleConfirm}>예</ConfirmButton>
          <VLine />
          <CancelButton onClick={onCancel}>아니요</CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalComponent;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 290px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
`;
const PasswordInput = styled.input`
  width: 204px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  color: var(--red-pri);
  background-color: var(--white);
  border: none;
  font-size: 17px;
`;
const VLine = styled.div`
  display: flex;
  flex-direction: column;
  height: 25px;
  border: 1px solid var(--gray-200);
`;
const CancelButton = styled(Button)`
  color: var(--red);
  background-color: var(--white);
  border: none;
  font-size: 17px;
`;

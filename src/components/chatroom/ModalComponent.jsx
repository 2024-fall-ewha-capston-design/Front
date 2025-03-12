import styled from "styled-components";

const ModalComponent = ({ roomName, message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <Logo src="/ewha-logo.png" alt="Ewha Logo" />
        <Title>{roomName}</Title>
        <Subtitle>{message}</Subtitle>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>예</ConfirmButton>
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
  width: 320px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  background: #007bff;
  color: white;
  border: none;
  &:hover {
    background: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background: #dc3545;
  color: white;
  border: none;
  &:hover {
    background: #a71d2a;
  }
`;

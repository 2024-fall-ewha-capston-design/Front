import styled from "styled-components";
import { ReactComponent as Google } from "../../assets/login/google.svg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = `
    https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email+profile`;
  };
  return (
    <Layout>
      <StyledGoogle onClick={handleGoogleLogin} />
    </Layout>
  );
};
export default LoginPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--red-pri);
  height: 100%;
`;
const StyledGoogle = styled(Google)`
  cursor: pointer;
`;

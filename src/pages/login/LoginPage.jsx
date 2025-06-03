import styled from "styled-components";
import { ReactComponent as Google } from "../../assets/login/google.svg";
import { ReactComponent as Logo } from "../../assets/login/logo.svg";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email+profile`;
    }, 15000); // 2초 후 리디렉션

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <Layout>
      <Logo />
    </Layout>
  );
};

export default LoginPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  height: 100vh;
`;

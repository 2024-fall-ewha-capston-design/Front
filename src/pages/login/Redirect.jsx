import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Redirect = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log("redirect");

  useEffect(() => {
    if (code) {
      fetchAccessToken(code);
      console.log("code", code);
    } else {
      navigate("/login");
    }
  });

  console.log("code");
  const IsExist = () => {
    navigate("/home");
    window.location.reload();
  };
  const NoExist = () => {
    navigate("/setprofile");
    window.location.reload();
  };

  const fetchAccessToken = async (code) => {
    try {
      console.log("토큰 요청 시작");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        { code: code }
      );
      console.log("Response data:", response.data);
      console.log("code", code);
      const accessToken = response.data.accessToken;

      if (!accessToken) {
        console.error("accessToken이 응답에서 존재하지 않음.");
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      console.log("accessToken", accessToken);
      response.data.isExist ? IsExist() : NoExist();
    } catch (error) {
      console.log(error);
    }
  };
  return <div>...Redirecting</div>;
};

export default Redirect;

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ChatList } from "../../assets/navigationbar/chatlist.svg";
import { ReactComponent as FindChat } from "../../assets/navigationbar/findchat.svg";
import { ReactComponent as Notice } from "../../assets/navigationbar/notice.svg";
import { ReactComponent as EditProfile } from "../../assets/navigationbar/editprofile.svg";
import { ReactComponent as ChatListB } from "../../assets/navigationbar/chatlist_b.svg";
import { ReactComponent as FindChatB } from "../../assets/navigationbar/findchat_b.svg";
import { ReactComponent as NoticeB } from "../../assets/navigationbar/notice_b.svg";
import { ReactComponent as EditProfileB } from "../../assets/navigationbar/editprofile_b.svg";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");

  // 현재 URL에 따라 selected 값 설정
  useEffect(() => {
    const pathToTab = {
      "/": "chatlist",
      "/notice": "notice",
      "/my": "editprofile",
    };

    setSelected(pathToTab[location.pathname] || "chatlist");
  }, [location.pathname]);

  const handleNavigation = (tab, path) => {
    setSelected(tab);
    navigate(path);
  };

  return (
    <Layout>
      <IconContainer onClick={() => handleNavigation("chatlist", "/home")}>
        {selected === "chatlist" ? <ChatListB /> : <ChatList />}
        <Text selected={selected === "chatlist"}>채팅목록</Text>
      </IconContainer>

      <IconContainer onClick={() => handleNavigation("notice", "/notice")}>
        {selected === "notice" ? <NoticeB /> : <Notice />}
        <Text selected={selected === "notice"}>알림목록</Text>
      </IconContainer>

      <IconContainer onClick={() => handleNavigation("editprofile", "/my")}>
        {selected === "editprofile" ? <EditProfileB /> : <EditProfile />}
        <Text selected={selected === "editprofile"}>프로필</Text>
      </IconContainer>
    </Layout>
  );
};

export default NavigationBar;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: var(--white);
  width: 375px;
  height: 63px;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 10px;
  color: ${(props) => (props.selected ? "black" : "var(--gray-200)")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

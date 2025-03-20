import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
//로그인 페이지
import LoginPage from "./pages/login/LoginPage";
//프로필 생성 페이지
import SetProfile from "./pages/login/SetProfile";
//채팅목록 페이지
import ChatListPage from "./pages/chat/ChatListPage";
//채팅 생성 페이지
import CreateChatPage from "./pages/chat/CreateChatPage";
//채팅 찾기 페이지
import FindChatPage from "./pages/chat/FindChatPage";
//채팅 페이지
import ChatPage from "./pages/chat/ChatPage";
import KeywordPage from "./pages/chat/KeywordPage";
import OwnerPage from "./pages/chat/OwnerPage";
//알림페이지
import NoticePage from "./pages/notice/NoticePage";
//마이페이지
import MyPage from "./pages/my/MyPage";
import Redirect from "./pages/login/Redirect";
import UpdateProfilePage from "./pages/my/UpdateProfilePage";
import SearchCodePage from "./pages/chat/SearchCodePage";
import UpdateAnonyProfile from "./pages/my/UpdateAnonyProfile";
import SetAnonyProfile from "./pages/my/SetAnonyProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Redirect />} />
      <Route path="/setprofile" element={<SetProfile />} />
      <Route path="/home" element={<ChatListPage />} />
      <Route path="/createchat" element={<CreateChatPage />} />
      <Route path="/findchat" element={<FindChatPage />} />
      <Route path="/keyword/:roomId" element={<KeywordPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/updateprofile" element={<UpdateProfilePage />} />
      <Route path="/setanonyprofile/:roomId" element={<SetAnonyProfile />} />
      <Route
        path="/anonyprofile/:participantId"
        element={<UpdateAnonyProfile />}
      />
      <Route path="/searchcode" element={<SearchCodePage />} />
      <Route path="/chatdetail/:roomId" element={<ChatPage />} />
      <Route path="/ownerpage/:roomId" element={<OwnerPage />} />
    </Routes>
  );
};

export default App;

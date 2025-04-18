import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import TopBarChat from "../../components/common/TopBarChat";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoticeItem from "../../components/notice/NoticeItem";
import { getNotification, deleteNotification } from "../../api/ai";
const NoticePage = () => {
  const [noticeList, setNoticeList] = useState([]);
  const navigate = useNavigate();
  const readNotification = async () => {
    try {
      const response = await getNotification();
      setNoticeList(response.data);
      console.log("hi", noticeList);
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    readNotification();
  }, []);
  return (
    <Layout>
      <TopBarChat
        text="알림"
        showSearch={false}
        showChatCode={false}
        showAddChat={false}
      />
      <NoticeContainer>
        {noticeList.map((notice) => (
          <NoticeItem
            key={notice.notificationId}
            notificationId={notice.notificationId}
            keyword={notice.keyword}
            chatRoomName={notice.chatRoomName}
            roomId={notice.chatRoomId}
            chatId={notice.chatId}
            onClick={async () => {
              await deleteNotification(notice.notificationId);
              await readNotification();
            }}
          />
        ))}
      </NoticeContainer>
      <NavigationBar />
    </Layout>
  );
};
export default NoticePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--gray-100);
`;
const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  background-color: var(--gray-100);
  margin-top: 42px;
`;

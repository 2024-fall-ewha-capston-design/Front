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
  /*const readNotification = async () => {
    try {
      const response = await getNotification();
      setNoticeList(response.data);
      console.log("hi", noticeList);
      return response;
    } catch (err) {
      console.error(err);
    }
  };*/
  const readNotification = async () => {
    try {
      const response = await getNotification();
      const data = response.data;

      // 데이터가 배열이 아닐 경우 빈 배열로 처리
      const safeData = Array.isArray(data) ? data : [];

      setNoticeList(safeData);
    } catch (err) {
      console.error("알림 데이터를 불러오는 데 실패했습니다:", err);
      setNoticeList([]); // 에러 시에도 빈 배열로 초기화
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

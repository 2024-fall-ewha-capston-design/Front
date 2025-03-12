import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";
import TopBarChat from "../../components/common/TopBarChat";
const NoticePage = () => {
  return (
    <Layout>
      <TopBarChat text="알림" />
      <NavigationBar />
    </Layout>
  );
};
export default NoticePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

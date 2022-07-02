import styled from "styled-components";

import Layout from "../components/common/Layout";
import MyLike from "../components/mypage/MyLike";
import MyInfoSection from "../components/mypage/MyInfoSection";

const MypagePage = () => {
  return (
    <>
      <Layout>
        <Part>PROFILE</Part>
        <MyInfoSection />
        <Part>FAVORITE</Part>
        <MyLike />
      </Layout>
    </>
  );
};

export default MypagePage;

const Part = styled.div`
  border-bottom: solid 5px #65949e;
  text-align: center;
  width: 150px;
  margin: 0px auto 30px;
  font-size: 36px;
`;

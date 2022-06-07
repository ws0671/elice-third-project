import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        로고 + 서비스명 (홈으로)
      </div>
      <div
        onClick={() => {
          navigate("/walk");
        }}
      >
        산책길
      </div>
      <div
        onClick={() => {
          navigate("/hospital");
        }}
      >
        병원
      </div>
      <div
        onClick={() => {
          navigate("/board");
        }}
      >
        소통 공간
      </div>
      <div
        onClick={() => {
          navigate("/ai");
        }}
      >
        AI 종 분석
      </div>
      <div
        onClick={() => {
          navigate("/register");
        }}
      >
        회원가입
      </div>
      <div
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인
      </div>
    </>
  );
};

export default Header;

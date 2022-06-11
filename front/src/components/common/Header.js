import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);

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

      {!user && (
        <>
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
      )}
      {user && (
        <>
          <div
            onClick={() => {
              navigate("/mypage");
            }}
          >
            마이 페이지
          </div>
          <div
            onClick={() => {
              // sessionStorage에 저장했던 JWT 토큰 삭제
              sessionStorage.removeItem("userToken");
              // dispatch 함수를 이용해 로그아웃함.
              dispatch(LOGOUT());
              // 메인 화면으로 돌아감. (뒤로가기 불가능)
              navigate("/", { replace: true });
            }}
          >
            로그아웃
          </div>
          <h3>{user.name}님 로그인 상태</h3>
        </>
      )}
      <hr />
    </>
  );
};

export default Header;

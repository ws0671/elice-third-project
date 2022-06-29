import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const HeaderMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.value);

    return (
        <>
            <a
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/map");
                }}
            >
                우리동네 지도
            </a>
            <a
                className="menu"
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/ai");
                }}
            >
                AI 종 분석
            </a>
            <a
                className="menu"
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/board");
                }}
            >
                소통 공간
            </a>
            {!user && (
                <>
                    <a
                        className="menu"
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/register");
                        }}
                    >
                        회원가입
                    </a>
                    <a
                        className="menu"
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/login");
                        }}
                    >
                        로그인
                    </a>
                </>
            )}
            {user && (
                <>
                    <a
                        className="menu"
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/mypage");
                        }}
                    >
                        마이페이지
                    </a>
                    <a
                        className="menu"
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            // sessionStorage에 저장했던 JWT 토큰 삭제
                            sessionStorage.removeItem("userToken");
                            // dispatch 함수를 이용해 로그아웃함.
                            dispatch(LOGOUT());
                            // 메인 화면으로 돌아감. (뒤로가기 불가능)
                            navigate("/", { replace: true });
                        }}
                    >
                        로그아웃
                    </a>
                </>
            )}
        </>
    );
};

export default HeaderMenu;

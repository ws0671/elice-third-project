import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    console.log("스크롤 위로");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

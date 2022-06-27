import Posting from "../components/board/Posting";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
const PostingPage = () => {
    return (
        <>
            <Header />
            <Layout>
                <Posting />
            </Layout>
        </>
    );
};

export default PostingPage;

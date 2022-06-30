import Header from "../components/common/Header";
import Post from "../components/board/Post";
import Layout from "../components/common/Layout";
const PostPage = () => {
    return (
        <>
            <Header />
            <Layout>
                <Post />
            </Layout>
        </>
    );
};

export default PostPage;

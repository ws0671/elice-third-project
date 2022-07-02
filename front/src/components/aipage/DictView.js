import styled from "styled-components";
import { Grid } from "@mui/material";
import dogdefault from "../../assets/images/dogdefault.jpg";
import catdefault from "../../assets/images/catdefault.jpg";

const DictView = ({ content, type = "dogs" }) => {
    const defaultImg = type === "dogs" ? dogdefault : catdefault;

    // console.log(content);
    return (
        <Grid item md={9} sm={12} xs={12}>
            <ViewContainer>
                {content && (
                    <>
                        <KoreaName>{content?.nameKor}</KoreaName>
                        <Grid container>
                            <Grid
                                item
                                md={6}
                                sm={12}
                                xs={12}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <PostImg
                                    style={{
                                        backgroundImage: content.picture
                                            ? `url(${content.picture})`
                                            : `url(${defaultImg})`,
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <Grid container>
                                    <ContentTitle item md={4} sm={4} xs={12}>
                                        영어이름
                                    </ContentTitle>
                                    <DescriptionFont item md={7} sm={7} xs={12}>
                                        {content?.nameEng}
                                    </DescriptionFont>
                                    <ContentTitle item md={4} sm={4} xs={12}>
                                        수명 범위
                                    </ContentTitle>
                                    <DescriptionFont item md={7} sm={7} xs={12}>
                                        {content?.age}
                                    </DescriptionFont>
                                    <ContentTitle item md={4} sm={4} xs={12}>
                                        체중 범위
                                    </ContentTitle>
                                    <DescriptionFont item md={7} sm={7} xs={12}>
                                        {content?.weight}
                                    </DescriptionFont>
                                    <ContentTitle item md={4} sm={4} xs={12}>
                                        특징
                                    </ContentTitle>
                                    <DescriptionFont item md={7} sm={7} xs={12}>
                                        {content?.feature}
                                    </DescriptionFont>
                                </Grid>
                                <ContentTitle>성격</ContentTitle>
                                <DescriptionFont>
                                    {content?.personality}
                                </DescriptionFont>
                            </Grid>
                        </Grid>
                        
                    {content.history && (
                    <Grid container>
                        <ContentTitle item md={12}>유래</ContentTitle>
                        <DescriptionFont>
                            {content?.history}
                        </DescriptionFont>
                        <ContentTitle item md={12}>건강</ContentTitle>
                        <DescriptionFont>
                            {content?.disease}
                        </DescriptionFont>
                    </Grid>
                    )}
                </>          
            
            )}
            </ViewContainer>
        </Grid>
    );
};

export default DictView;

const ViewContainer = styled(Grid)`
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 25px;
    justify-content: space-between;
    width: 100%;
    min-height: 640px;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
    box-shadow: 2px 2px 10px #d9d9d9;
`;

const KoreaName = styled(Grid)`
    font-size: 36px;
    padding: 10px 0;
    border-bottom: solid 1px #d9d9d9;
    margin: 5px 0 15px 0;
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const ContentTitle = styled(Grid)`
    margin: 10px 0;
    font-size: 25px;
    @media screen and (max-width: 600px) {
        font-size: 18px;
        margin: 5px;
    }
`;

const DescriptionFont = styled(Grid)`
    font-size: 20px;
    color: gray;
    margin: 10px;
    @media screen and (max-width: 600px) {
        font-size: 14px;
        margin: 5px;
    }
`;

const PostImg = styled(Grid)`
    text-align: center;
    margin: 3% auto;
    width: 90%;
    max-width: 320px;
    max-height: 340px;
    position: relative;
    padding-top: 65%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;
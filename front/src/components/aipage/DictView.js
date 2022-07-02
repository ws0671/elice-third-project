import styled from "styled-components";
import { Grid } from "@mui/material";
import dogdefault from "../../assets/images/dogdefault.jpg";
import catdefault from "../../assets/images/catdefault.jpg";


const DictView = ({content, type='dogs'}) => {
    const defaultImg = (type === 'dogs') ? dogdefault : catdefault;

    // console.log(content);
    return (
        <Grid item md={9} sm={12} xs={12}>
            <ViewContainer>
            {content && (
                <>
                    <KoreaName>{content?.nameKor}</KoreaName>
                    <Grid container>
                        <Grid item md={6} sm={12} xs={12}>
                            
                            <PostImg>
                                <img
                                    src={(content.picture) ? content.picture : defaultImg}
                                    alt="이미지 없음"
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        objectFit: 'scale-down',
                                        borderRadius:
                                            "10px",
                                    }}
                                />
                            </PostImg>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Grid container>
                                <ContentTitle item md={4} sm={4}>영어이름</ContentTitle>
                                <DescriptionFont item md={7} sm={7}>
                                    {content?.nameEng}
                                </DescriptionFont>
                                <ContentTitle item md={4} sm={4}>수명 범위</ContentTitle>
                                <DescriptionFont item md={7} sm={7}>{content?.age}</DescriptionFont>
                                <ContentTitle item md={4} sm={4}>체중 범위</ContentTitle>
                                <DescriptionFont item md={7} sm={7}>{content?.weight}</DescriptionFont>
                                <ContentTitle item md={4} sm={4}>특징</ContentTitle>
                                <DescriptionFont item md={7} sm={7}>
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
}

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
`;

const ContentTitle = styled(Grid)`
    margin: 10px 0;
    font-size: 25px;
`;

const DescriptionFont = styled(Grid)`
    font-size: 20px;
    color: gray;
    margin: 10px;
`;

const PostImg = styled(Grid)`
    margin: 2% auto;
    width: 90%;
    max-width: 500px;
    max-height: 500px;
`;
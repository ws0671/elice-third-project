import styled from "styled-components";

// MyLike

const MapInfo = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
`;

const Map = styled.div`
  background-color: #c9ada1;
  height: 300px;
  margin-top: 10px;
`;

// MyInfoEditor

const UserImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  position: relative;
`;

const UserImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 10px 0px;
  box-shadow: 2px 2px 30px -5px #eae0cc;
`;

const UserName = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Info = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  height: 40px;
`;

const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 10px;
  background-color: #798478;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  min-width: 100px;
  max-width: 150px;
  text-align: center;
  height: 25px;
`;

const InfoContent = styled.div`
  font-size: 1.1rem;
  padding: 5px;
`;

// MyInfo

const Wrapper = styled.div`
  margin: 20px;
  min-height: 250px;
  width: 100%;
  display: flex;
`;

const ImgWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 2px 2px 30px -5px #eae0cc;
`;

const InfoWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Name = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2px;
`;

const Email = styled.div`
  color: gray;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const Desc = styled.div`
  font-size: 1rem;
  margin-bottom: 15px;
`;

const Animals = styled.div`
  min-height: 60px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Animal = styled.div`
  background-color: #c9ada1;
  padding: 2px 10px;
  margin: 0px 10px 2px 0px;
  border-radius: 10px;
  height: 22px;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-contnt: center;
`;

const AnimalEdit = styled.div`
  background-color: #c9ada1;
  padding: 2px 10px;
  margin: 0px 10px 7px 0px;
  border-radius: 10px;
  height: 30px;
  font-size: 1.1rem;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-contnt: center;
`;

export {
  MapInfo,
  Map,
  UserImgWrapper,
  UserImg,
  UserName,
  Info,
  InfoTitle,
  InfoContent,
  Wrapper,
  ImgWrapper,
  Img,
  InfoWrapper,
  Name,
  Email,
  Desc,
  Animals,
  Animal,
  AnimalEdit,
};

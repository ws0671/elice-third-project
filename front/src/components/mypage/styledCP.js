import styled from "styled-components";

const PageTitle = styled.div`
  color: #798478;
  font-size: 2.5rem;
  font-weight: bold;
  border-bottom: solid 3px #798478;
  padding: 10px;
  margin-bottom: 20px;
`;

const MapInfo = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Map = styled.div`
  background-color: #c9ada1;
  height: 300px;
  margin-top: 10px;
`;

const UserImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const UserImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
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
  font-size: 1rem;
  padding: 5px;
`;

const Species = styled.div`
  display: inline-block;
  background-color: lightgray;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 15px;
`;

export {
  PageTitle,
  MapInfo,
  Map,
  UserImgWrapper,
  UserImg,
  UserName,
  Info,
  InfoTitle,
  InfoContent,
  Species,
};

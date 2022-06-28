import { useEffect } from "react";

import * as Api from "../../api";

import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const List = ({
  loginAt,
  category,
  likedPlaceArray,
  setLikedPlaceArray,
  places,
  handleMouseOver,
  handleMouseOut,
}) => {
  const likedPlaceIdArray = likedPlaceArray.map((place) => place.id);

  const handleLikeClick = async (place) => {
    try {
      const data = {
        ...place,
        category,
      };
      const res = await Api.put("likes?scope=places", data);
      setLikedPlaceArray(res.data);
    } catch (err) {
      alert("장소 찜에 실패하였습니다", err);
    }
  };

  return (
    <Ul>
      {places.map((place) => {
        return (
          <Li key={place.id}>
            <InfoWrapper>
              <div>
                <PlaceName
                  href={place.place_url}
                  target="_blank"
                  onMouseOver={() => {
                    handleMouseOver(place.place_name);
                  }}
                  onMouseOut={handleMouseOut}
                >
                  {place.place_name}
                </PlaceName>
                <Phone>{place.phone}</Phone>
              </div>
              <Address>
                {place.road_address_name
                  ? place.road_address_name
                  : place.address_name}
              </Address>
            </InfoWrapper>
            {loginAt && (
              <LikeWrapper onClick={() => handleLikeClick(place)}>
                {likedPlaceIdArray?.includes(place.id) ? (
                  <FavoriteIcon sx={{ color: "#c2937e" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "rgb(232, 212, 203)" }} />
                )}
              </LikeWrapper>
            )}
          </Li>
        );
      })}
    </Ul>
  );
};

export default List;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Li = styled.li`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  background-color: rgba(232, 212, 203, 0.5);
  padding: 10px;
  border-radius: 10px;
`;

const PlaceName = styled.a`
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
`;

const Phone = styled.span`
  color: #c2937e;
`;

const Address = styled.div`
  margin-top: 5px;
  font-size: 16px;
`;

const InfoWrapper = styled.div`
  padding-left: 10px;
`;

const LikeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  cursor: pointer;
`;

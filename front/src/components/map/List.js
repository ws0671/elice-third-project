import { useEffect } from "react";

import * as Api from "../../api";

import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const List = ({
  category,
  likedPlaceIdArray,
  setLikedPlaceIdArray,
  places,
  handleMouseOver,
  handleMouseOut,
}) => {
  const handleLikeClick = async (place) => {
    try {
      const data = {
        ...place,
        category,
      };
      const res = await Api.put("likes", data);

      if (res.status !== 200) {
        console.log(res);
      }
    } catch (err) {
      // alert(err)
    }
  };

  useEffect(() => {
    console.log(likedPlaceIdArray);
  }, []);

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
            <LikeWrapper onClick={() => handleLikeClick(place)}>
              {likedPlaceIdArray?.includes(place.id) ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "#798478" }} />
              )}
            </LikeWrapper>
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
  background-color: rgba(121, 132, 120, 0.1);
  padding: 10px;
  border-radius: 10px;
`;

const PlaceName = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 10px;
`;

const Phone = styled.span`
  color: gray;
`;

const Address = styled.div`
  margin-top: 5px;
  font-size: 1rem;
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

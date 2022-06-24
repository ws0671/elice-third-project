import { useEffect, useState } from "react";

import styled from "styled-components";
import { InfoTitle, MapInfo } from "./styledCP";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import * as Api from "../../api";

const MyLike = () => {
  const { kakao } = window;

  const [value, setValue] = useState("1");
  const [map, setMap] = useState();
  const [currentPos, setCurrentPos] = useState();
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState();
  const [info, setInfo] = useState();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const category = {
    1: "산책길",
    2: "카페",
    3: "미용실",
    4: "병원",
  };

  function success(pos) {
    const { coords } = pos; // coords: 위치 정보
    const latitude = coords.latitude; // 위도
    const longitude = coords.longitude; // 경도

    setCurrentPos({ lat: latitude, lng: longitude });
  }

  function fail(pos) {
    alert("위치 정보를 가져오는데 실패했습니다.");
    setCurrentPos({
      lat: 33.450701,
      lng: 126.570667,
    });
  }

  function getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, fail); // 성공, 실패 콜백 함수 등록
    } else {
      alert("GPS를 지원하지 않습니다.");
    }
  }

  const getLike = async () => {
    const res = await Api.get("likes");
    const likedPlaceArray = res.data.placeArray;

    const filteredPlaceArray = likedPlaceArray.filter((place) => {
      return place.category === value;
    });

    setPlaces(filteredPlaceArray);
  };

  const displayMarker = () => {
    const bounds = new kakao.maps.LatLngBounds();
    let markers = [];

    places.map((place) => {
      markers.push({
        position: {
          lat: place.y,
          lng: place.x,
        },
        content: place.place_name,
      });
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });

    setMarkers(markers);
    map.setBounds(bounds);
  };

  const handleMouseOver = (content) => {
    setInfo({ content: content });
  };
  const handleMouseOut = () => {
    setInfo({ content: "" });
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  useEffect(() => {
    getLike();
  }, [map, value]);

  useEffect(() => {
    if (!map) return;
    displayMarker();
  }, [places]);

  return (
    <>
      <MapInfo>
        <InfoTitle>내가 찜한 장소</InfoTitle>
      </MapInfo>
      <TabContext value={value}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <CategoryTabList onChange={handleTabChange} aria-label="map tab list">
            <CategoryTab label="산책길" value="1" />
            <CategoryTab label="카페" value="2" />
            <CategoryTab label="미용실" value="3" />
            <CategoryTab label="병원" value="4" className="hos" />
          </CategoryTabList>
        </Box>
        <TabPanel
          value={value}
          sx={{
            backgroundColor: "#F6F5EF",
            border: "solid 5px #798478",
            borderRadius: "0px 3px 3px 3px",
          }}
        >
          {currentPos?.lat && currentPos?.lng && places.length !== 0 ? (
            <Map
              center={{ lat: currentPos.lat, lng: currentPos.lng }}
              style={{ width: "100%", height: "300px" }}
              onCreate={setMap}
              isPanto={true}
            >
              {markers.map((marker) => (
                <MapMarker
                  key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onMouseOver={() => {
                    handleMouseOver(marker.content);
                  }}
                  onMouseOut={handleMouseOut}
                >
                  {info && info.content === marker.content && (
                    <div style={{ color: "#000" }}>{marker.content}</div>
                  )}
                </MapMarker>
              ))}
            </Map>
          ) : (
            <NoPlace>
              찜한{" "}
              {value === "2" ? `${category[value]}가` : `${category[value]}이`}{" "}
              없습니다!
            </NoPlace>
          )}
        </TabPanel>
        <Ul>
          {places?.map((place) => {
            return (
              <Li key={place.id}>
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
              </Li>
            );
          })}
        </Ul>
      </TabContext>
    </>
  );
};

export default MyLike;

const CategoryTabList = styled(TabList)`
  && .MuiTabs-indicator {
    display: none;
  }
`;

const CategoryTab = styled(Tab)`
  && {
    background-color: #c9ada1;
    color: black;
    border-radius: 15px 15px 0px 0px;
    margin-right: 5px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
  }

  &.hos {
    background-color: #a0a083;
  }

  &&.Mui-selected {
    color: white;
    background-color: #798478;
    border: solid #798478;
    border-width: 5px 5px 0px 5px;
  }
`;

const NoPlace = styled.div`
  height: 300px;
  line-height: 300px;
  text-align: center;
`;

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
  flex-direction: column;
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

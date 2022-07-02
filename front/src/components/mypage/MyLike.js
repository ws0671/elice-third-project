import { useEffect, useState } from "react";

import styled from "styled-components";
import { Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import * as Api from "../../api";
import List from "../map/List";

const category = {
  1: "산책길",
  2: "카페",
  3: "미용실",
  4: "병원",
};

const MyLike = () => {
  const { kakao } = window;

  const [value, setValue] = useState("1");
  const [map, setMap] = useState();
  const [currentPos, setCurrentPos] = useState();
  const [markers, setMarkers] = useState([]);
  const [likedPlaceArray, setLikedPlaceArray] = useState([]);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [info, setInfo] = useState();

  // 장소 구분 탭 change시
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // 마커 흑은 리스트의 장소 이름에 mouseOver, mouseOut시
  const handleMouseOver = (content) => {
    setInfo({ content: content });
  };
  const handleMouseOut = () => {
    setInfo({ content: "" });
  };

  // 위치 정보 가져오기 - 성공 콜백 함수
  function success(pos) {
    const { coords } = pos; // coords: 위치 정보
    const latitude = coords.latitude; // 위도
    const longitude = coords.longitude; // 경도

    setCurrentPos({ lat: latitude, lng: longitude });
  }

  // 위치 정보 가져오기 - 실패 콜백 함수
  function fail(pos) {
    // 임시 주석(시연)
    // alert("위치 정보를 가져오는데 실패했습니다.");
    setCurrentPos({
      lat: 37.503773975836,
      lng: 127.048914400159,
    });
  }

  // 위치 정보 가져오기
  function getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, fail); // 성공, 실패 콜백 함수 등록
    } else {
      alert("GPS를 지원하지 않습니다.");
    }
  }

  // 찜한 장소 가져오기
  const getLikedPlaces = async () => {
    const params = { scope: "places" };
    const res = await Api.getQuery("likes", { params });

    const filteredPlaceArray = res.data.filter((place) => {
      return place.category === value;
    });

    setFilterPlaces(filteredPlaceArray);
  };

  // 마커 표시
  const displayMarker = () => {
    const bounds = new kakao.maps.LatLngBounds();
    let markers = [];

    filterPlaces.map((place) => {
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

  useEffect(() => {
    getMyLocation();
  }, []);

  useEffect(() => {
    getLikedPlaces();
  }, [map, value, likedPlaceArray]);

  useEffect(() => {
    if (!map) return;
    displayMarker();
  }, [filterPlaces]);

  return (
    <>
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
            backgroundColor: "white",
            borderRadius: "0px 10px 10px 10px",
            boxShadow: "2px 2px 10px #d9d9d9",
          }}
        >
          <Grid container>
            <Grid item md={6} sm={12} xs={12}>
              {currentPos?.lat &&
              currentPos?.lng &&
              filterPlaces.length !== 0 ? (
                <Map
                  center={{ lat: currentPos.lat, lng: currentPos.lng }}
                  style={{ width: "100%", height: "400px" }}
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
                        <div style={{ color: "#000", padding: "5px" }}>
                          {marker.content}
                        </div>
                      )}
                    </MapMarker>
                  ))}
                </Map>
              ) : (
                <NoPlace>
                  찜한{" "}
                  {value === "2"
                    ? `${category[value]}가`
                    : `${category[value]}이`}{" "}
                  없습니다!
                </NoPlace>
              )}
            </Grid>
            <Grid
              item
              md={6}
              sm={12}
              xs={12}
              sx={{
                minHeight: "400px",
                "@media (max-width: 900px)": { minHeight: 0 },
              }}
            >
              <List
                category={value}
                places={filterPlaces}
                setLikedPlaceArray={setLikedPlaceArray}
                loginAt={true}
                likedPlaceArray={filterPlaces}
                handleMouseOver={handleMouseOver}
                handleMouseOut={handleMouseOut}
              />
            </Grid>
          </Grid>
        </TabPanel>
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
    background-color: #65949e;
    color: white;
    border-radius: 10px 10px 0px 0px;
    margin-right: 5px;
    font-size: 20px;
    font-family: "GangwonEdu_OTFBoldA";
  }

  &&.Mui-selected {
    font-size: 25px;
    color: black;
    background-color: white;
  }
`;

const NoPlace = styled.div`
  height: 400px;
  line-height: 400px;
  text-align: center;
  background-color: rgba(232, 212, 203, 0.5);
`;

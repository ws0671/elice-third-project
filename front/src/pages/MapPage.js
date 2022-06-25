import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import Header from "../components/common/Header";
import List from "../components/map/List";
import DaumPostcode from "../components/map/DaumPostcode";

import { Container, Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import * as Api from "../api";

const MapPage = () => {
  const [value, setValue] = useState("1");
  const [places, setPlaces] = useState([]);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [currentPos, setCurrentPos] = useState(); // 위도, 경도
  const [pagination, setPagination] = useState();
  const [address, setAddress] = useState(); // 사용자가 입력(변경)한 주소
  const [likedPlaceIdArray, setLikedPlaceIdArray] = useState([]);

  const { kakao } = window;
  const keywords = {
    1: "공원",
    2: "애견 카페",
    3: "애견 미용",
    4: "동물 병원",
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMouseOver = (content) => {
    setInfo({ content: content });
  };
  const handleMouseOut = () => {
    setInfo({ content: "" });
  };

  const displayPagination = () => {
    let result = [];
    for (let i = 1; i <= pagination?.last; i++) {
      result.push(
        <PageNumber
          key={i}
          href="#"
          onClick={() => {
            pagination.gotoPage(i);
          }}
          className={i === pagination.current ? "on" : null}
        >
          {i}
        </PageNumber>
      );
    }
    return result;
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

  const getUserLike = async () => {
    const res = await Api.get("likes");
    const likedPlaceIdArray = res.data.placeArray?.map((place) => {
      return place.id;
    });
    setLikedPlaceIdArray(likedPlaceIdArray);
  };

  useEffect(() => {
    getMyLocation();

    getUserLike();
  }, []);

  useEffect(() => {
    if (!address) return;

    async function getLatAndLng() {
      const res = await axios.get(
        "https://dapi.kakao.com/v2/local/search/address",
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_REST}`,
          },
          params: {
            query: address,
          },
        }
      );

      const data = res.data.documents[0];
      setCurrentPos({ lat: parseFloat(data.y), lng: parseFloat(data.x) });
    }

    getLatAndLng();
  }, [address]);

  useEffect(() => {
    if (!map) return;
    if (!currentPos.lat || !currentPos.lng) return;

    const ps = new kakao.maps.services.Places();

    const keyword = keywords[value];

    const searchOptions = {
      location: new kakao.maps.LatLng(currentPos.lat, currentPos.lng), // 중심 좌표
      radius: 10000, // 중심 좌표로부터의 거리(반경) 필터링 값 (미터(m) 단위)
      size: 7, // 한 페이지에 보여질 목록 개수
    };

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status, pagination) => {
      setPlaces(data);

      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);

        // 페이지 번호를 표출합니다
        setPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    };

    ps.keywordSearch(keyword, placesSearchCB, searchOptions);
  }, [map, currentPos, value]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: "100px" }}>
        <TabContext value={value}>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <CategoryTabList
              onChange={handleTabChange}
              aria-label="map tab list"
            >
              <CategoryTab label="산책길" value="1" />
              <CategoryTab label="카페" value="2" />
              <CategoryTab label="미용" value="3" />
              <CategoryTab label="병원" value="4" className="hos" />
            </CategoryTabList>
            <DaumPostcode setAddress={setAddress} />
          </Box>
          <TabPanel
            value={value}
            sx={{
              backgroundColor: "#F6F5EF",
              border: "solid 5px #798478",
              borderRadius: "3px",
            }}
          >
            <Grid container>
              <Grid item md={6} sm={12} xs={12}>
                {currentPos?.lat && currentPos?.lng && (
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
                          <div style={{ color: "#000" }}>{marker.content}</div>
                        )}
                      </MapMarker>
                    ))}
                  </Map>
                )}
              </Grid>
              <Grid item md={6} sm={12} xs={12} sx={{ minHeight: "600px" }}>
                <List
                  category={value}
                  likedPlaceArray={likedPlaceIdArray}
                  setLikedPlaceArray={setLikedPlaceIdArray}
                  places={places}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                />
                <PageNumberWrapper>{displayPagination()}</PageNumberWrapper>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
};

export default MapPage;

const PageNumber = styled.a`
  text-decoration: none;
  color: #798478;
  padding: 10px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;

  &.on {
    font-weight: bold;
    font-size: 1.2rem;
    color: white;
    background-color: #798478;
    border-radius: 50%;
  }
`;

const PageNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

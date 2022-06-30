import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import Layout from "../components/common/Layout";
import List from "../components/map/List";
import DaumPostcode from "../components/map/DaumPostcode";

import { Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import * as Api from "../api";

const keywords = {
  1: "공원",
  2: "애견 카페",
  3: "애견 미용",
  4: "동물 병원",
};

const MapPage = () => {
  const [value, setValue] = useState("1");
  const [places, setPlaces] = useState([]);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [currentPos, setCurrentPos] = useState(); // 위도, 경도
  const [pagination, setPagination] = useState();
  const [address, setAddress] = useState(); // 사용자가 입력(변경)한 주소
  const [likedPlaceArray, setLikedPlaceArray] = useState([]);

  const { kakao } = window;
  const user = useSelector((state) => state.auth.value);

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

  // 검색결과 목록 하단에 페이지번호를 표시는 함수
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

  // 위치 정보 가져오기 - 성공 콜백 함수
  function success(pos) {
    const { coords } = pos; // coords: 위치 정보
    const latitude = coords.latitude; // 위도
    const longitude = coords.longitude; // 경도

    setCurrentPos({ lat: latitude, lng: longitude });
  }

  // 위치 정보 가져오기 - 실패 콜백 함수
  function fail(pos) {
    alert("위치 정보를 가져오는데 실패했습니다.");
    setCurrentPos({
      lat: 33.450701,
      lng: 126.570667,
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
    setLikedPlaceArray(res.data);
  };

  useEffect(() => {
    getMyLocation();

    // 로그인 시에만 찜한 장소 가져오기
    if (!user) return;

    getLikedPlaces();
  }, []);

  // 위치 변경시, currentPos 재설정
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

    // 검색 옵션
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

    // 키워드 검색
    ps.keywordSearch(keyword, placesSearchCB, searchOptions);
  }, [map, currentPos, value]);

  return (
    <>
      <Layout>
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
              <CategoryTab label="미용실" value="3" />
              <CategoryTab label="병원" value="4" />
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
              <Grid item md={6} sm={12} xs={12} sx={{ position: "relative" }}>
                <DaumPostcode setAddress={setAddress} />
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
                          <div style={{ color: "#000", padding: "5px" }}>
                            {marker.content}
                          </div>
                        )}
                      </MapMarker>
                    ))}
                  </Map>
                )}
              </Grid>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                sx={{
                  minHeight: "605px",
                  position: "relative",
                  "@media (max-width: 900px)": { minHeight: 625 },
                }}
              >
                <List
                  loginAt={!!user}
                  category={value}
                  likedPlaceArray={likedPlaceArray}
                  setLikedPlaceArray={setLikedPlaceArray}
                  places={places}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                />
                <PageNumberWrapper>{displayPagination()}</PageNumberWrapper>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Layout>
    </>
  );
};

export default MapPage;

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

const PageNumber = styled.a`
  font-size: 20px;
  text-decoration: none;
  color: #c2937e;
  padding: 15px 10px 10px 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;

  &.on {
    font-size: 25px;
    line-height: 25px;
    color: white;
    background-color: #c2937e;
    border-radius: 50%;
  }
`;

const PageNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
`;

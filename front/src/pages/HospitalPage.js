import { Container, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import Header from "../components/common/Header";
import List from "../components/hospital/List";

const HospitalPage = () => {
  const hospitalMap = useRef();

  const { kakao } = window;

  const [places, setPlaces] = useState();

  useEffect(() => {
    kakao.maps.load(function () {
      // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.

      let currentPos;

      /*** 1단계 : 지도 그리기 ***/
      var container = hospitalMap.current;
      var mapOptions = {
        // 지도를 생성할 때 필요한 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표
        level: 5, // 지도의 레벨 (확대, 축소 정도)
      };

      // 지도 생성
      var map = new kakao.maps.Map(container, mapOptions);

      /*** 2단계 : 내 위치 좌표로 중심좌표를 이동 ***/

      function success(pos) {
        const { coords } = pos; // coords: 위치 정보
        const latitude = coords.latitude; // 위도
        const longitude = coords.longitude; // 경도

        currentPos = new kakao.maps.LatLng(latitude, longitude);

        // 부드럽게 이동
        map.panTo(currentPos);

        // 키워드로 장소를 검색합니다
        searchPlaces(currentPos);
      }

      function fail(pos) {
        alert("위치 정보를 가져오는데 실패했습니다.");
      }

      function getMyLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, fail); // 성공, 실패 콜백 함수 등록
        } else {
          alert("GPS를 지원하지 않습니다.");
        }
      }

      getMyLocation();

      /*** 3단계 : 동물병원 키워드로 검색한 결과 가져오기 ***/

      // 마커를 담을 배열입니다
      var markers = [];

      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 키워드 검색을 요청하는 함수입니다
      function searchPlaces(currentPos) {
        var keyword = "동물병원";

        var searchOptions = {
          location: currentPos, // 중심 좌표
          radius: 5000, // 중심 좌표로부터의 거리(반경) 필터링 값 (미터(m) 단위)
          size: 5, // 한 페이지에 보여질 목록 개수
        };

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB, searchOptions);
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        // Callback Arguments : result(Array, 결과 목록), status(Status, 응답 코드), pagination(Pagination, Pagination 객체)
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          setPlaces(data);
          displayPlaces(data);

          // 페이지 번호를 표출합니다
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        var listEl = document.getElementById("placesList"),
          menuEl = document.getElementById("menu_wrap"),
          fragment = document.createDocumentFragment(),
          bounds = new kakao.maps.LatLngBounds(); // WGS84 좌표계에서 사각영역 정보를 표현하는 객체를 생성한다.

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition); // 인수로 주어진 좌표를 포함하도록 영역 정보를 확장한다.

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          (function (marker, title) {
            kakao.maps.event.addListener(marker, "mouseover", function () {
              displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, "mouseout", function () {
              infowindow.close();
            });

            itemEl.onmouseover = function () {
              displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
              infowindow.close();
            };
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }

      // 검색결과 항목을 Element로 반환하는 함수입니다
      function getListItem(index, places) {
        var el = document.createElement("li"),
          itemStr =
            '<div class="info">' + "   <h5>" + places.place_name + "</h5>";

        if (places.road_address_name) {
          itemStr +=
            "    <span>" +
            places.road_address_name +
            "</span>" +
            '   <span class="jibun gray">' +
            places.address_name +
            "</span>";
        } else {
          itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

        el.innerHTML = itemStr;

        el.className = "item";

        return el;
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx, title) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null); // 지도에서 제거한다.
        }
        markers = [];
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      function displayPagination(pagination) {
        var paginationEl = document.getElementById("pagination"),
          fragment = document.createDocumentFragment(),
          i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: "65px" }}>
        <Grid container>
          <Grid item md={6} sm={12} xs={12}>
            <Map ref={hospitalMap}></Map>
            <ul>
              <List places={places} />
            </ul>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <div id="menu_wrap">
              <ul id="placesList"></ul>
              <Pagination id="pagination"></Pagination>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HospitalPage;

const Map = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 400px;
`;

const Pagination = styled.div`
  margin: 10px auto;
  text-align: center;
  .on {
    font-weight: bold;
    cursor: default;
    color: #777;
  }
`;

import styled from "styled-components";

const List = ({ places, handleMouseOver, handleMouseOut }) => {
  return (
    <>
      <Ul>
        {places.map((place) => {
          return (
            <Wrapper key={place.id}>
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
            </Wrapper>
          );
        })}
      </Ul>
    </>
  );
};

export default List;

const Ul = styled.ul`
  list-style: none;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
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

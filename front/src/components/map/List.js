import styled from "styled-components";

const List = ({ places, handleMouseOver, handleMouseOut }) => {
  return (
    <>
      <Ul>
        {places.map((place) => {
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
    </>
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

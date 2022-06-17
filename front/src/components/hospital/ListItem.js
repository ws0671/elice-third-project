import styled from "styled-components";

const ListItem = ({ place, handleMouseEnter, handleMouseLeave }) => {
  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>
        <PlaceName href={place.place_url} target="_blank">
          {place.place_name}
        </PlaceName>
        <Phone>{place.phone}</Phone>
      </div>
      <Address>
        {place.road_address_name ? place.road_address_name : place.address_name}
      </Address>
    </Wrapper>
  );
};

export default ListItem;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const PlaceName = styled.a`
  text-decoration: none;
  color: #798478;
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

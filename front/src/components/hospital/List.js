import ListItem from "./ListItem";

import styled from "styled-components";

const List = ({ places }) => {
  const handleMouseEnter = () => {
    // displayInfowindow(marker, title);
  };
  const handleMouseLeave = () => {
    // infowindow.close();
  };

  return (
    <>
      <Ul>
        {places?.map((place) => {
          return (
            <ListItem
              key={place.id}
              place={place}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
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
  border: solid 1px red;
`;

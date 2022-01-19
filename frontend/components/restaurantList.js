import { gql, useQuery } from "@apollo/client";
import Dishes from "./dishes";
import { useContext, useState } from "react";

import AppContext from "./context";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import Link from "next/link";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0);
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart);
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>ERROR</p>;
  }
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`);

  let searchQuery = data.restaurants.filter((res) => {
    return res.name.toLowerCase().includes(props.search);
  });

  const RESTAURANT_PATH = "/restaurant/[id]";

  console.log(data.restaurants);
  console.log(searchQuery);

  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={`http://localhost:1337` + res.image.url}
          />
          <CardBody>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">
            {/*<Button color="info" onClick={()=> setRestaurantID(res.id)}>{res.name}</Button>*/}
            <Link
              href={{
                pathname: RESTAURANT_PATH,
                query: { id: res.id },
              }}
            >
              <Button color="info">{res.name}</Button>
            </Link>
          </div>
        </Card>
      </Col>
    ));
  } else {
    return <h1>No Restaurants Found</h1>;
  }

  return (
    <Container>
      <Row xs="3">{restList}</Row>
    </Container>
  );
}
export default RestaurantList;

import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Cart from "../../components/cart";
import Dishes from "../../components/dishes";

function Restaurant() {
  const router = useRouter();

  const { id } = router.query;

  const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }`;

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, 
    { variables: { id }});

    if (loading) return (<h1>Loading...</h1>);
    if (error) return (<h1>ERROR</h1>);


  return (
    <>
    <h1>{JSON.stringify(data)}</h1>
    <Dishes dishes={data.restaurant.dishes}></Dishes>
    <Cart></Cart>
    </>
  );
}

export default Restaurant;
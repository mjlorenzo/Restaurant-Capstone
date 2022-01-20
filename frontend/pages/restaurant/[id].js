import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Cart from "../../components/cart";
import Dishes from "../../components/dishes";
import { useState } from "react";

function Restaurant() {
  const router = useRouter();

  const [dishQuery, setDishQuery] = useState("");

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

  function handleDishQueryChange(e) {
    setDishQuery(e.target.value);
  }

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, 
    { variables: { id }});

    if (loading) return (<h1>Loading...</h1>);
    if (error) return (<h1>ERROR</h1>);

    let dishes = data.restaurant.dishes.filter((dish) => dish.name.includes(dishQuery) || dish.description.includes(dishQuery));

  return (
    <>
    <h1>{data.restaurant.name}</h1>
    <input type="text" placeholder="Search dishes.." onChange={handleDishQueryChange} />
    <Dishes dishes={dishes}></Dishes>
    <Cart></Cart>
    </>
  );
}

export default Restaurant;
import React, { useState, useContext } from "react";
import Cart from "../components/cart";
import RestaurantList from "../components/restaurantList";
import { InputGroup, InputGroupText, Input } from "reactstrap";
import AppContext from './../components/context';
import Welcome from './../components/welcome';

function Home() {
  const [query, setQuery] = useState("");
  const { user } = useContext(AppContext);

  if (!user.isAuthenticated)
    return <Welcome></Welcome>

  return (
    <>
      <div className="search">
        <h2> Local Restaurants</h2>
        <InputGroup>
          <InputGroupText> Search </InputGroupText>
          <Input
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            value={query}
          />
        </InputGroup>
        <br></br>
      </div>
      <RestaurantList search={query} />
      <Cart> </Cart>
    </>
  );
}
export default Home;

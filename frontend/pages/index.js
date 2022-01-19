import React, { useState } from "react";
import Cart from "../components/cart";
import RestaurantList from "../components/restaurantList";
import { InputGroup, InputGroupText, Input } from "reactstrap";

function Home() {
  const [query, setQuery] = useState("");

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

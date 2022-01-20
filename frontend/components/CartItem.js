import { useContext, useState } from "react";
import { Button } from "reactstrap";
import AppContext from "./context";

function CartItem({ item }) {
  const context = useContext(AppContext);
  const { addItem, removeItem, cart, setState } = context;
  const [quantity, setQuantity] = useState(1);

  const isValidQuantity = (q) => {
    return (q >= 0) && (q % 1 == 0);
  }
  function handleQuantityInput(e) {
    console.log(Number(e.target.value));
    setQuantity(Number(e.target.value));
  }

  const calcCartTotal = cart => cart.items.reduce((prev, item,) => prev + (item.price * item.quantity), 0);

  function setItemQuantity() {
    item.quantity = quantity;
    console.log(cart);
    console.log(cart.items);
    console.log(calcCartTotal(cart));
    setState({cart: { items: cart.items, total: calcCartTotal(cart) }});
  }

  return (
    <div className="items-one" style={{ marginBottom: 15 }} key={item.id}>
      <div>
        <span id="item-price">&nbsp; ${item.price}</span>
        <span id="item-name">&nbsp; {item.name}</span>
      </div>
      <div>
        <Button
          style={{
            height: 25,
            padding: 0,
            width: 15,
            marginRight: 5,
            marginLeft: 10,
          }}
          onClick={() => {
            addItem(item);
            setQuantity(item.quantity + 1);
            console.log(quantity);
          }}
          color="link"
        >
          +
        </Button>
        <Button
          style={{
            height: 25,
            padding: 0,
            width: 15,
            marginRight: 10,
          }}
          onClick={() => {
            removeItem(item);
            setQuantity(item.quantity - 1);
            console.log(quantity);
          }}
          color="link"
        >
          -
        </Button>
        <span style={{ marginLeft: 5 }} id="item-quantity">
          {item.quantity}x
        </span>
      </div>
      <div>
        <input type="number" min="0" step="1" defaultValue={item.quantity} style={{ border: isValidQuantity(quantity) ? "black" : "red" }} onInput={handleQuantityInput} />
        <Button type="info" disabled={!isValidQuantity(quantity)} onClick={setItemQuantity}>Update</Button>
      </div>
    </div>
  );
}

export default CartItem;

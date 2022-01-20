import { useContext, useState } from "react";
import Head from "next/head";
import AppContext from "../components/context";
import Home from "./index";
import Layout from "../components/layout";
import Cookie from "js-cookie";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function MyApp(props) {
  var { cart, addItem, removeItem } = useContext(AppContext);
  let appContext = useContext(AppContext);
  const [state, setState] = useState({ cart: cart });
  const [user, setUser] = useState({ user: null, isAuthenticated: false });

  const { Component, pageProps } = props;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  let link = createHttpLink({ uri: `${API_URL}/graphql` });

  const authLink = setContext((_, { headers }) => {
    const token = Cookie.get("token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  link = authLink.concat(link);

  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });
  /*appContext.setUser = (newUser) => {
    setState({ cart: { items: [], total: 0 } });
    console.log("I'm HERE!");
    if (!newUser) {
      appContext.user = null;
      appContext.isAuthenticated = false;
      return;
    }

    appContext.user = newUser;
    appContext.isAuthenticated = true;
  };*/
  addItem = (item) => {
    let { items } = state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    let foundItem = true;
    if (items.length > 0) {
      foundItem = items.find((i) => i.id === item.id);

      if (!foundItem) foundItem = false;
    } else {
      foundItem = false;
    }
    console.log(`Found Item value: ${JSON.stringify(foundItem)}`);
    // if item is not new, add to cart, set quantity to 1
    if (!foundItem) {
      //set quantity property to 1

      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      var newCart = {
        items: [...state.cart.items, temp],
        total: state.cart.total + item.price,
      };
      setState({ cart: newCart });
      console.log(`Total items: ${JSON.stringify(newCart)}`);
    } else {
      // we already have it so just increase quantity ++
      console.log(`Total so far:  ${state.cart.total}`);
      newCart = {
        items: items.map((item) => {
          if (item.id === foundItem.id) {
            return Object.assign({}, item, { quantity: item.quantity + 1 });
          } else {
            return item;
          }
        }),
        total: state.cart.total + item.price,
      };
    }
    setState({ cart: newCart }); // problem is this is not updated yet
    console.log(`state reset to cart:${JSON.stringify(state)}`);
  };
  removeItem = (item) => {
    let { items } = state.cart;
    //check for item already in cart
    const foundItem = items.find((i) => i.id === item.id);
    if (foundItem.quantity > 1) {
      var newCart = {
        items: items.map((item) => {
          if (item.id === foundItem.id) {
            return Object.assign({}, item, { quantity: item.quantity - 1 });
          } else {
            return item;
          }
        }),
        total: state.cart.total - item.price,
      };
      //console.log(`NewCart after remove: ${JSON.stringify(newCart)}`)
    } else {
      // only 1 in the cart so remove the whole item
      console.log(`Try remove item ${JSON.stringify(foundItem)}`);
      const index = items.findIndex((i) => i.id === foundItem.id);
      items.splice(index, 1);
      var newCart = { items: items, total: state.cart.total - item.price };
    }
    setState({ cart: newCart });
  };

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        addItem: addItem,
        removeItem: removeItem,
        setState,
        user,
        setUser,
      }}
    >
      <ApolloProvider client={client}>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default MyApp;

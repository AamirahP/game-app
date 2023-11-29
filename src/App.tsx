import Alert from "./Components/Alert";
import ListGroup from "./Components/ListGroup";
import Button from "./Components/Button";
import Like from "./Components/Like";
import { useState } from "react";
import NavBar from "./Components/NavBar";
import Cart from "./Components/Cart";
import Expandable from "./Components/Expandable";
import Form from "./Components/Form";
import Form2 from "./Components/Form2";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [cartItems, setCartItems] = useState(["product1", "product2"]);

  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />

      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>Hi</Alert>
      )}

      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        Button
      </Button>

      <Like onClick={() => console.log("Cliked")} />

      <NavBar cartItemsCount={cartItems.length} />

      <Cart cartItems={cartItems} />

      <Expandable>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sed neque
        expedita ducimus doloremque ipsam at unde quidem in sunt. Molestiae vero
        dignissimos voluptatum dolores delectus accusantium non impedit nobis
        tempora! Corrupti excepturi id inventore eum libero voluptates tempora,
        nobis et vel reiciendis placeat possimus, eveniet sequi fuga magnam
        minima veniam facilis, iure totam numquam. Quaerat nisi recusandae
        aliquid libero aspernatur ad incidunt in minima saepe facilis itaque,
        accusantium fugit vero explicabo qui similique magnam assumenda natus
        corporis? Inventore consectetur possimus veniam illum quasi velit
        dignissimos tempora, quas quo est, maiores reiciendis quisquam corrupti
        fugit eveniet, optio quae odit minima.
      </Expandable>
      <Form />
      <Form2 />
    </div>
  );
}

export default App;

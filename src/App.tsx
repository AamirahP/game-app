import Alert from "./Components/Alert";
import ListGroup from "./Components/ListGroup";
import Button from "./Components/Button";
import Like from "./Components/Like";
import { useState } from "react";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

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
    </div>
  );
}

export default App;

import Alert from "./Components/Alert";
import ListGroup from "./Components/ListGroup";
import Button from "./Components/Button";
import Like from "./Components/Like";
import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Cart from "./Components/Cart";
import Expandable from "./Components/Expandable";
import Form from "./Components/Form";
import Form2 from "./Components/Form2";
import ExpenseList from "./expense-tracker/Components/ExpenseList";
import ExpenseFilter from "./expense-tracker/Components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/Components/ExpenseForm";
import categories from "./expense-tracker/categories";
import ProductList from "./Components/ProductList";
import apiClient, { CanceledError } from "./services/api-client";
import userService, { User } from "./services/users-service";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Rent", amount: 1000, category: "Utilities" },
    { id: 2, description: "Food", amount: 200, category: "Groceries" },
    { id: 3, description: "TV", amount: 100, category: "Entertainment" },
    { id: 4, description: "Gym", amount: 50, category: "Utilities" },
  ]);

  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [cartItems, setCartItems] = useState(["product1", "product2"]);

  const [alertVisible, setAlertVisibility] = useState(false);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const [category, setCategory] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    apiClient.delete("/users/" + user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Aamirah" };
    setUsers([newUser, ...users]);

    apiClient
      .post("/users/", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };
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
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      <select
        name=""
        id=""
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>

      <ProductList category={category} />
      {error && <p className="danger">{error}</p>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      {isLoading && <div className="spinner-border"></div>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-y"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

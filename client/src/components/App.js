import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import MealPlan from "../pages/MealPlan";
import NewMeal from "../pages/NewMeal";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewMeal user={user} />
          </Route>
          <Route path="/">
            <MealPlan />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;

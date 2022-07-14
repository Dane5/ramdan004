import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function MealPlan(meal) {
  const [meals, setmeals] = useState([]);

  function handleDelete(){
    fetch(`/meals`,{
      method:'DELETE'
    })
    .then(res => {
      if(res.ok){
      res.json().then(console.log)
    } else {
      res.json().then(console.log)
    }
    })
  }

  useEffect(() => {
    fetch("/meals")
      .then((r) => r.json())
      .then(setmeals);
  }, []);

  return (
    <Wrapper>
      {meals.length > 0 ? (
        meals.map((meal) => (
          <Meal key={meal.id}>
            <Box>
            <Button variant="outline">
              EDIT
              </Button>
              <h2>{meal.title}</h2>
              <p>
                <em>Prep Time: {meal.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {meal.user.username}</cite>
              </p>
              <ReactMarkdown>{meal.instructions}</ReactMarkdown>
              <Button onClick={handleDelete}>
              DELETE
              </Button>
            </Box>
          </Meal>
        ))
      ) : (
        <>
          <h2>No Meals Found</h2>
          <Button as={Link} to="/new">
            Make a New meal
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Meal = styled.article`
  margin-bottom: 24px;
`;

export default MealPlan;

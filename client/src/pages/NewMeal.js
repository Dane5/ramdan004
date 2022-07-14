import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewMeal({ user }) {
  const [title, setTitle] = useState("Spicy Chicken Meal Prep With Rice And Beans");
  const [prepTime, setprepTime] = useState("20");
  const [directions, setDirections] = useState(`Here's what you do.
  
## Ingredients

- 1 cup long grain white rice (quinoa also works)
- 1 cup water
- 14 ounces of fresh salsa
- 1/2 teaspoon salt
- 1 teaspoon oil
- about 1 lb. chicken breasts, cut into 4 to 6 smallish pieces
- lots of spices like cumin, chili powder, garlic powder, and cayenne (taco seasoning also works)
- 1 14-ounce can black beans, rinsed and drained
- a handful of chopped fresh cilantro

## Directions

Cook: Place the rice, water, tomatoes, salt, and oil in the pot. 
Stir to combine. Place the chicken pieces on top and sprinkle generously with your favorite spices and some salt. 
Turn the instant pot on high pressure for 7-8 minutes. When done, use the quick release valve for the steam.
Mix: Remove the chicken. Mix the black beans (and maybe a little sunshine sauce) in with the rice.
Meal Prep Yourself: Divide the rice and beans amongst 4-6 meal prep containers. Top each with a piece of chicken. 
Sprinkle with cilantro and drizzle with a spoonful of sauce.
`);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        directions,
        prep_time: prepTime,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create Meal</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="prepTime">Prep Time</Label>
            <Input
              type="number"
              id="prepTime"
              value={prepTime}
              onChange={(e) => setprepTime(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="directions">Directions</Label>
            <Textarea
              id="directions"
              rows="40"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Meal"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{title}</h1>
        <p>
          <em>Prep Time: {prepTime} minutes</em>
          &nbsp;·&nbsp;
          <cite>By {user.username}</cite>
        </p>
        <ReactMarkdown>{directions}</ReactMarkdown>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewMeal;

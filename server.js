const express = require('express');
const recipeRouter = require('./routes/recipes.routes');
const ingridientsRouter = require ('./routes/ingridients.routes');
const fullRecipesRouter = require ('./routes/fullRecipes.routes');
const randomRouter = require('./routes/randomRecipe.routes');
const app = express ();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());



app.use('/recipes', recipeRouter);

app.use('/ingridients', ingridientsRouter);

app.use('/fullRecipes', fullRecipesRouter);

app.use('/random', randomRouter);

app.listen(3000, () => {
console.log('Server is running on port 3000.');
});

const express = require ('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req,res)=> {
    try {
        const recipeQuery = 'SELECT id, recipeName, instructions FROM recipe ORDER BY RANDOM() LIMIT 1;';

        const recipeResult = await db.query(recipeQuery);
        const selectedRecipe = recipeResult.rows[0];
        const ingredientsQuery = 'SELECT b.ingredientname FROM ingridient b INNER JOIN IngredientInRecipe c ON b.id = c.ingredientId WHERE c.recipeId = $1;';
    
        const ingredientResult = await db.query(ingredientsQuery, [selectedRecipe.id]);
        const ingredients = ingredientResult.rows.map( element => element.ingredientname);
        
        const RandomRecipe = {
            recipe: selectedRecipe,
            ingredients: ingredients
        };
        res.json(RandomRecipe);

    }

    catch(error) {
        res.status(500).json({error: 'Internal Server error.'});

    }


  
});

module.exports = router;
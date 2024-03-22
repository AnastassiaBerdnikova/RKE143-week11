const express = require ('express');
const db = require('../db');
const router = express.Router();



router.get('/', async (req, res) => {
    const ingridients = await db.query('SELECT * FROM ingridient;');
    res.json(ingridients.rows);
});

router.post('/', async (req, res)=> {
    const {ingredientname} = req.body;
    

    const data = await db.query("SELECT * FROM ingridient WHERE ingredientname =$1;", [ingredientname]);

    console.log(data.rows);

    if(data.rows.length!==0){
        res.json({message: "Ingridient already exist"});
    } else {

        try{
            const result = await db.query("INSERT INTO ingridient (ingredientname) VALUES ($1);", [ingredientname]);
            
            res.status(200).json({message: `${result.rowCount} row was added.`});
        }

        catch(error){
            console.log(error);

        }

   
    }



});

router.delete('/', async (req,res)=> {
    const {ingredientname} = req.body;
    const data = await db.query("SELECT * FROM ingridient WHERE ingredientname =$1;", [ingredientname]);
    if(data.rows.length===0) {
        res.json({message:"the is no such ingredient"});}
        else {
            try {
                const result = await db.query("DELETE FROM ingridient WHERE ingredientname = $1;", [ingredientname]);
                res.status(200).json({message: `${result.rowCount} row was deleted.`});
            }

            catch(error) {
            console.log(error);
            }
        }

});

module.exports = router;
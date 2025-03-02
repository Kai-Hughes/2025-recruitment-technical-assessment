import express, { Request, Response } from "express";
import { get } from "http";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbookEntry[] = [];

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  // TODO: implement me
  let parsedName = recipeName.replace(/[1234567890!@#$%&*()\\/+=]/g, "").replace(/[_-]/g, " ");
  let splitName = parsedName.split(" ")

  recipeName = "";
  for (let i = 0; i < splitName.length; i++) {
    if (splitName[i].length > 0) { // ignore the spaces in the list to prevent dupes
      recipeName += splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1).toLowerCase() + " ";
    }
  }
  recipeName = recipeName.trim();

  if (recipeName.length == 0) {
    recipeName = null;
  }
  return recipeName
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  // TODO: implement me

  // checks for a duplicat entry
  for (let i = 0; i < cookbook.length; i++) {
    if (cookbook[i].name === req.body.name) {
      return res.status(400).send(cookbook);
    }
  }

  if (req.body.type == "ingredient") {
    let ing: ingredient = req.body;
    if (ing.cookTime < 0) {
      return res.status(400).send("Error");
    }
    cookbook.push(ing);
    return res.status(200).send({});
  }
  else if (req.body.type == "recipe") {
    let rec: recipe = req.body;
    for (let i = 0; i < rec.requiredItems.length; i++) {
      for (let j = rec.requiredItems.length - 1; j > i; j++) {
        if (rec.requiredItems[i].name == rec.requiredItems[j].name) {
          return res.status(400).send("Error");
        } // Could be wrong but i understood this as you can't have duplciate required item based on the spec
      }
    }
    cookbook.push(rec);
    return res.status(200).send({});
  }
  else {
    return res.status(400).send("Error");
  }

});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // // TODO: implement me
  // let superRecipe: recipe = req.body;
  // for (let i = 0; i < superRecipe.requiredItems.length; i++) {
  //   let name = superRecipe.requiredItems[i].name;
  //   for (let j = 0; j < cookbook.length; i++) {
  //     if (name == cookbook[j].name && cookbook[j].type == "recipe") {
  //       // // ok so we found a recipe has a required ingredient
  //       // // lets search through that recipe now 
  //       // // we can pass in the cookbook index and the name
  //       // // getIngredients(cookbook[j] as recipe, j);
  //       // let nextRecipe = cookbook[i] as recipe;
  //       // let addIngredients = [];
  //       // for (let k = 0; k < nextRecipe.requiredItems.length; k++) {
  //       //   addIngredients.push(nextRecipe[i]);
  //       // }
  //       // let isIncluded: Boolean = false;
  //       // }
  //       superRecipe.requiredItems.splice(i);
  //       let entry: recipe = cookbook[j] as recipe;
  //       let stuff = [];
  //       for (let k = 0; k < entry.requiredItems.length; k++) {
  //         let addIng = superRecipe.requiredItems.findIndex(ingName => ingName.name == entry.requiredItems[k].name && entry.requiredItems[k].);
  //         if (addIng) {
            
  //         }
  //         else {

  //         }
  //       }
  //       for (let k = 0; k < entry.requiredItems.length; k++)
  //       let addIng = superRecipe.requiredItems.findIndex(ingName => ingName.name ==)
  //     }
      
  //     }
  // }
  res.status(500).send("not yet implemented!")

});


  // TODO: implement me



// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});

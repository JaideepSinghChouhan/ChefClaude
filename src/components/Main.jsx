import React from "react"
import IngredientsList from "./IngredientList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromGemini } from "../../ai"
export default function Main(){
    
    const [ingredients, setIngredients] = React.useState([])
   
    const [recipe, setRecipe] = React.useState("")
    const recipeSection=React.useRef(null)
    
    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromGemini(ingredients)
        setRecipe(recipeMarkdown)
    }

    React.useEffect(()=>{
        if(recipe!==""&& recipeSection.current!==null){
            recipeSection.current.scrollIntoView({behaviour:"smooth"})
        }
    },[recipe])
    
    function addIngredient(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
    
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    
        event.target.reset(); // Optional: Clears input field after submission
    }
    // const handleSubmit=(event)=>{
    //     event.preventDefault()
    //     addIngredient()
    // }
    return(
        <>
        <main>
            <h3>Give me atleast 4 ingredients🗒 to get the Idea💡 what to make🥦 today</h3>
            <form onSubmit={(event)=>addIngredient(event)} className="add-ingredient-form" >
                <input 
                type="text"
                placeholder="e.g. oregano"
                aria-label="Add ingredients" 
                name="ingredient"
                />
                <button>Add ingredients</button>
            </form>
            {
            ingredients.length>0 &&
                <IngredientsList 
                ref={recipeSection} 
                ingredients={ingredients} 
                getRecipe={getRecipe}
                />
            }
            {recipe && <ClaudeRecipe recipe={recipe} />}

        </main>
        </>
    )
}
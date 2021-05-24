import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = ()=> {
  const [ userIngredients, setUserIngredients ] = useState([])
  
  // handler called from form to update ingreds and pass it to the list
  const addIngHandler = (ingredient) => {
    // use fetch for a POST message
    fetch('https://hookrepetition-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        { id: responseData.name, ...ingredient }
      ])
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;

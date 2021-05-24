import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = ()=> {
  const [ userIngredients, setUserIngredients ] = useState([])
  
  const addIngHandler = (ingredient) => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients, 
      { id: Math.random().toString(), ...ingredient}
    
    ])
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

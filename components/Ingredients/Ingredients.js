import React, {useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = ()=> {
  const [ userIngredients, setUserIngredients ] = useState([])
  /*
  useEffect(() => {
    // get Data
    fetch('https://hookrepetition-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
    .then(response => response.json())
    .then(responseData => {
      const loadedIngredients = []
      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setUserIngredients(loadedIngredients)
    })
  }, [])
*/
  // for search component
  const filteredIngredientsHandler = useCallback(fileredIngredients => {
    setUserIngredients(fileredIngredients)
  }, [])

  // handler called from form to update ingreds and pass it to the list
  const addIngHandler = (ingredient) => {
    // use fetch for a POST message to POST data into Firebase
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
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}}/>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;

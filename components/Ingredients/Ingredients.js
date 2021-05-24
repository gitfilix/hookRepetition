import React, {useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

const Ingredients = ()=> {
  const [ userIngredients, setUserIngredients ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setIsError ] = useState()
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
    setIsLoading(true)
    // use fetch for a POST message to POST data into Firebase
    fetch('https://hookrepetition-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false)
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        { id: responseData.name, ...ingredient }
      ])
    })
  }

  const removeIngHandler = (ingredientId) => {
    setIsLoading(true)
    fetch(`https://hookrepetition-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      setIsLoading(false)
      setUserIngredients(prevIngredients => 
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      )
    }).catch(error => {
      setIsError('something went wrong')
    }) 
  }

  const clearError = () => {
    setIsError(null)
    setIsLoading(false)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngHandler} 
        loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;

import React, {useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

const ingReducer = (currentIngredients, action) => {
    switch(action.type) {
      case 'SET':
        return action.ingredients
      case 'ADD':
        return [...currentIngredients, action.ingredient]
      case 'DELETE':
        return currentIngredients.filter(ing => ing.id !== action.id)
      default:
        throw new Error('Reducer Error: Should not get there! no case match ')
    }
}

const Ingredients = ()=> {
  // reducer init: state (here userIngredients, dispatch) 
  // useReducer: reducer function, initial state: here []
  const [ userIngredients, dispatch ] = useReducer(ingReducer, [])
  // const [ userIngredients, setUserIngredients ] = useState([])
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
    // setUserIngredients(fileredIngredients)
    dispatch({type: 'SET', ingredients: fileredIngredients})
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
      // setUserIngredients(prevIngredients => [
      // ...prevIngredients, 
      // { id: responseData.name, ...ingredient }
      // ])
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient }})
    })
  }

  const removeIngHandler = (ingredientId) => {
    setIsLoading(true)
    fetch(`https://hookrepetition-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      setIsLoading(false)
      // setUserIngredients(prevIngredients => 
        // prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      // )
      dispatch({ type: 'DELETE', id: ingredientId })
      
    }).catch(error => {
      setIsError('something went wrong')
      setIsLoading(false)
    }) 
  }

  const clearError = () => {
    setIsError(null)
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

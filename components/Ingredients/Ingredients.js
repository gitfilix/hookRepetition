import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';
import useHttp from '../hooks/http';

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
  const [ userIngredients, dispatch ] = useReducer(ingReducer, [])
  const { isLoading, error, data, sendRequest } = useHttp()

  // reducer init: state (here userIngredients, dispatch) 
  // useReducer: reducer function, initial state: here []
  // const [ httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null})
  // const [ isLoading, setIsLoading ] = useState(false)
  // const [ error, setIsError ] = useState()

  // for search component
  const filteredIngredientsHandler = useCallback(fileredIngredients => {
    // setUserIngredients(fileredIngredients)
    dispatch({type: 'SET', ingredients: fileredIngredients})
  }, [])

  // handler called from form to update ingreds and pass it to the list
  // now with useCallback! 
  const addIngHandler = useCallback((ingredient) => {
    // useHTTP reducer here:
   /* dispatchHttp({ type: 'SEND' })
    // setIsLoading(true)
    // use fetch for a POST message to POST data into Firebase
    fetch('https://hookrepetition-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' })
      // setIsLoading(false)
      return response.json()
    }).then(responseData => {
      // setUserIngredients(prevIngredients => [
      // ...prevIngredients, 
      // { id: responseData.name, ...ingredient }
      // ])
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient }})
    })
    */
  }, [])

  const removeIngHandler = useCallback((ingredientId) => {
    sendRequest(`https://hookrepetition-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`, 
    'DELETE'
    )
  }, [sendRequest])

  const clearError = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR' })
    // setIsError(null)
  }, [])

  //use MEMO
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngHandler}
      />
    )
  }, [userIngredients,removeIngHandler])

  return (
    <div className="App">
      {error && (
        <ErrorModal onClose={clearError}>{error}</ErrorModal>
        )}
      <IngredientForm 
        onAddIngredient={addIngHandler} 
        loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        { ingredientList }
      </section>
    </div>
  );
}

export default Ingredients;

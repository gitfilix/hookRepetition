//custom hook begins with use
import { useReducer, useCallback, useContext } from "react"

const httpReducer = (prevHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null, extra: null, identifier: action.identifier }
    case 'RESPONSE':
      return { ...prevHttpState, loading: false, data: action.responseData, extra: action.extra }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...prevHttpState, error: null }
    default: throw new Error('httpReducer unknown Error - should not be reached.')
  }
}

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, { 
    loading: false, 
    error: null, 
    data: null,
    extra: null,
    identifier: null
  })

  const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
    dispatchHttp({ type: 'SEND', identifier: reqIdentifier})
    fetch(url, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        return response.json()
    })
    .then(responseData => {
      dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra })
    })
    .catch(error => {
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something when wrong here' })
    })
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier
  }
}

export default useHttp


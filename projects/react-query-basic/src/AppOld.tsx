import './App.css'
import { useEffect, useReducer, useState } from 'react'
import { getRandomNumberFromApi } from './utils/fetcher'

export default function AppOld() {
  const [number, setNumber] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [key, forceRefetch] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi()
      .then((res) => setNumber(res))
      .catch((err) => setError(err.message))
  }, [key])

  useEffect(() => {
    if (number) setIsLoading(false)
  }, [number])
  
  useEffect(() => {
    if (error) setIsLoading(false)
  }, [error])

  return (
    <div className='App App-header'>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>Número aleatorio: {number}</h2>
      )}
      
      {!isLoading && error && (
        <h3>{error}</h3>
      )}

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? '...' : 'Nuevo número'}
      </button>
    </div>
  )
}

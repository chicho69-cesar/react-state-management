/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseByNumber, reset, sub, sum } from '../store/slices/counter.slice'

export default function Counter() {
  const count: number = useSelector((state: any) => state.counter.count)
  const dispatch = useDispatch()
  
  const [increaseNumber, setIncreaseNumber] = useState(0)

  const addValue = Number(increaseNumber) || 0

  const resetNumber = () => {
    setIncreaseNumber(0)
    dispatch(reset())
  }

  return (
    <div>
      <p>{count}</p>

      <button onClick={() => dispatch(sum())}> + </button>
      <button onClick={() => dispatch(sub())}> - </button>
      <button onClick={resetNumber}> RESET </button>
      
      <input
        type='text'
        value={increaseNumber}
        onChange={(e) => setIncreaseNumber(+e.target.value)}
      />

      <button onClick={() => dispatch(increaseByNumber(addValue))}>
        AGREGAR VALOR
      </button>
    </div>
  )
}

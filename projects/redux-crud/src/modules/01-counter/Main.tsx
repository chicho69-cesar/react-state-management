import { Provider } from 'react-redux'
import Counter from './components/Counter'
import { store } from './store/store'

export default function Main() {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  )
}

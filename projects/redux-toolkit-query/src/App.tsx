import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PostList from './pages/PostList'
import EditPost from './pages/EditPost'
import SoloPost from './pages/SoloPost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PostList />}/> 

          <Route path='post'>
            <Route path='edit/:postId' element={<EditPost />}/>
            <Route path=':postId' element={<SoloPost />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

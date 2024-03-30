import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import PostList from './pages/PostList'
import SoloPost from './pages/SoloPost'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path='post'>
          <Route index element={<AddPost />} />
          <Route path=':postId' element={<SoloPost />} />
          <Route path='edit/:postId' element={<EditPost />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

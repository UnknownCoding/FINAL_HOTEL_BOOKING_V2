import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <p>Home</p>
          </Layout>
          }/>
        <Route path="/search" element={
          <Layout>
            <p>Search</p>
          </Layout>
          }/>
        <Route path="/registar" element={
          <Layout>
            <Register/>
          </Layout>
          }/>
        <Route path="/sign-in" element={
          <Layout>
            <SignIn/>
          </Layout>
          }/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

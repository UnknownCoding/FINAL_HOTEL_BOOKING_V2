import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { useAppContext } from './contexts/AppContext'
import AddHotels from './pages/AddHotels'

function App() {
  const {isLoggedIn} = useAppContext();
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
          {isLoggedIn && (
            <>
              <Route path="/add-hotel" element={
                <Layout>
                  <AddHotels/>
                </Layout>
              }/>
            </>
          )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

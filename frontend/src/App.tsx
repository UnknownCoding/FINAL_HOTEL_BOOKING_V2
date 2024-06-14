import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { useAppContext } from './contexts/AppContext'
import AddHotels from './pages/AddHotels'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'
import Search from './pages/Search'
<<<<<<< HEAD
import Details from './pages/Details'
import Booking from './pages/Booking'
=======
>>>>>>> parent of ee60405 (added details page for individual hotels and e2e testing)

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
            <Search/>
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
              <Route path='/my-hotels' element={
                <Layout>
                  <MyHotels/>
                </Layout>
              }/>
              <Route path='/edit-hotel/:id' element={
                <Layout>
                  <EditHotel/>
                </Layout>
              }/>
              <Route path='/hotel/:id/booking' element={
                <Layout>
                  <Booking/>
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

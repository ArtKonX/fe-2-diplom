import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import TrainSelection from './pages/TrainSelection'
import SelectionPlaces from './pages/SelectionPlaces'
import PassengersPage from './pages/PassengersPage'
import PaymentPage from './pages/PaymentPage'
import OrderPage from './pages/OrderPage'
import SuccessOrderPage from './pages/SuccessOrder'

function App() {

  return (
    <>
      <BrowserRouter basename='/fe-2-diplom'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/train-selection" element={<TrainSelection />} />
          <Route path="/selection-places" element={<SelectionPlaces />} />
          <Route path="/passengers" element={<PassengersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/success-order" element={<SuccessOrderPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

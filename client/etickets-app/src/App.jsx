import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AllTicketsPage from './pages/AllTicketsPage';
import UserProvider from './providers/UserProvider';
import EventPage from './pages/EventPage';
import EventFilter from './pages/EventFilter';
import UserAccountPage from './pages/UserAccountPage';
import AddEventPage from './pages/AddEventPage';
import UpdateEvent from './pages/UpdateEvent';
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<AllTicketsPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-account" element={<UserAccountPage />} />
            <Route path="/filter" element={<EventFilter />} />
            <Route path="/event/:eventId" element={<EventPage />} />
            <Route path="/event/add-event" element={<AddEventPage />} />
            <Route
              path="/event/update-event/:eventId"
              element={<UpdateEvent />}
            />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

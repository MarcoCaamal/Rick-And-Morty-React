import { Route, Routes } from 'react-router'

import { AppLayout } from './layouts/AppLayout'
import Home from './pages/Home'
import Characters from './pages/Characteres'
import { Login } from './pages/Login'
import { Users } from './pages/Users'
import { Clients } from './pages/Clients'
import { UserDetails } from './pages/UserDetails'
import { UserUpdate } from './pages/UserUpdate'
import CharacterDetails from './pages/CharacterDetails'
import { ClientDetails } from './pages/ClientDetails'
import { Register } from './pages/Register'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/characters/:id' element={<CharacterDetails />} />
      </Route>
    </Routes>
  );
}

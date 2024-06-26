// eslint-disable-next-line no-unused-vars
import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import UploadPage from "./pages/UploadPage"
import ProtectedRoute from "./components/ProtectedRoute"
import ShareFile from "./components/ShareFile"
import UserFilesList from "./components/UserFilesList"
import GetSharedFiles from './components/GetSharedFiles';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/files" element={<UserFilesList />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/shared-files" element={<GetSharedFiles />} />
        <Route path="share-file" element={<ShareFile />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
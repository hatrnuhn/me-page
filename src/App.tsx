import Welcome from "./pages/Welcome"
import "./App.css"
import GlobalProvider from "./providers/Global"
import WelcomeProvider from "./providers/Welcome"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {

  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={
            <main className="dark:bg-dark grow overflow-hidden">
              <WelcomeProvider>
                <Welcome/>
              </WelcomeProvider>
            </main>
          } 
        />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </GlobalProvider>
  )
}

export default App

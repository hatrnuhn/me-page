import Welcome from "./pages/Welcome"
import "./App.css"
import GlobalProvider from "./providers/Global"
import WelcomeProvider from "./providers/Welcome"

function App() {

  return (
    <GlobalProvider>
      <main className="dark:bg-dark grow overflow-hidden">
        <WelcomeProvider>
          <Welcome/>
        </WelcomeProvider>
      </main>
    </GlobalProvider>
  )
}

export default App

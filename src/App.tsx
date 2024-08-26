import Welcome from "./pages/Welcome"
import "./App.css"
import GlobalProvider from "./components/Welcome/providers/Global"

function App() {

  return (
    <GlobalProvider>
      <main className="dark:bg-dark grow">
        <Welcome/>
      </main>
    </GlobalProvider>
  )
}

export default App

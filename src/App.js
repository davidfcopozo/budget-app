
import Parent from "./components/Parent";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemesProvider } from "./contexts/ThemesContext";



function App() {
  return <>
  <LanguageProvider>
    <ThemesProvider>
      <Parent />
    </ThemesProvider>
  </LanguageProvider>
 </>
  
}

export default App;

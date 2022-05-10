import { useState } from "react";
import { Button, Navbar, Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container"
import AddBudgetModal from "../components/AddBudgetModal";
import AddExpenseModal from "../components/AddExpenseModal";
import BudgetCard from "../components/BudgetCard";
import UncategorizedBudgetCard from "../components/UncategorizedBudgetCard";
import TotalBudgetCard from "../components/TotalBudgetCard";
import { UNCATEGORIZED_BUDGETID, useBudgets } from "../contexts/BudgetsContext";
import ViewExpensesModal from "../components/ViewExpensesModal";
import ThemeButton  from "../components/ThemeButton";
import  { ThemesProvider, useTheme } from "../contexts/ThemesContext";
import useLocalStorage from "../hooks/useLocalStorage";
import  {LanguageSelect}  from "../components/LanguageSelect";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "../components/Languages";



function Parent() {

  /* Handles the state of "Show" prop in AddBudgetModal.js*/
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  /* Handles the state of "Show" prop in AddExpenseModal.js*/
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  /* const browserLanguage = window.navigator.language 
  const dynamicLang = browserLanguage === "en" ? "english" : "spanish"
  const [ lang, setLang ]=useState(dynamicLang) */

  const lang = useDynamicLang()

  const darkTheme = useTheme()
  const containerDark = useTheme()
  
let darker = containerDark ? "bg-dark" : "bg-light"
let titleStyle = {
  color: containerDark ? "white" : "#000",

}
 
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
    
    console.log(darker)
    console.log(containerDark)
  }

  
  return <> 
  {/* React Bootstrap container to wrap the app up */}  
  
    <Container style={{minWidth: "100%"}} className={darker}>
      <Container tyle={{minHeight: "90%"}} className={darker}>
        <Navbar size="sm" className={"justify-content-end"} >
            <Stack direction="horizontal" gap="2" className="mb-4" >
                <ThemeButton />
                <LanguageSelect />
            </Stack>
        </Navbar>
      
      {/* Stacks buttons horizontally with 2 rem gap or margin */}
      <Stack direction="horizontal" gap="2" className="mb-4" >
        <h1 style={titleStyle} className="me-auto title">{content[lang]["titles"]["budgets"]}</h1>
        <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)} className="add-budget-btn" >{content[lang]["buttons"]["addBudget"]}</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal} className="add-expense-btn">{content[lang]["buttons"]["addExpense"]}</Button>
      </Stack>
      <div style={{display: "grid",
      gridTemplateColums: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1rem",
      alignItems: "flex-start",
    }}>

        {budgets.map(budget=> {
          const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
          return (
            <BudgetCard 
            key={budget.id}
            name={budget.name} 
            amount={amount} 
            max={budget.max}
            onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
            onViewExpenseClick={()=>setViewExpensesModalBudgetId(budget.id)}
        />
          )
        })}

        <UncategorizedBudgetCard
        onAddExpenseClick={openAddExpenseModal}
        onViewExpenseClick={()=>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGETID)}
        />

        <TotalBudgetCard style={{marginBottom: "10rem"}}/>
      </div>
      </Container>
    </Container>
    
    <AddBudgetModal 
    show={showAddBudgetModal} 
    handleClose={()=>setShowAddBudgetModal(false)} 
    />

    <AddExpenseModal 
    show={showAddExpenseModal} 
    defaultBudgetId={addExpenseModalBudgetId} 
    handleClose={()=>setShowAddExpenseModal(false)} 
    />
    
    <ViewExpensesModal 
    budgetId={viewExpensesModalBudgetId}
    handleClose={()=>setViewExpensesModalBudgetId()} 
    />
  
  </>
  
}

export default Parent;

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
import  { useTheme } from "../contexts/ThemesContext";
import  {LanguageSelect}  from "../components/LanguageSelect";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "../components/Languages";
import logo from "../assets/logo.png"



function Parent() {

  /* Handles the state of "Show" prop in AddBudgetModal.js*/
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  /* Handles the state of "Show" prop in AddExpenseModal.js*/
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  const lang = useDynamicLang()

  const containerDark = useTheme()
  
let darker = containerDark ? "bg-dark" : "bg-light";

let titleStyle = {
  color: containerDark ? "white" : "#000",
  transition: "all 0.8s ease-in"
}
 
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
    
    console.log(darker)
    console.log(containerDark)
  }

  
  return <> 
  {/* React Bootstrap container to wrap the app up */}  
    <Container style={{minWidth: "100%", height: "100vh"}} className={darker}>
      <Container tyle={{minWidth: "90%"}} className={`${darker} align-content-center`}>
        <Navbar size="sm" className={"justify-content-md-between "} >
          <Navbar.Brand>
          <img
            src={logo}
            width="120"
            height="120"
            className={"justify-content-start"}
            alt="Budget Buddy"
          />
    </Navbar.Brand>
            <Stack direction="horizontal" gap="2" className="mb-4 align-items: end" >
                <ThemeButton  />
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

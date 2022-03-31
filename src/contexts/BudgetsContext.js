import React, { useContext } from 'react'
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from '../hooks/useLocalStorage'

// Create a context
const BudgetsContext = React.createContext();

// Make and saved in a variable the ID for uncategorized budgets
export const UNCATEGORIZED_BUDGETID = "Uncategorized"

// Create and make the hook exportable
/* This hook uses the BudgetsContext that enable us to access all of the props wrapped around
  <BudgetsContext.Provider /> in any component we export it to */
export function useBudgets() {
  return useContext(BudgetsContext)
}

/* budget

{
  id:
  name:
  max:
}

expense
{
  id:
  budgetId:
  amount:
  description:
}
 */

/* This function provides all the data we want to pass to <BudgetsContext.Provider /> as prop using 
childen as parameter, all data insed it, passes to childen so we can use it as value in 
<BudgetsContext.Provider />*/
export const BudgetsProvider = ({ children })=>{
  
  const [budgets, setBudgets]= useLocalStorage("budgets", []),
    [expenses, setExpenses] = useLocalStorage("expenses",[]);
      
      function getBudgetExpenses(budgetId) {
        return expenses.filter(expense=> expense.budgetId === budgetId); 
      };
  
      function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses=> {
          if (prevExpenses.find(expense=> expense.name === budgetId)) {
            return prevExpenses
          }
          return [...prevExpenses, {id: uuidV4(), description, amount, budgetId }]
        })
      };
  
      function addBudget({ name, max }) {
        
        setBudgets(prevBudgets=> {
          if (prevBudgets.find(budget=> budget.name === name)) {
            return prevBudgets
          }
          return [...prevBudgets, {id: uuidV4(), name, max}]
        })
      };
  
      function deleteExpense({ id }) {
        setExpenses(prevExpenses=>{ 
          return prevExpenses.filter(expense => expense.id !== id)
        })
      }
  
      function deleteBudget({ id }) {
        setExpenses(prevExpenses =>{
          return prevExpenses.map(expense=> {
            if(expense.budgetId !== id) return expense
            
            return{ ...expense, budgetId: UNCATEGORIZED_BUDGETID }
          })
        })

        setBudgets(prevBudgets=>{ 
          return prevBudgets.filter(budget => budget.id !== id)
          })
      }

  return (
  <BudgetsContext.Provider value={{
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteExpense,
    deleteBudget
    }}>
    {children}
  </BudgetsContext.Provider>
  )
}
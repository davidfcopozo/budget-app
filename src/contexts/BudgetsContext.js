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


/* This function provides all the data we want to pass to <BudgetsContext.Provider /> as prop using 
childen as parameter, all data insed it, passes to childen so we can use it as value in 
<BudgetsContext.Provider />*/
export const BudgetsProvider = ({ children })=>{
  
  /* Make states for budgets, expenses and theme and set them to local storage, the first parameter being
    the key and the second one the value*/

  const [budgets, setBudgets]= useLocalStorage("budgets", []),
    [expenses, setExpenses] = useLocalStorage("expenses",[])
      
      /* Function that gets the expenses of a budget making sure that the expenses share the ID of the
      budget in question */
      function getBudgetExpenses(budgetId) {
        return expenses.filter(expense=> expense.budgetId === budgetId); 
      }
  
      /* Function to add an expense and checks if there is any previous expense to add it to them.
      1- Checks if the expense had already been added to return the same previous expenses.
      2- If it is a new expense then it will add it to the previous expenses list asigning a new ID,
      and the budgetId it corresponds to. */
      function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses=> {
          if (prevExpenses.find(expense=> expense.name === budgetId)) {
            return prevExpenses
          }
          return [...prevExpenses, {id: uuidV4(), description, amount, budgetId }]
        })
      };
      
      /* Function to add a Budget 
      1- Checks if the Budget had already been added to return the same previous Budgets.

      2- If it is a new Budget then it will add it to the previous Budgets list asigning a new ID, name
      and the budget max value. */
      function addBudget({ name, max }) {
        
        setBudgets(prevBudgets=> {
          if (prevBudgets.find(budget=> budget.name === name)) {
            return prevBudgets
          }
          return [...prevBudgets, {id: uuidV4(), name, max}]
        })
      };
  
      /* Function to delete an expense
      1- It will re-set all of the previous expenses as long as they do not have the expense's ID in question
      using filter so that it will re-set all of the expenses but the one being deleted. */
      function deleteExpense({ id }) {
        setExpenses(prevExpenses=>{ 
          return prevExpenses.filter(expense => expense.id !== id)
        })
      }
  
      /* Function to delete a Budget
      1- It will re-set all of the expenses by checking if they do not share the same ID with the budget
      being deleted and if they do share the same ID then it will add those expenses from the budget
      being deleted and add them to the Uncategorized budget.

      2- It will re-set all of the previous Budgets as long as they do not have the Budget's ID in question
      using filter so that it will re-set all of the Budgets but the one being deleted. 
      
      3- And will re-set all of the previous Budgets but the one being deleted.*/
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
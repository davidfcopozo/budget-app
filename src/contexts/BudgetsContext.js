import React, { useState, useContext } from 'react'
import { v4 as uuidV4 } from "uuid"

const BudgetsContext = React.createContext()

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
export const BudgetsProvider = ({ children })=>{
  
  const [budgets, setBudgets]= useState([]),
    [expenses, setExpenses] = useState([]);
      
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
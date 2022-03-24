import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import React from 'react'
import { currencyFormatter } from '../utils'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGETID, useBudgets } from '../contexts/BudgetsContext';



export default function UncategorizedBudgetCard({ props }) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGETID).reduce((total, expense) => total + expense.amount, 0);
  
  if(amount === 0) return null
  
  return (
    <BudgetCard amount={amount} name="Uncategorized" gray {...props}/>
  )
}

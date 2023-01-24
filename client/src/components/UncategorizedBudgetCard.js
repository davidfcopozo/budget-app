import React from 'react'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGETID, useBudgets } from '../contexts/BudgetsContext';
import { useDynamicLang } from "../contexts/LanguageContext"
import { content } from "../components/Languages"


export default function UncategorizedBudgetCard({ ...props }) {
    const lang = useDynamicLang()

  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGETID).reduce((total, expense) => total + expense.amount, 0);
  
  if(amount === 0) return null
  
  return (
    <BudgetCard amount={amount} name={content[lang]["titles"]["uncategorized"]} gray {...props}/>
  )
}

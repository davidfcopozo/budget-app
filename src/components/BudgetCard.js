import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import React from 'react'
import { currencyFormatter } from '../utils'
import { useTheme } from '../contexts/ThemesContext';
import { content } from "./Languages"
import { useDynamicLang } from "../contexts/LanguageContext"



export default function BudgetCard({ name, amount, max, gray, onAddExpenseClick, hideButtons, onViewExpenseClick }) {
  
const containerDark = useTheme()
  
  const lang = useDynamicLang()


  const classNames = [];
  if(amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
    <Card className={classNames.join(" ")} >
      <Card.Body >
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
              {currencyFormatter.format(amount)} 
              {max && <span className="text-muted fs-6">
                / {currencyFormatter.format(max)}
              </span>}
              
          </div>
        </Card.Title>
       {max && <ProgressBar 
        className="rounded-pill" 
        variant={getProgressBarVariant(amount, max)} 
        now={amount} 
        min={0} 
        max={1000}/>}
        {!hideButtons && <Stack direction='horizontal' gap="2" className="mt-4" >
          <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick} >{content[lang]["buttons"]["addExpense"]}</Button>
          <Button variant="outline-secondary" onClick={onViewExpenseClick} >{content[lang]["titles"]["viewExpensesTitle"]}</Button> 
        </Stack>}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if(ratio < 0.5) return "primary"
    if(ratio < 0.75) return "warning"
    return "danger"
}
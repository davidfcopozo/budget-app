import { Button, Modal, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGETID, useBudgets } from "../contexts/BudgetsContext"

export default function ViewExpensesModal({ budgetId, handleClose}) {
   
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
    
    const budget = UNCATEGORIZED_BUDGETID === budgetId ? {name: "Ucategorized", id: UNCATEGORIZED_BUDGETID} : budgets.find(b=> b.id === budgetId)
    return (
    <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2" >
                        {/* If we have a budget defined budget, show it, otherwise ignore it */}
                    <div>Expenses - {budgets?.name}</div>
                    {/* avoid deleting the uncategorized button by the condition set out below */}
                    {budgetId != UNCATEGORIZED_BUDGETID && (
                        <Button variant="outline-danger" onClick={()=> {
                            deleteBudget(budget)
                            handleClose()
                        }} >Delete</Button>
                    )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
    </Modal>
  )
}

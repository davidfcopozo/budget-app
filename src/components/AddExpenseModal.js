import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from "react"
import { UNCATEGORIZED_BUDGETID, useBudgets } from "../contexts/BudgetsContext"

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef(),
    amountRef = useRef(),
    budgetIdRef = useRef()

    const { addExpense, budgets } = useBudgets()
    
    function handleSubmit(e){
        e.preventDefault()
        addExpense({
        description: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value),
        budgetId: budgetIdRef.current.value
        })
        handleClose()
    }

    return (
    <Modal show={show} onClose={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount" >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountRef} type="number" min={0} step={0.01} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="budgetId" >
                    <Form.Label>Budget</Form.Label>
                    <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId} >
                        <option id={UNCATEGORIZED_BUDGETID}>Uncategorized</option>
                        {budgets.map(budget =>(
                            <option key={budget.id} value={budget.id} >{budget.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" >Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}

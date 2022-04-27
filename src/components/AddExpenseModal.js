import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from "react"
import { UNCATEGORIZED_BUDGETID, useBudgets } from "../contexts/BudgetsContext"
import { useDynamicLang } from "../contexts/LanguageContext"
import { content } from "../components/Languages"

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef(),
    amountRef = useRef(),
    budgetIdRef = useRef()

    const lang = useDynamicLang()

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
    <Modal show={show} onHide={handleClose} >
        <Form onSubmit={handleSubmit} >
            <Modal.Header closeButton>
                <Modal.Title>{content[lang]["titles"]["newExpense"]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description" >
                    <Form.Label>{content[lang]["addExpenseForm"]["description"]}</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount" >
                    <Form.Label>{content[lang]["addExpenseForm"]["amount"]}</Form.Label>
                    <Form.Control ref={amountRef} type="number" min={0} step={0.01} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="budgetId" >
                    <Form.Label>{content[lang]["addExpenseForm"]["budget"]}</Form.Label>
                    <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId} >
                        <option id={UNCATEGORIZED_BUDGETID}>{content[lang]["titles"]["uncategorized"]}</option>
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

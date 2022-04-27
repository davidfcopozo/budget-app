import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"
import { useDynamicLang } from "../contexts/LanguageContext"
import { content } from "./Languages"

export default function AddBudgetModal({ show, handleClose, name, max }) {
    const nameRef = useRef(),
    maxRef = useRef()
    const { addBudget } = useBudgets()
    const lang = useDynamicLang()

    
    
    function handleSubmit(e){
        e.preventDefault()
        addBudget({
        name: nameRef.current.value,
        max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }
    return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>{content[lang]["titles"]["budgets"]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name" >
                    <Form.Label>{content[lang]["addBudgetForm"]["name"]}</Form.Label>
                    <Form.Control ref={nameRef} type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="max" >
                    <Form.Label>{content[lang]["addBudgetForm"]["maximunSpending"]}</Form.Label>
                    <Form.Control ref={maxRef} type="number" min={0} step={0.01} required/>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" >{content[lang]["buttons"]["addBudget"]}</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}

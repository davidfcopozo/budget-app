import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET, useBudgets } from "../contexts/BudgetsContext";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "../components/Languages";
import { useAuth } from "../contexts/AuthContext";

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const descriptionRef = useRef(),
    amountRef = useRef(),
    budgetIdRef = useRef();

  const lang = useDynamicLang();

  const { addExpense, budgets } = useBudgets();
  const { currentUser } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const expense = {
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      budgetId: budgetIdRef.current.value,
      createdBy: currentUser.uid,
    };
    addExpense(expense);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{content[lang]["titles"]["newExpense"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>
              {content[lang]["addExpenseForm"]["description"]}
            </Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>{content[lang]["addExpenseForm"]["amount"]}</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={0.01}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>{content[lang]["addExpenseForm"]["budget"]}</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
              <option id={UNCATEGORIZED_BUDGET}>
                {content[lang]["titles"]["uncategorized"]}
              </option>
              {budgets?.map((budget) => (
                <option key={budget._id} value={budget._id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              {content[lang]["buttons"]["addButton"]}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET, useBudgets } from "../contexts/BudgetsContext";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "../data/Languages";
import { useAuth } from "../contexts/AuthContext";

export default function EditExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
  expenseId,
}) {
  const descriptionRef = useRef(),
    amountRef = useRef(),
    budgetIdRef = useRef();

  const lang = useDynamicLang();

  const { editExpense, budgets, expenses } = useBudgets();
  const { currentUser } = useAuth();

  let expense = expenses?.find((ex) => ex._id === expenseId);

  let budget = budgets?.find((b) => b._id === expense?.budgetId);

  function handleSubmit(e) {
    e.preventDefault();
    const expense = {
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      budgetId: budgetIdRef.current.value,
      createdBy: currentUser.uid,
      id: expenseId,
    };
    editExpense(expense);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{content[lang]["titles"]["editExpense"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>
              {content[lang]["addExpenseForm"]["description"]}
            </Form.Label>
            <Form.Control
              ref={descriptionRef}
              type="text"
              defaultValue={expense?.description}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>{content[lang]["addExpenseForm"]["amount"]}</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={0.01}
              defaultValue={expense?.amount}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>{content[lang]["addExpenseForm"]["budget"]}</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
              {defaultBudgetId === UNCATEGORIZED_BUDGET && (
                <option key={budget?._id} value={defaultBudgetId}>
                  {content[lang]["titles"]["uncategorized"]}
                </option>
              )}
              {budgets?.map((budget) => (
                <option key={budget._id} value={budget._id}>
                  {budget?.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              {content[lang]["buttons"]["editButton"]}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET, useBudgets } from "../contexts/BudgetsContext";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "../data/Languages";
import { useAuth } from "../contexts/AuthContext";

export default function EditBudgetModal({ show, handleClose, budgetId }) {
  const nameRef = useRef(),
    maxRef = useRef();
  const { editBudget, budgets } = useBudgets();
  const lang = useDynamicLang();

  let budget =
    UNCATEGORIZED_BUDGET === budgetId
      ? { name: "Ucategorized", id: UNCATEGORIZED_BUDGET }
      : budgets?.find((b) => b._id === budgetId);

  const { currentUser } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      maxExpending: parseFloat(maxRef.current.value),
      createdBy: currentUser.uid,
      id: budget._id,
    };
    editBudget(data);
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{content[lang]["titles"]["editBudget"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>{content[lang]["addBudgetForm"]["name"]}</Form.Label>
            <Form.Control
              ref={nameRef}
              type="text"
              defaultValue={budget?.name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>
              {content[lang]["addBudgetForm"]["maximunSpending"]}
            </Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              min={0}
              step={0.01}
              defaultValue={budget?.maxExpending}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              {content[lang]["buttons"]["editBudget"]}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

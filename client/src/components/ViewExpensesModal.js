import { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGETID, useBudgets } from "../contexts/BudgetsContext";
import { useDynamicLang } from "../contexts/LanguageContext";
import { useFetch } from "../hooks/useFetch";
import { currencyFormatter } from "../utils";
import { content } from "./Languages";
import { useQuery } from "react-query";
import axios from "axios";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const lang = useDynamicLang();

  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const budget =
    UNCATEGORIZED_BUDGETID === budgetId
      ? { name: "Ucategorized", id: UNCATEGORIZED_BUDGETID }
      : budgets.find((b) => b.id === budgetId);
  const expenses = getBudgetExpenses(budgetId);
  /* --------------------------------------------- */
  const [expen, setExpen] = useState();

  //const [data, error, loading] = useFetch("http://localhost:8080/api/expenses");

  const { data, isLoading } = useQuery("expen", () => {
    return axios.get("http://localhost:8080/api/expenses");
  });

  console.log(data);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            {/* If we have a budget defined budget, show it, otherwise ignore it */}
            <div>
              {content[lang]["titles"]["viewExpensesTitle"]} - {budgets?.name}
            </div>
            {/* avoid deleting the uncategorized button by the condition set out below */}
            {budgetId !== UNCATEGORIZED_BUDGETID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
              >
                {content[lang]["buttons"]["deleteButton"]}
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense, i) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => {
                  deleteExpense(expense);
                }}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

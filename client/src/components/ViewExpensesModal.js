import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET, useBudgets } from "../contexts/BudgetsContext";
import { useDynamicLang } from "../contexts/LanguageContext";
import { currencyFormatter } from "../utils";
import { EditIcon, XIcon } from "./Icons";
import { content } from "./Languages";

export default function ViewExpensesModal({
  budgetId,
  handleClose,
  setViewExpenseId,
  setShowEditExpenseModal,
  setDefaultBudgetId,
}) {
  const lang = useDynamicLang();

  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const budget =
    UNCATEGORIZED_BUDGET === budgetId
      ? { name: "Ucategorized", id: UNCATEGORIZED_BUDGET }
      : budgets?.find((b) => b._id === budgetId);

  const expenses = getBudgetExpenses(budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>
              {content[lang]["titles"]["viewExpensesTitle"]} - {budgets?.name}
            </div>
            {budgetId !== UNCATEGORIZED_BUDGET && (
              <Button
                variant="outline-danger"
                onClick={async () => {
                  await deleteBudget(budget?._id);
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
          {expenses?.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense._id}>
              <div className="me-auto fs-4">{expense?.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense?.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-success"
                onClick={async () => {
                  setDefaultBudgetId(expense?.budgetId);
                  setShowEditExpenseModal(true);
                  handleClose();
                  setViewExpenseId(expense?._id);
                }}
                disabled={expenses.isLoading}
              >
                {expenses.isFetching ? (
                  "Loading"
                ) : (
                  <EditIcon width="12px" height="12px" />
                )}
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={async () => {
                  await deleteExpense(expense?._id);
                }}
                disabled={expenses.isLoading}
              >
                {expenses.isFetching ? "Loading" : <XIcon />}
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import React from "react";
import { currencyFormatter } from "../utils";
import { content } from "./Languages";
import { useDynamicLang } from "../contexts/LanguageContext";
import { EditIcon } from "./Icons";

export default function BudgetCard({
  name,
  amount,
  maxExpending,
  gray,
  onAddExpenseClick,
  hideButtons,
  onViewExpenseClick,
  setShowEditBudgetModal,
  onViewBudgetClick,
  editable,
}) {
  const lang = useDynamicLang();

  const classNames = [];
  if (amount > maxExpending) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={`${classNames.join(" ")}  mb-3`}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center fw-normal">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-center gap-1">
            {currencyFormatter.format(amount)}
            {maxExpending && (
              <span className="text-muted fs-6">
                / {currencyFormatter.format(maxExpending)}
              </span>
            )}
            {!editable && (
              <button
                className="ms-auto btn py-0 justify-content-center"
                aria-label="Edit budget"
                title="Edit budget"
                onClick={() => {
                  setShowEditBudgetModal(true);
                  onViewBudgetClick();
                }}
              >
                <EditIcon width="14px" height="14px" />
              </button>
            )}
          </div>
        </Card.Title>
        {maxExpending && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, maxExpending)}
            now={amount}
            min={0}
            max={1000}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              {content[lang]["buttons"]["addExpense"]}
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpenseClick}>
              {content[lang]["titles"]["viewExpensesTitle"]}
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, maxExpending) {
  const ratio = amount / maxExpending;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

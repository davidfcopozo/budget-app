import React from "react";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET, useBudgets } from "../contexts/BudgetsContext";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "../components/Languages";

export default function UncategorizedBudgetCard({ ...props }) {
  const lang = useDynamicLang();

  const { getBudgetExpenses } = useBudgets();

  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET)?.reduce(
    (total, expense) => total + expense?.amount,
    0
  );

  if (amount === 0) return null;

  return (
    <BudgetCard
      amount={amount}
      name={content[lang]["titles"]["uncategorized"]}
      gray
      {...props}
    />
  );
}

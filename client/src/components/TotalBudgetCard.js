import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";
import Footprint from "./Footprint";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import useFetchRequest from "../hooks/useFetchRequest";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();

  const amount = expenses?.reduce(
    (total, expense) => total + expense?.amount,
    0
  );
  const max = budgets?.reduce(
    (total, budget) => total + budget.maxExpending,
    0
  );

  //console.log(amount, max);

  if (max === 0) return null;

  return (
    <>
      <BudgetCard
        amount={amount}
        name="Total"
        gray
        maxExpending={max}
        hideButtons
      />
    </>
  );
}

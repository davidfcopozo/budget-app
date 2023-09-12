import BudgetCard from "./BudgetCard";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import { UNCATEGORIZED_BUDGET, useBudgets } from "../contexts/BudgetsContext";
import LoadingScreen from "./LoadingScreen";
import { useTheme } from "../contexts/ThemesContext";
import { useEffect, useState } from "react";

const CardsContainer = ({
  budgets,
  openAddExpenseModal,
  setViewExpensesModalBudgetId,
  setShowEditBudgetModal,
  setViewBudgetEditModal,
  content,
  lang,
}) => {
  const containerDark = useTheme();

  let titleStyle = {
    color: containerDark ? "white" : "#000",
    transition: "all 0.8s ease-in",
  };

  const {
    getBudgetExpenses,
    budgetsIsLoading,
    budgetsIsFetching,
    expensesIsLoading,
    expensesIsFetching,
    expenses,
  } = useBudgets();
  const [shouldShowLoader, setShouldShowLoader] = useState(true);

  useEffect(() => {
    if (
      budgets === undefined &&
      expenses === undefined &&
      budgetsIsLoading &&
      budgetsIsFetching &&
      expensesIsLoading &&
      expensesIsFetching
    ) {
      setShouldShowLoader(false);
    }
  });

  if (shouldShowLoader) {
    return <LoadingScreen />;
  }
  if (!shouldShowLoader && budgets === undefined && expenses === undefined) {
    return (
      <h2 style={titleStyle} className="mx-auto py-auto h3">
        {content[lang]["paragraphs"]["noBudgets"]}
      </h2>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColums: "repeat(auto-fill, minmax(300px, 1fr))",

        alignItems: "flex-start",
      }}
    >
      {
        <div>
          {budgets?.map((budget) => {
            const amount = getBudgetExpenses(budget._id)?.reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget._id}
                name={budget.name}
                amount={amount}
                maxExpending={budget.maxExpending}
                onAddExpenseClick={() => openAddExpenseModal(budget._id)}
                onViewExpenseClick={() =>
                  setViewExpensesModalBudgetId(budget._id)
                }
                setShowEditBudgetModal={setShowEditBudgetModal}
                onViewBudgetClick={() => setViewBudgetEditModal(budget._id)}
              />
            );
          })}
        </div>
      }

      {!expenses || !budgets ? null : (
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET)
          }
        />
      )}
      {!expenses || !budgets ? null : (
        <TotalBudgetCard style={{ marginBottom: "10rem" }} />
      )}
    </div>
  );
};

export default CardsContainer;

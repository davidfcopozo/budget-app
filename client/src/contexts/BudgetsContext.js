import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import useDeleteRequest from "../hooks/useDeleteRequest";
import useFetchRequest from "../hooks/useFetchRequest";
import usePostRequest from "../hooks/usePostRequest";
import useUpdateRequest from "../hooks/useUpdateRequest";

// Create a context
const BudgetsContext = React.createContext();
//const queryClient = useQueryClient();

// Make and saved in a variable the ID for uncategorized budgets
export const UNCATEGORIZED_BUDGET = "Uncategorized";

// Create and make the hook exportable
/* This hook uses the BudgetsContext that enable us to access all of the props wrapped around
  <BudgetsContext.Provider /> in any component we export it to */
export function useBudgets() {
  return useContext(BudgetsContext);
}

/* This function provides all the data we want to pass to <BudgetsContext.Provider /> as prop using 
childen as parameter, all data insed it, passes to childen so we can use it as value in 
<BudgetsContext.Provider />*/
export const BudgetsProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const budgetsQuery = useFetchRequest(
    "budgets",
    "http://localhost:8080/api/budgets"
  );
  const expensesQuery = useFetchRequest(
    "expenses",
    "http://localhost:8080/api/expenses"
  );

  const [budgets, setBudgets] = useState();
  const [expenses, setExpenses] = useState();

  function updateValues() {
    setBudgets(budgetsQuery?.data?.budgets);
    setExpenses(expensesQuery?.data?.expenses);
  }

  useEffect(() => {
    updateValues();
  }, []);
  useEffect(() => {
    updateValues();
  }, [
    budgetsQuery.isLoading ||
      expensesQuery.isLoading ||
      budgetsQuery.isFetching ||
      expensesQuery.isFetching,
    budgets,
    expenses,
  ]);

  const postBudgetMutation = usePostRequest(
    "http://localhost:8080/api/budgets",
    function onSuccess() {
      queryClient.invalidateQueries(["budgets"]);
    },
    function onError() {
      // get the cached values
      const previousBudgets = queryClient.getQueryData(["budgets"]);
      queryClient.setQueryData(["budgets", previousBudgets]);
    },
    async function onMutate(budget) {
      // cancel queries against this query key
      // so that if any other component is consuming this data
      // is not able to get the old data
      await queryClient.cancelQueries(["budgets"]);

      // get the cached values
      const previousBudgets = queryClient.getQueryData(["budgets"]);

      // set the cached data with an added object
      // i.e the   posted
      queryClient.setQueryData(
        ["budgets"],
        [
          ...previousBudgets,
          {
            name: budget?.name,
            maxExpending: budget?.maxExpending,
            createdBy: budget?.createdBy,
          },
        ]
      );

      // return previousValue here
      // we will use it in the next section
      return { previousBudgets };
    }
  );

  const postExpenseMutation = usePostRequest(
    "http://localhost:8080/api/expenses",
    function onSuccess() {
      queryClient.invalidateQueries(["expenses"]);
    },
    function onError() {
      // get the cached values
      const previousExpenses = queryClient.getQueryData(["expenses"]);
      queryClient.setQueryData(["expenses", previousExpenses]);
    },
    async function onMutate(expense) {
      // cancel queries against this query key
      // so that if any other component is consuming this data
      // is not able to get the old data
      await queryClient.cancelQueries(["expenses"]);

      // get the cached values
      const previousExpenses = queryClient.getQueryData(["expenses"]);

      // set the cached data with an added object
      // i.e the   posted
      queryClient.setQueryData(
        ["expenses"],
        [
          ...previousExpenses,
          {
            description: expense?.description,
            amount: expense?.amount,
            budgetId: expense?.budgetId,
            createdBy: expense?.createdBy,
          },
        ]
      );

      // return previousValue here
      // we will use it in the next section
      return { previousExpenses };
    }
  );

  const deleteExpenseMutation = useDeleteRequest(
    `http://localhost:8080/api/expenses`,
    function onSuccess() {
      queryClient.invalidateQueries(["expenses"]);
    },
    function onError() {
      // get the cached values
      const previousExpenses = queryClient.getQueryData(["expenses"]);
      queryClient.setQueryData(["expenses", previousExpenses]);
    },
    async function onMutate(id) {
      // cancel queries against this query key
      // so that if any other component is consuming this data
      // is not able to get the old data
      await queryClient.cancelQueries(["expenses"]);

      // get the cached values
      const previousExpenses = queryClient.getQueryData(["expenses"]);

      // set the cached data with an added object
      // i.e the   posted
      queryClient.setQueryData(
        ["expenses"],
        [
          previousExpenses?.map((expense) => {
            return previousExpenses.filter(expense.id !== id);
          }),
        ]
      );
    }
  );

  const updateExpenseMutation = useUpdateRequest(
    "http://localhost:8080/api/expenses",
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenses"]);
      },
      onError: () => {
        const previousExpenses = queryClient.getQueryData(["expenses"]);
        queryClient.setQueryData(["expenses", previousExpenses]);
      },
      onMutate: async (expense) => {
        await queryClient.cancelQueries(["expenses"]);
        queryClient.setQueryData(["expenses"], (oldData) => {
          return [...oldData, expense];
        });
      },
    }
  );

  const deleteBudgetMutation = useDeleteRequest(
    `http://localhost:8080/api/budgets`,
    function onSuccess() {
      queryClient.invalidateQueries(["budgets"]);
    },
    function onError() {
      // get the cached values'
      const previousBudgets = queryClient.getQueryData(["budgets"]);
      queryClient.setQueryData(["budgets", previousBudgets]);
      const previousExpenses = queryClient.getQueryData(["expenses"]);
      queryClient.setQueryData(["expenses", previousExpenses]);
    },
    async function onMutate(id) {
      // cancel queries against this query key
      // so that if any other component is consuming this data
      // is not able to get the old data
      await queryClient.cancelQueries(["expenses"]);
      const previousBudgets = queryClient.getQueryData(["budgets"]);
      queryClient.setQueryData(["budgets"], () => {
        return previousBudgets.filter((budget) => budget.id !== id);
      });
    }
  );

  function getBudgetExpenses(budgetId) {
    return expenses?.filter((expense) => expense?.budgetId === budgetId);
  }

  function addBudget(budget) {
    return postBudgetMutation.mutate(budget);
  }

  function addExpense(expense) {
    return postExpenseMutation.mutate(expense);
  }

  async function deleteExpense(id) {
    return deleteExpenseMutation.mutate(id);
  }

  function deleteBudget(id) {
    const previousExpenses = queryClient.getQueryData(["expenses"]);
    deleteBudgetMutation.mutate(id);
    previousExpenses.expenses.map((expense) => {
      if (expense.budgetId !== id) {
        return expense;
      }
      return updateExpenseMutation.mutate({
        id: expense._id,
        data: {
          ...expense,
          budgetId: UNCATEGORIZED_BUDGET,
        },
      });
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { auth } from "../config/firebase.config";
import useDeleteRequest from "../hooks/useDeleteRequest";
import useFetchRequest from "../hooks/useFetchRequest";
import usePostRequest from "../hooks/usePostRequest";
import useUpdateRequest from "../hooks/useUpdateRequest";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const baseURL = "https://budget-buddy-backend.onrender.com/api";

  const [budgets, setBudgets] = useState();
  const [expenses, setExpenses] = useState();
  const [idToken, setIdToken] = useState("");

  async function getUserIdToken() {
    await auth?.currentUser
      ?.getIdToken(/* forceRefresh */ true)
      .then((token) => setIdToken(token));
  }

  useEffect(async () => {
    await getUserIdToken();
  }, [budgets, expenses, idToken]);

  const budgetsQuery = useFetchRequest("budgets", `${baseURL}/budgets`);
  const expensesQuery = useFetchRequest("expenses", `${baseURL}/expenses`);

  function updateValues() {
    setBudgets(budgetsQuery?.data?.budgets);
    setExpenses(expensesQuery?.data?.expenses);
  }

  const { isLoading: budgetsIsLoading, isFetching: budgetsIsFetching } =
    budgetsQuery;
  const { isLoading: expensesIsLoading, isFetching: expensesIsFetching } =
    expensesQuery;

  useEffect(() => {
    updateValues();
  }, []);
  useEffect(() => {
    updateValues();
  }, [
    budgetsIsLoading ||
      budgetsIsFetching ||
      expensesIsLoading ||
      expensesIsFetching ||
      budgets,
    expenses,
  ]);

  const postBudgetMutation = usePostRequest(
    `${baseURL}/budgets`,
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
    },
    idToken
  );

  const postExpenseMutation = usePostRequest(
    `${baseURL}/expenses`,
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
    },
    idToken
  );

  const deleteExpenseMutation = useDeleteRequest(
    `${baseURL}/expenses`,
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
    },
    idToken
  );

  const deleteBudgetMutation = useDeleteRequest(
    `${baseURL}/budgets`,
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
      await queryClient.cancelQueries(["budgets"]);
      const previousBudgets = queryClient.getQueryData(["budgets"]);
      queryClient.setQueryData(
        ["budgets"],
        [
          previousBudgets?.map((budget) => {
            return previousBudgets.filter(budget.id !== id);
          }),
        ]
      );
    },
    idToken
  );

  const updateExpenseMutation = useUpdateRequest(`${baseURL}/expenses`, {
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
    idToken,
  });

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
    if (previousExpenses) {
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
      return deleteBudgetMutation.mutate(id);
    }
    return deleteBudgetMutation.mutate(id);
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
        budgetsIsLoading,
        budgetsIsFetching,
        expensesIsLoading,
        expensesIsFetching,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};

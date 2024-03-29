import { useLayoutEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "../components/AddBudgetModal";
import AddExpenseModal from "../components/AddExpenseModal";
import { useBudgets } from "../contexts/BudgetsContext";
import ViewExpensesModal from "../components/ViewExpensesModal";
import { useTheme } from "../contexts/ThemesContext";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "../data/Languages";
import Footprint from "../components/Footprint";
import NavBar from "../components/NavBar";
import LoadingScreen from "../components/LoadingScreen";
import CardsContainer from "../components/CardsContainer";
import EditBudgetModal from "../components/EditBudgetModal";
import EditExpenseModal from "../components/EditExpenseModal";

function Dashboard() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [viewBudgetEditModal, setViewBudgetEditModal] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [defaultBudgetId, setDefaultBudgetId] = useState();
  const [viewExpenseId, setViewExpenseId] = useState();
  const [screenSize, setScreenSize] = useState();
  const [responsive, setResponsive] = useState(
    window.matchMedia("(max-width: 767px)").matches ? "vertical" : "horizontal"
  );
  const [showCards, setShowCards] = useState(false);

  const {
    budgets,
    expenses,
    budgetsIsLoading,
    budgetsIsFetching,
    expensesIsLoading,
    expensesIsFetching,
  } = useBudgets();

  window.onresize = (event) => {
    setScreenSize(window.innerWidth);
    setResponsive(screenSize < 768 ? "vertical" : "horizontal");
  };

  const lang = useDynamicLang();
  const containerDark = useTheme();
  let darker = containerDark ? "bg-dark" : "bg-light";

  let titleStyle = {
    color: containerDark ? "white" : "#000",
    transition: "all 0.8s ease-in",
  };

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  function handleShowCards() {
    if (
      (!budgets && budgetsIsFetching) ||
      budgetsIsLoading ||
      (!expenses && expensesIsFetching) ||
      expensesIsLoading
    ) {
      setShowCards(false);
    } else {
      setShowCards(true);
    }
  }

  useLayoutEffect(() => {
    handleShowCards();
  }, [budgets, expenses]);

  return (
    <>
      <Container
        style={{
          minWidth: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "2rem",
          paddingInline: "5%",
        }}
        className={darker}
      >
        <NavBar />

        <Stack direction={responsive} gap="2" className="mb-4 d-flex flex-wrap">
          <h1 style={titleStyle} className="me-auto title">
            {content[lang]["titles"]["budgets"]}
          </h1>
          <Button
            variant="primary"
            onClick={() => setShowAddBudgetModal(true)}
            className="add-budget-btn"
          >
            {content[lang]["buttons"]["addBudget"]}
          </Button>
          <Button
            variant="outline-primary"
            onClick={openAddExpenseModal}
            className="add-expense-btn"
          >
            {content[lang]["buttons"]["addExpense"]}
          </Button>
        </Stack>

        {showCards === false ? (
          <LoadingScreen />
        ) : (
          <CardsContainer
            budgets={budgets}
            openAddExpenseModal={openAddExpenseModal}
            setViewExpensesModalBudgetId={setViewExpensesModalBudgetId}
            setShowEditBudgetModal={setShowEditBudgetModal}
            setViewBudgetEditModal={setViewBudgetEditModal}
            content={content}
            lang={lang}
          />
        )}

        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        />
        <EditBudgetModal
          show={showEditBudgetModal}
          handleClose={() => setShowEditBudgetModal(false)}
          budgetId={viewBudgetEditModal}
        />

        <AddExpenseModal
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseModal(false)}
        />

        <EditExpenseModal
          show={showEditExpenseModal}
          handleClose={() => setShowEditExpenseModal(false)}
          defaultBudgetId={defaultBudgetId}
          expenseId={viewExpenseId}
        />

        <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
          setViewExpenseId={setViewExpenseId}
          setShowEditExpenseModal={setShowEditExpenseModal}
          setDefaultBudgetId={setDefaultBudgetId}
        />
      </Container>
      <Footprint />
    </>
  );
}

export default Dashboard;

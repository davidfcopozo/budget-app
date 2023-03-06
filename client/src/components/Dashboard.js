import { useState } from "react";
import { Button, Navbar, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import BudgetCard from "./BudgetCard";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import { UNCATEGORIZED_BUDGET, useBudgets } from "../contexts/BudgetsContext";
import ViewExpensesModal from "./ViewExpensesModal";
import ThemeButton from "./ThemeButton";
import { useTheme } from "../contexts/ThemesContext";
import { LanguageSelect } from "./LanguageSelect";
import { useDynamicLang } from "../contexts/LanguageContext";
import { content } from "./Languages";
import logo from "../assets/logo.png";
import Footprint from "./Footprint";
import { Link } from "react-router-dom";

function Dashboard() {
  /* Handles the state of "Show" prop in AddBudgetModal.js*/
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  /* Handles the state of "Show" prop in AddExpenseModal.js*/
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [screenSize, setScreenSize] = useState();
  const [responsive, setResponsive] = useState(
    window.matchMedia("(max-width: 767px)").matches ? "vertical" : "horizontal"
  );

  const { budgets, getBudgetExpenses } = useBudgets();

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

  //const headers = { Authorization: `Bearer ${user.accessToken}` };

  return (
    <>
      {/* React Bootstrap container to wrap the app up */}
      <Container
        style={{
          minWidth: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "2rem",
        }}
        className={darker}
      >
        <Navbar size="sm" className={"justify-content-between "}>
          <Navbar.Brand>
            <img
              src={logo}
              width="120"
              height="120"
              className={"justify-content-start"}
              alt="Budget Buddy"
            />
          </Navbar.Brand>
          <Stack
            direction="horizontal"
            gap="2"
            className="mb-4 align-items-md-center"
          >
            <Link to="/profile">Profile</Link>
            <ThemeButton />
            <LanguageSelect />
          </Stack>
        </Navbar>

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
        <div
          style={{
            display: "grid",
            gridTemplateColums: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
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
              />
            );
          })}

          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET)
            }
          />

          <TotalBudgetCard style={{ marginBottom: "10rem" }} />
        </div>
        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        />

        <AddExpenseModal
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseModal(false)}
        />

        <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />
      </Container>
      <Footprint />
    </>
  );
}

export default Dashboard;

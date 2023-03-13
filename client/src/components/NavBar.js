import { Image, Navbar, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemesContext";
import { ProfileIcon } from "./Icons";
import { LanguageSelect } from "./LanguageSelect";
import ThemeButton from "./ThemeButton";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";

const NavBar = () => {
  const { currentUser } = useAuth();
  const containerDark = useTheme();

  let titleStyle = {
    color: containerDark ? "white" : "#000",
    transition: "all 0.8s ease-in",
  };

  const tooltip = (
    <Tooltip>
      <strong>
        {currentUser?.displayName
          ? currentUser?.displayName
          : currentUser?.email}
      </strong>
    </Tooltip>
  );

  return (
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
        <ThemeButton />
        <LanguageSelect />
        <OverlayTrigger
          placement="left"
          overlay={tooltip}
          className="align-items-md-center h-25"
        >
          <Link to="/profile" className="align-items-md-center">
            {currentUser?.photoURL ? (
              <Image
                src={currentUser.photoURL}
                roundedCircle={true}
                fluid={true}
                style={{ height: 33, width: 33 }}
              />
            ) : (
              <ProfileIcon color={titleStyle.color} w={30} h={30} />
            )}
          </Link>
        </OverlayTrigger>
      </Stack>
    </Navbar>
  );
};

export default NavBar;

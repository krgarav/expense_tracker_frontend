import { Fragment, useEffect, useState } from "react";
import classes from "./header.module.css";
import { Nav, Container, Button, Navbar, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import LeaderBoard from "../Models/Leaderboard";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  const [state, setState] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const PORT = import.meta.env.VITE_REACT_PORT;
  useEffect(() => {
    const status = localStorage.getItem("userStatus");
    if (status === "true") {
      setState(true);
    }
  }, [state]);
  const navigate = useNavigate();
  const btn = `${classes.navbtn} d-flex`;
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  const premiumHandler = () => {
    const token = localStorage.getItem("token");
    console.log("clicked");
    const getPremium = async () => {
      try {
        const response = await axios.get(PORT + "/purchase/premium", {
          headers: { Authorisation: token },
        });
        console.log(response);
        var options = {
          key: response.data.key_id,
          order_id: response.data.order.id,
          handler: async function (response) {
            const res = await axios.post(
              PORT + "/purchase/updateTransactionStatus",
              {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
              },
              {
                headers: { Authorisation: token },
              }
            );

            alert("you are premium user now");
            localStorage.setItem("userStatus", true);
            setState(true);
          },
        };
        const rzpl = new Razorpay(options);
        rzpl.open();

        rzpl.on("payment.failed", (response) => {
          console.log(response);
          alert(JSON.stringify(response.error.description));
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPremium();
  };
  const leaderboardHandler = () => {
    const getData = async () => {
      const res = await axios.get(PORT + "/purchase/premium/showLeaderBoard");
      setUsers(res.data);
      setModalShow(true);
    };
    getData();
  };
  // const url = `/reportgeneration/${state}`;
  return (
    <Fragment>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary"
        sticky="top"
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/expenses">
                <Nav.Link as="a">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/reportgeneration">
                <Nav.Link as="a">Day to Day Expenses</Nav.Link>
              </LinkContainer>
            </Nav>
            <div className={btn}>
              {!state && (
                <Button variant="outline-success" onClick={premiumHandler}>
                  Buy Premium
                </Button>
              )}

              {state && (
                <span>
                  <span className={classes.text}>You are premium user</span>
                  <Button onClick={leaderboardHandler}>Show LeaderBoard</Button>
                </span>
              )}
              <Button variant="outline-warning" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LeaderBoard
        show={modalShow}
        item={users}
        onHide={() => setModalShow(false)}
      />
    </Fragment>
  );
};

export default Header;

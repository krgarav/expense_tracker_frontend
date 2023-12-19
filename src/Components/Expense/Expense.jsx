import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./expense.module.css";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import Pagechanger from "../Models/Pagination";
import { expenseAction } from "../../Store/expense-reducer";

const Expense = () => {
  const [state, setState] = useState(true);
  // const navigate = useNavigate();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();
  const listItem = useSelector((state) => state.expense.expense);
  const PORT = import.meta.env.VITE_REACT_PORT;
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const row = localStorage.getItem("preferencerow");
      const selectedPage = localStorage.getItem("selectedpage");
      // if(selectedPage){}
      const response = await fetch(
        PORT + `/expense/get-expenses?e=${selectedPage || 1}&row=${row || 5}`,
        {
          headers: { Authorisation: token },
        }
      );
      const data = await response.json();
      dispatch(expenseAction.addExpense(data));
    };
    fetchData();
    const handleTabClose = (event) => {
      event.preventDefault();

      console.log("beforeunload event triggered");

      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [state]);
  const editHandler = (e) => {
    const amount = e.amount;
    const description = e.description;
    const category = e.category;
    const id = e._id;
    const update = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(PORT + "/expense/delete-expense/" + id, {
        method: "DELETE",
        headers: {
          Authorisation: token,
        },
      });

      if (response.ok) {
        amountRef.current.focus();
        amountRef.current.value = amount;
        descriptionRef.current.value = description;
        categoryRef.current.value = category;
        setState((prev) => !prev);
      } else {
        console.error("Error occured");
        alert("Not enough product");
      }
    };
    update();
  };
  const deleteHandler = (e) => {
    const deleteProduct = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(PORT + "/expense/delete-expense/" + e, {
        method: "DELETE",
        headers: {
          Authorisation: token,
        },
      });
      if (response.ok) {
        setState((prev) => !prev);
      }
    };
    deleteProduct();
  };
  const liElement = listItem.map((item) => {
    // console.log(item)
    return (
      <li key={item._id}>
        {/* <Container>
          <Row>
            <Col></Col>
            <Col>1</Col>
            <Col>1</Col>
          </Row>
        </Container> */}
        {/* <span className={classes.listelem}> */}
        <span className={classes["box-div"]}>
          <h4> &#8377; {item.amount}/-</h4>
        </span>
        <span className={classes["box-div"]}>
          <p>{item.description}</p>
        </span>
        <span className={classes["box-div"]}>
          <p> {item.category} </p>
        </span>
        {/* </span> */}
        {/* <span className={classes.listelem1}> */}
        <span className={classes["box-div"]}>
          <button onClick={() => editHandler(item)}> Edit</button>
        </span>
        <span className={classes["box-div"]}>
          <button
            className={classes["btn-danger"]}
            onClick={() => deleteHandler(item._id)}
          >
            Delete
          </button>
        </span>
        {/* </span> */}
      </li>
    );
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredQuantity = event.target.pqty.value;
    const enteredDescription = event.target.pdes.value;
    const enteredCategory = event.target.pcategory.value;

    const obj = {
      quantity: enteredQuantity,
      description: enteredDescription,
      category: enteredCategory,
    };
    const token = localStorage.getItem("token");
    const postData = async () => {
      const response = await fetch(PORT + "/expense/add-expense", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorisation: token,
        },
      });
      if (response.ok) {
        setState((prev) => !prev);
      }
    };
    postData();
    event.target.pdes.value = "";
    event.target.pcategory.value = "";
    event.target.pqty.value = "";
  };

  return (
    <Fragment>
      <Header />
      <h1 className={classes.header}>Expense Tracker</h1>
      <div className={classes.formdiv}>
        <form onSubmit={submitHandler}>
          <label htmlFor="pqty">Enter Expense Amount : </label>
          <input
            type="number"
            name="productQuantity"
            id="pqty"
            ref={amountRef}
            required
          />
          <label htmlFor="pdes">Enter Description : </label>
          <input
            type="text"
            name="productDescription"
            id="pdes"
            ref={descriptionRef}
            required
          />
          <label htmlFor="pcategory">Choose Category : </label>
          <select id="pcategory" ref={categoryRef}>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Fuel">Fuel</option>
            <option value="Vacation">Vacation</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Add Item</button>
        </form>
      </div>
      <div className={classes.list}>
        {liElement.length > 0 && (
          <ul>
            <li>
              <span className={classes["box-div"]}>
                <h3>Amount</h3>
              </span>
              <span className={classes["box-div"]}>
                <h3>Description</h3>
              </span>
              <span className={classes["box-div"]}>
                <h3>Category</h3>
              </span>

              <span className={classes["box-div"]}></span>
              <span className={classes["box-div"]}></span>
            </li>
            <hr />
            {liElement}
          </ul>
        )}
        {liElement.length === 0 && <h2>No Expense Available</h2>}
      </div>
      <div className={classes.pagechanger}>
        <Pagechanger />
      </div>
    </Fragment>
  );
};

export default Expense;

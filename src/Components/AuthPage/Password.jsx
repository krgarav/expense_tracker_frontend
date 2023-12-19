import axios from "axios";
import { Fragment, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

const Password = () => {
  const passwordRef = useRef();
  const { userId } = useParams();
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_REACT_PORT;
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = passwordRef.current.value;
    const postPasswordRequest = async () => {
      const response = await axios.post(PORT + "/user/resetlink", {
        password: enteredPassword,
        userId,
      });
      if (response.data.data === "success") {
        alert("Password changed successfully");
        navigate("/", { replace: true });
      }
    };
    postPasswordRequest();
  };

  return (
    <Fragment>
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new pssword"
              ref={passwordRef}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default Password;

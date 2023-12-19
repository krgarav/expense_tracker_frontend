import { Modal, Row, Col, Container, Button } from "react-bootstrap";
const LeaderBoard = (props) => {
  const allItems = props.item.map((item) => {
    return (
      <Row key={item.id}>
        <Col xs={6} md={8}>
          {item.name}
        </Col>
        <Col xs={6} md={4}>
          &#8377;{item.totalExpense || 0}
        </Col>
      </Row>
    );
  });
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          LeaderBoard
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={6} md={8}>
              Name
            </Col>
            <Col xs={6} md={4}>
              Total Expenses
            </Col>
          </Row>
          <hr />
          {allItems}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaderBoard;

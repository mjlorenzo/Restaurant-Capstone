// this module welcomes an unauthenticated user to the app and invites them to log in or sign up

import { Container, Row, Col, Button } from "reactstrap";

function Welcome() {
  return (
    <Container>
      <Row>
        <Col><h1>Welcome to our restaurant ordering application! To start, you must sign in or create an account</h1>
        <Row>
          <Col>
            <Button>Sign-In</Button>
          </Col>
          <Col>
            <Button>Register</Button>
          </Col>
        </Row>
        </Col>
      </Row>
    </Container>
  ); 
}

export default Welcome;
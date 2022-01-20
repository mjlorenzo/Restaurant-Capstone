// this module welcomes an unauthenticated user to the app and invites them to log in or sign up

import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";

function Welcome() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>
            Welcome to our restaurant ordering application! To start, you must
            sign in or create an account
          </h1>
          <Row>
            <Col>
              <Link href="/login">
                <Button>Sign-In</Button>
              </Link>
            </Col>
            <Col>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;

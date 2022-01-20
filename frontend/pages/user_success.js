import { Container, Row, Col, Alert } from "reactstrap";
import { useEffect } from "react";
import { useRouter } from 'next/router';
function UserSuccess() {

  let router = useRouter();
  useEffect(() => {
    setTimeout(() => router.replace("/"), 4000);
  });

  return (
    <Container>
      <Row>
        <Col>
          <Alert type="success">{`Congratulations you've registered with our service! We're redirecting you to our restaurants...`}</Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default UserSuccess;
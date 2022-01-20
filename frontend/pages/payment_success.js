import { Container, Row, Col, Alert } from "reactstrap";
import { useEffect } from "react";
import { useRouter } from 'next/router';
function PaymentSuccess() {

  let router = useRouter();
  useEffect(() => {
    setTimeout(() => router.replace("/"), 4000);
  });

  return (
    <Container>
      <Row>
        <Col>
          <Alert type="success">{`Your order has been successfully placed!`}</Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentSuccess;
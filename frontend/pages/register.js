/* /pages/register.js */

import React, { useState, useContext } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { registerUser } from "../components/auth";
import AppContext from "../components/context";
import { useRouter } from "next/router";

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const appContext = useContext(AppContext);
  const router = useRouter();

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <h2>Register</h2>
            </div>
            <section className="wrapper">
              <Form>
                <fieldset disabled={loading}>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      onChange={(e) => {
                        setData({ ...data, username: e.target.value });

                        if (!e.target.value)
                          setError("Username is required");
                        else
                          setError("");
                      }}
                      value={data.username}
                      type="text"
                      name="text"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value });

                        if (!e.target.value)
                          setError("Email is required");
                        else if (!e.target.checkValidity())
                          setError("Email is invalid");
                        else
                          setError("");
                      }}
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value });

                        if (!e.target.value)
                          setError("Password is required");
                      }}
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      disabled={loading || !(error == "")}
                      onClick={() => {
                        setLoading(true);
                        registerUser(data.username, data.email, data.password)
                          .then((res) => {
                            // set authed user in global context object
                            appContext.setUser({ user: res.data.user, isAuthenticated: true });
                            setLoading(false);
                            console.log(`registered user: ${JSON.stringify(res.data)}`);
                            router.replace("/user_success");
                          })
                          .catch((error) => {
                            console.log(`error in register: ${error}`)
                            setError(error.response.data.message[0].messages[0].message);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
              {error && <Alert type="danger">{error}</Alert>}
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
};
export default Register;

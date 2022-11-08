import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SIgn_img from "./SIgn_img";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import constants from "../Constants/constants";
const Login = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState([]);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
   /**
   * @description : User logging web application
   */
    e.preventDefault();

    const getuserArr = localStorage.getItem("useryoutube");
    console.log(getuserArr);

    const { username, password } = inpval;
    if (username === "") {
      toast.error("Username field is requred", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else {
      const credentials = {
        username: username,
        password: password,
      };
      try {
        console.log("credentials", credentials);
        axios
          .post(constants.backend_url + "/user/login/", credentials)
          .then((res) => {
            console.log("res");
            if (res.data != null) {
              console.log("res.data", res.data);
              //   this.setState({
              //     loginState: true,
              //     modalState: true,
              //   });

              //   AsyncStorage.setItem("tokenNumber", res.data.token);
              //   AsyncStorage.setItem("name", res.data.name);
              //   AsyncStorage.setItem("phoneNumber", res.data.phone);
              //   AsyncStorage.setItem("email", res.data.email);
              //   AsyncStorage.setItem("nic", res.data.nic);
              //   AsyncStorage.setItem("role", res.data.role);
              //   AsyncStorage.setItem("accountBalance", res.data.accountBalance);
              if (res.data.role === "admin") {
                history("/busroute");
              } else {
                toast.error("You haven't permission to access this page", {
                  position: "top-center",
                });
              }
            } else {
              //   this.setState({
              //     loginState: false,
              //     modalState: true,
              //   });
              toast.error("Account not found", {
                position: "top-center",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
      //   if (getuserArr && getuserArr.length) {
      //     const userdata = JSON.parse(getuserArr);
      //     const userlogin = userdata.filter((el, k) => {
      //       return el.email === email && el.password === password;
      //     });

      //     if (userlogin.length === 0) {
      //       alert("invalid details");
      //     } else {
      //       console.log("user login succesfulyy");

      //       localStorage.setItem("user_login", JSON.stringify(userlogin));

      //       history("/busroute");
      //     }
      //   }
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign IN</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="username"
                  name="username"
                  onChange={getdata}
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: "#1E73F2" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Already Have an Account <span>SignIn</span>{" "}
            </p>
          </div>
          <SIgn_img />
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;

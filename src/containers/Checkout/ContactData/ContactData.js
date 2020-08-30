import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      cutomer: {
        name: "Sumit",
        address: {
          street: "test",
          zipcode: "221123",
          country: "india",
        },
        email: "test@123.com",
      },
      deliveryMethod: "fatser",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="enter your name" />
        <input className={classes.Input} type="email" name="email" placeholder="enter your email" />
        <input className={classes.Input} type="text" name="street" placeholder="enter your street" />
        <input className={classes.Input} type="text" name="postalcode" placeholder="enter your postal code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);

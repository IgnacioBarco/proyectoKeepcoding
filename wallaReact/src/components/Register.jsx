import React, { Component } from "react";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/NodePopDBService";

const { searchTags } = api();

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      tag: "",
      tags: []
    };
  }

  UNSAFE_componentWillMount = () => {
    this.checkTags();
  };

  //obtenemos los tags de la API
  checkTags = async event => {
    const data = await searchTags();
    // const { success, count, results } = data;
    const { results } = data;

    let tags = [];
    results.map(elem => tags.push(elem));

    this.setState({
      tags: tags
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, surname, tag, tags } = this.state;
    this.context.name = name;
    this.context.surname = surname;
    this.context.tag = tag;
    this.context.tags = tags;

    // Guardamos en localstorage
    locStorage.setItem("name", name);
    locStorage.setItem("surname", surname);
    locStorage.setItem("tag", tag);
    locStorage.setItem("tags", tags);

    this.props.history.push("/adverts");
  };

  //creamos el template para cargar los tags
  buildTags = () => {
    let tags = [];
    tags = this.state.tags;

    return (
      <select onChange={this.onInputChangeTags}>
        <option value="">Tag de búsqueda</option>
        {tags.map(elem => {
          return (
            <option key={elem} value={elem}>
              {elem}
            </option>
          );
        })}
      </select>
    );
  };

  onInputChangeName = event => {
    this.setState({
      name: event.target.value
    });
  };

  onInputChangeSurname = event => {
    this.setState({
      surname: event.target.value
    });
  };

  onInputChangeTags = event => {
    this.setState({
      tag: event.target.value
    });
  };

  render() {
    // const { name, surname, tag } = this.state;
    const { name, surname } = this.state;

    return (
      <form>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={this.onInputChangeName}
          name="name"
        />

        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={this.onInputChangeSurname}
          name="surname"
        />

        {this.buildTags()}

        <button onClick={this.handleSubmit}>submit</button>
      </form>
    );
  }
}

Register.contextType = MainContext;

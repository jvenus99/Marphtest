import React from "react";
import Input from "./components/input";
import PhoneInput from "./components/phoneInput";
import './App.css';
import CepInput from "./components/cepinput";
import TextArea from "./components/TextArea"
import axios from "axios";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Nome: "",
      Telefone: "",
      Cep: "",
      Numero: "",
      Logradouro: "",
      Bairro: "",
      Cidade: "",
      Assunto: "",
      Texto: "",
      ErrorName: "span",
      ErrorPhone: "span",
      ErrorTexto: "span"
    };

    this.handleChange = this.handleChange.bind(this);
    this.contactSubmit = this.contactSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.CepHandleChange = this.CepHandleChange.bind(this);
  }

  clearForm() {
    this.setState({
      Nome: "",
      Telefone: "",
      Cep: "",
      Numero: "",
      Logradouro: "",
      Bairro: "",
      Cidade: "",
      Assunto: "Selecione um", 
      Texto: "",
      ErrorName: "span",
      ErrorPhone: "span",
      ErrorTexto: "span",
      ErrorAssunto: "span"
    });
  }

  handleValidation() {
    let { Nome } = this.state;
    let { Telefone } = this.state;
    let { Assunto } = this.state;
    let { Texto } = this.state;
    let formIsValid = true;

    //Nome
    if (!Nome) {
      formIsValid = false;
      this.setState({
        ErrorName: "spanRed"
      });
    }
    //telefone
    if (!Telefone) {
      formIsValid = false;
      this.setState({
        ErrorPhone: "spanRed"
      });   
    }
    //Assunto
    if (Assunto==="Selecione um") {
      formIsValid = false;
      this.setState({
        ErrorAssunto: "spanRed"
      });   
    }

    //Texto
    if (!Texto) {
      formIsValid = false;
      this.setState({
        ErrorTexto: "spanRed"
      });  
    }
    return formIsValid;
  }

  contactSubmit(event) {
    event.preventDefault();

    if (this.handleValidation()) {
      alert("Formulário Enviado");
      this.clearForm();
    } else {
      alert("Há erros no Formulário");
    }
  }
  AssuntoHandleChange(event) {
    this.setState({
      ...this.state,
      Assunto: event.target.Assunto
    });
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  CepHandleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
    if (event.target.value.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${event.target.value}/json`)
        .then(({ data }) => {
          console.log(data);
          this.setState({
            Numero: data.complemento,
            Logradouro: data.logradouro,
            Bairro: data.bairro,
            Cidade: data.localidade
          });
        });
    }
  }

  render() {
    const { ErrorName } = this.state;
    const { ErrorPhone } = this.state;
    const { ErrorTexto } = this.state;
    const { ErrorAssunto} = this.state;
    return (
      <div className="formuario-de-contato">
        <h1>Entre em Contato</h1>
        <form onSubmit={this.contactSubmit.bind(this)}>
          <label htmlFor="Nome">
            Nome
            <span className={ErrorName}>*</span>:
          </label>
          <Input
            name="Nome"
            value={this.state.Nome}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <br />
          <label htmlFor="Telefone">
            Telefone<span className={ErrorPhone}>*</span>:
          </label>
          <PhoneInput
            name="Telefone"
            value={this.state.Telefone}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <br />
          Endereço: <br />
          <br />
          <label htmlFor="Cep">CEP:</label>
          <CepInput
            name="Cep"
            value={this.state.Cep}
            onChange={e => this.CepHandleChange(e)}
          />
          <br />
          <br />
          <label htmlFor="Numero">Número:</label>
          <PhoneInput
            name="Numero"
            value={this.state.Numero}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <br />
          <label htmlFor="Logradouro">Logradouro:</label>
          <Input
            name="Logradouro"
            value={this.state.Logradouro}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <br />
          <label htmlFor="Bairro">Bairro:</label>
          <Input
            name="Bairro"
            value={this.state.Bairro}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <br />
          <label htmlFor="Cidade">Cidade:</label>
          <Input
            name="Cidade"
            value={this.state.Cidade}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <br />
          <label htmlFor="select">
            Assunto<span className={ErrorAssunto}>*</span>:
          </label>
          <select value={this.state.Assunto} onChange={e => this.AssuntoHandleChange(e)}>
            <option value="Selecione um">Selecione um</option>
            <option value="Fnanceiro">Financeiro</option>
            <option value="Contatos">Contatos</option>
            <option value="Outros">Outros</option>
          </select>
          <br />
          <br />
          <label htmlFor="Texto">
            Texto<span className={ErrorTexto}>*</span>:
          </label>
          <br />
          <br />
          <TextArea
            name="Texto"
            value={this.state.Texto}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <br />
          <input className="Button" type="submit" value="Enviar" />
        </form>
      </div>
    );
  }
}

export default App;

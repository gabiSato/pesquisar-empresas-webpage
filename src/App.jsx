import React from "react";
import CompanyCard from "./components/CompanyCard";
import { Grid, Input, Label } from "semantic-ui-react";
import axios from "axios";

class App extends React.PureComponent {
  state = {
    cnpj: "",
    company: {
      info: null,
      isLoading: false,
      hasErrored: false,
      errorMessage: ""
    }
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOnClick = () => {
    this.setState(
      {
        company: {
          info: null,
          isLoading: true,
          hasErrored: false,
          errorMessage: ""
        }
      },
      async () => {
        try {
          const response = await axios.get(this.state.cnpj);

          const { data } = response;
          if (data.status === "OK")
            this.setState({
              company: {
                info: data,
                isLoading: false
              }
            });
          else throw new Error(data.message);
        } catch (error) {
          this.setState({
            company: {
              isLoading: false,
              hasErrored: true,
              errorMessage: error.message
            }
          });
        }
      }
    );
  };

  render() {
    const { cnpj, company } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh", padding: 22 }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 560 }}>
          <Input
            fluid
            size="large"
            icon="search"
            iconPosition="left"
            placeholder="Digite o cnpj da empresa"
            action={{
              content: "Pesquisar",
              color: "blue",
              onClick: this.handleOnClick
            }}
            name="cnpj"
            value={cnpj}
            onChange={this.handleOnChange}
            loading={company.isLoading}
            error={company.hasErrored}
          />
          {company.hasErrored && (
            <Label basic color="red" pointing>
              {company.errorMessage}
            </Label>
          )}
          {!!company.info && <CompanyCard company={company.info} />}
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;

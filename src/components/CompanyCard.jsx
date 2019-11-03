import React from "react";
import { Card, List } from "semantic-ui-react";

const CompanyCard = ({ company }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>{company.nome}</Card.Header>
    </Card.Content>
    <Card.Content textAlign="left">
      <List style={{ paddingLeft: 22, paddingRight: 22 }}>
        <List.Item icon="mail" content={company.email} />
        <List.Item icon="phone" content={company.telefone} />
        <List.Item icon="marker" content={company.uf} />
        <List.Item icon="calendar" content={company.abertura} />
      </List>
    </Card.Content>
    <Card.Content textAlign="left">
      <List style={{ paddingLeft: 22, paddingRight: 22 }}>
        {company.atividades_secundarias.map((atividade, index) => (
          <List.Item key={index}>
            <List.Header>{atividade.text}</List.Header>
            <List.Description>{atividade.code}</List.Description>
          </List.Item>
        ))}
      </List>
    </Card.Content>
  </Card>
);

export default CompanyCard;

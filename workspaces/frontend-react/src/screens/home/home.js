import React, { useState } from 'react';
import { Button, Card, Columns, Form, Hero } from 'react-bulma-components';
import * as api from 'services/api';
import logo from 'assets/images/logo.webp';
import './home.scss';
import { DatePicker } from './components/date-picker';

const Home = () => {
  const [form, setForm] = useState({ destination: '', dateStart: undefined, dateEnd: undefined, travelers: '' });

  const onChange = (evt) => {
    setForm((state) => {
      return {
        ...state,
        [evt.target.name]: evt.target.value,
      };
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    api.search(form);
  };

  return (
    <Hero className="home" size="fullheight">
      <Hero.Head className="header" renderAs="header">
        <span className="logo">
          <img src={logo} alt="logo" />
          <span>ArangoBnB</span>
        </span>
      </Hero.Head>
      <Hero.Body>
        <Card renderAs="form" onSubmit={onSubmit} className="search-form">
          <Columns breakpoint="mobile">
            <Columns.Column desktop={{ size: 4 }} tablet={{ size: 12 }} mobile={{ size: 12 }}>
              <Form.Input
                autoComplete="off"
                autoCapitalize="off"
                onChange={onChange}
                value={form.destination}
                name="destination"
                placeholder="I want to go to"
              />
            </Columns.Column>
            <Columns.Column desktop={{ size: 2 }} tablet={{ size: 6 }} mobile={{ size: 12 }}>
              <DatePicker onChange={onChange} value={form.dateStart} name="dateStart" placeholder="from this date" />
            </Columns.Column>
            <Columns.Column desktop={{ size: 2 }} tablet={{ size: 6 }} mobile={{ size: 12 }}>
              <DatePicker onChange={onChange} value={form.dateEnd} name="dateEnd" placeholder="to this dates" />
            </Columns.Column>
            <Columns.Column desktop={{ size: 4 }} tablet={{ size: 12 }} mobile={{ size: 12 }}>
              <Form.Input autoComplete="off" onChange={onChange} value={form.travelers} name="travelers" placeholder="and we are 2 persons" />
            </Columns.Column>
          </Columns>
          <Button className="search" color="primary">
            Search
          </Button>
        </Card>
      </Hero.Body>
    </Hero>
  );
};

export default Home;

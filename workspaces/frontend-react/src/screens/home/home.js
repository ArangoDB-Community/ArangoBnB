import React, { useState } from 'react';
import { Button, Card, Columns, Hero } from 'react-bulma-components';
import api from 'services/api';
import logo from 'assets/images/logo.webp';
import { DatePicker } from './components/date-picker';
import DestinationPicker from './components/destination-picker';
import TravelersPicker from './components/travelers-picker';
import './home.scss';

const Home = () => {
  const [form, setForm] = useState({ destination: '', dateStart: undefined, dateEnd: undefined, travelers: { adults: 1, children: 0 } });

  const onSelectDestination = (option) => {
    setForm((state) => {
      return {
        ...state,
        destination: option,
      };
    });
  };

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

  const isDisabled = !form.destination || !form.dateStart || !form.dateEnd || !form.travelers.adults;

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
            <Columns.Column desktop={{ size: 5 }} tablet={{ size: 12 }} mobile={{ size: 12 }}>
              <DestinationPicker onSelect={onSelectDestination} onChange={onChange} value={form.destination} />
            </Columns.Column>
            <Columns.Column desktop={{ size: 2 }} tablet={{ size: 6 }} mobile={{ size: 12 }}>
              <DatePicker onChange={onChange} value={form.dateStart} name="dateStart" placeholder="from this date" />
            </Columns.Column>
            <Columns.Column desktop={{ size: 2 }} tablet={{ size: 6 }} mobile={{ size: 12 }}>
              <DatePicker onChange={onChange} value={form.dateEnd} name="dateEnd" placeholder="to this date" />
            </Columns.Column>
            <Columns.Column desktop={{ size: 3 }} tablet={{ size: 12 }} mobile={{ size: 12 }}>
              <TravelersPicker onChange={onChange} value={form.travelers} />
            </Columns.Column>
          </Columns>
          <Button rounded disabled={isDisabled} className="search" color="primary">
            Search
          </Button>
        </Card>
      </Hero.Body>
    </Hero>
  );
};

export default Home;

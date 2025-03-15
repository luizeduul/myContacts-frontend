import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import { Container as EditContactPage } from '../pages/EditContact';
import NewContact from '../pages/NewContact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/novo" exact component={NewContact} />
      <Route path="/:id" exact component={EditContactPage} />
    </Switch>
  );
}

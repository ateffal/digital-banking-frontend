import { Routes } from '@angular/router';
import {Customers} from './customers/customers';
import {Accounts} from './accounts/accounts';
import {NewCustomer} from './new-customer/new-customer';

export const routes: Routes = [
  { path : "customers", component: Customers},
  { path : "accounts", component: Accounts},
  { path : "customers/search", component: Customers},
  { path : "new-customer", component: NewCustomer},
];

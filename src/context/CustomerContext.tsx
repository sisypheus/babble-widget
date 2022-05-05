import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Customer, CustomerProviderType } from '../models';
import { v4 } from 'uuid';

export const CustomerContext = createContext<CustomerProviderType>({} as CustomerProviderType);

export const useCustomer = () => {
  return useContext(CustomerContext);
}

export const CustomerContextProvider = ({ children }: { children: ComponentChildren }) => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const createNewCustomer = (): Customer => {
    const newCustomer: Customer = {
      id: v4(),
      name: 'Anonymous User',
      email: undefined,
    };
    return newCustomer;
  }

  useEffect(() => {
    const existingCustomer = localStorage.getItem('customer');
    if (existingCustomer)
      return setCustomer(JSON.parse(existingCustomer));
    const newCustomer = createNewCustomer();
    setCustomer(newCustomer);
  }, [])

  useEffect(() => {
    if (customer)
      localStorage.setItem('customer', JSON.stringify(customer));
  }, [customer]);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
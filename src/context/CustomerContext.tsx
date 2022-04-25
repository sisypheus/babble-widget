import { ComponentChildren, createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Customer, CustomerProviderType, Message, Messages } from '../models';

export const CustomerContext = createContext<CustomerProviderType>({} as CustomerProviderType);

export const useCustomer = () => {
  return useContext(CustomerContext);
}

export const CustomerContextProvider = ({ children }: { children: ComponentChildren }) => {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  useEffect(() => {
    const id = localStorage.getItem('BABBLE_CUSTOMER_ID');
    if (!id)
      return
    const name = localStorage.getItem('BABBLE_CUSTOMER_NAME') ?? undefined;
    const email = localStorage.getItem('BABBLE_CUSTOMER_EMAIL') ?? undefined;
    setCustomer({
      id,
      name,
      email,
    });
  }, [])

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
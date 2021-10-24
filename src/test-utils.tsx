import React, { FC } from 'react';
import { render } from '@testing-library/react';
import AppProviders from './AppProviders';

const AllTheProviders: FC<any> = ({ children }) => {
  return <AppProviders>{children}</AppProviders>;
};

const customRender = (ui: any, options?: any) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

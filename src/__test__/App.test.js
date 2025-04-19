import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('boundary', () => {
  test('AppComponent boundary renders App component with heading', () => {
    const { getByText } = render(<App />);
    expect(getByText('React Form Validation with Refs')).toBeInTheDocument();
  });

  test('AppComponent boundary renders Form component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Submit')).toBeInTheDocument(); // Assuming the Form component contains a "Submit" button
  });
});

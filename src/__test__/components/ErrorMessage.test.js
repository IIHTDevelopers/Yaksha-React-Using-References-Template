import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from '../../components/ErrorMessage';
import '@testing-library/jest-dom';

describe('boundary', () => {
    test('ErrorMessageComponent boundary renders ErrorMessage component with provided message', () => {
        const { getByText } = render(<ErrorMessage message="This is an error message" />);
        expect(getByText('This is an error message')).toBeInTheDocument();
    });

    test('ErrorMessageComponent boundary renders ErrorMessage component with correct style', () => {
        const { getByText } = render(<ErrorMessage message="Styled error message" />);
        const errorMessage = getByText('Styled error message');
        expect(errorMessage).toHaveStyle('color: red');
    });
});

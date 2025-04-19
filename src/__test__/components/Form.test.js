import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../../components/Form';
import '@testing-library/jest-dom';
import { validateName, validateEmail } from '../../utils/validate';

jest.mock('../../utils/validate');

describe('boundary', () => {
    beforeEach(() => {
        validateName.mockClear();
        validateEmail.mockClear();
    });

    test('FormComponent boundary renders Form component with heading', () => {
        const { getByText } = render(<Form />);
        expect(getByText('Form Validation')).toBeInTheDocument();
    });

    test('FormComponent boundary renders input fields and buttons', () => {
        const { getByLabelText, getByText } = render(<Form />);

        expect(getByLabelText('Name')).toBeInTheDocument();
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
        expect(getByText('Reset')).toBeInTheDocument();
    });

    test('FormComponent boundary validates and submits the form successfully', () => {
        validateName.mockReturnValue('');
        validateEmail.mockReturnValue('');

        const { getByLabelText, getByText } = render(<Form />);

        fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.click(getByText('Submit'));

        expect(validateName).toHaveBeenCalledWith('John Doe');
        expect(validateEmail).toHaveBeenCalledWith('john.doe@example.com');
        expect(validateName).toHaveBeenCalledTimes(1);
        expect(validateEmail).toHaveBeenCalledTimes(1);
    });

    test('FormComponent boundary shows validation errors when form is submitted with invalid inputs', () => {
        validateName.mockReturnValue('Name is required');
        validateEmail.mockReturnValue('Invalid email address');

        const { getByLabelText, getByText } = render(<Form />);

        fireEvent.change(getByLabelText('Name'), { target: { value: '' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid-email' } });
        fireEvent.click(getByText('Submit'));

        expect(getByText('Name is required')).toBeInTheDocument();
        expect(getByText('Invalid email address')).toBeInTheDocument();
    });

    test('FormComponent boundary resets the form when reset button is clicked', () => {
        validateName.mockReturnValue('');
        validateEmail.mockReturnValue('');

        const { getByLabelText, getByText } = render(<Form />);

        fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.click(getByText('Reset'));

        expect(getByLabelText('Name').value).toBe('');
        expect(getByLabelText('Email').value).toBe('');
    });
});

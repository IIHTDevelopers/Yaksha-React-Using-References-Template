import React from 'react';
import { render } from '@testing-library/react';
import InputField from '../../components/InputField';
import '@testing-library/jest-dom';

describe('boundary', () => {
    test('InputFieldComponent boundary renders InputField component with label', () => {
        const { getByLabelText } = render(
            <InputField label="Name" id="name" />
        );

        expect(getByLabelText('Name')).toBeInTheDocument();
    });

    test('InputFieldComponent boundary passes props to input element', () => {
        const { getByLabelText } = render(
            <InputField label="Email" type="email" placeholder="Enter your email" id="email" />
        );

        const input = getByLabelText('Email');
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toHaveAttribute('placeholder', 'Enter your email');
    });

    test('InputFieldComponent boundary renders error message when error prop is provided', () => {
        const { getByText } = render(
            <InputField label="Username" error="Username is required" id="username" />
        );

        expect(getByText('Username is required')).toBeInTheDocument();
    });

    test('InputFieldComponent boundary does not render error message when error prop is not provided', () => {
        const { queryByText } = render(
            <InputField label="Username" id="username" />
        );

        expect(queryByText('Username is required')).not.toBeInTheDocument();
    });

    test('InputFieldComponent boundary forwards ref to input element', () => {
        const ref = React.createRef();
        render(
            <InputField label="Password" ref={ref} id="password" />
        );

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});

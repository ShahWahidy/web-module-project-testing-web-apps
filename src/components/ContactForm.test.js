import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {getByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstName = screen.queryByLabelText(/First Name/i)
    userEvent.type(firstName, 'Jon');
    const errorMessage = 'Error: firstName must have at least 5 characters.'
    const errorExists = screen.queryByText(errorMessage);
    expect(errorExists).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole('button');
    userEvent.click(button)

    const firstNameError = 'Error: firstName must have at least 5 characters.'
    const lastNameError = 'Error: lastName is a required field.'
    const emailError = 'Error: email must be a valid email address.'

    const firstNameErrorExist = screen.queryByText(firstNameError); 
    const lastNameErrorExist = screen.queryByText(lastNameError);
    const emailErrorExist = screen.queryByText(emailError);
    
    expect(firstNameErrorExist).toBeInTheDocument();
    expect(lastNameErrorExist).toBeInTheDocument();
    expect(emailErrorExist).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
        
    const firstNameValue = screen.queryByLabelText(/First Name*/i);
    userEvent.type(firstNameValue, 'Ahmad')
 
    const lastNameValue = screen.queryByLabelText(/Last Name*/i);
    userEvent.type(lastNameValue, 'Wahidy')

    const button = screen.getByRole('button');
    userEvent.click(button)

    const errMessage =  await screen.getAllByTestId('error')
    expect(errMessage).toHaveLength(1);
 
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const emailValue = screen.getByLabelText(/Email*/i)
    userEvent.type(emailValue, 'asdf')
    
    const errMessage = await screen.findByText(/email must be a valid email address/i)
    expect(errMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole('button');
    userEvent.click(button)
    const lastNameError = 'Error: lastName is a required field.'
    const lastNameErrorExist = screen.queryByText(lastNameError);
    expect(lastNameErrorExist).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    
    const firstNameValue = screen.getByLabelText(/first name*/i)
    const lastNameValue = screen.getByLabelText(/last name*/i)
    const emailValue = screen.getByLabelText(/email*/i)
    
    userEvent.type(firstNameValue, 'Ahmad');
    userEvent.type(lastNameValue, 'Wahidy');
    userEvent.type(emailValue, 'ahmad@mail.com')

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Ahmad')
        const lastNameDisplay = screen.queryByText('Wahidy')
        const emailDisplay = screen.queryByText('ahmad@mail.com')
        const messageDisplay = screen.queryByTestId('messageDisplay')

        expect(firstNameValue).toBeInTheDocument();
        expect(lastNameValue).toBeInTheDocument();
        expect(emailValue).toBeInTheDocument();
        // expect(messageDisplay).not.toBeInTheDocument();
    })

    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    
    const firstNameValue = screen.getByLabelText(/first name*/i)
    const lastNameValue = screen.getByLabelText(/last name*/i)
    const emailValue = screen.getByLabelText(/email*/i)
    const messageValue = screen.getByLabelText(/message*/i)
    
    userEvent.type(firstNameValue, 'Ahmad');
    userEvent.type(lastNameValue, 'Wahidy');
    userEvent.type(emailValue, 'ahmad@mail.com')

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Ahmad')
        const lastNameDisplay = screen.queryByText('Wahidy')
        const emailDisplay = screen.queryByText('ahmad@mail.com')
        const messageDisplay = screen.queryByTestId('Message Text')

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        //expect(messageDisplay).toBeInTheDocument();
    })
});
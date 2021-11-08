import isEmpty from 'lodash/isEmpty';

const required = (value: any) => (isEmpty(value) ? 'Required' : undefined);

const maxLength = (max: number, message?: string) => (value: string) =>
    value && value.length > max ? message || `Must be ${max} characters or less` : undefined;

const minLength = (min: number, message?: string) => (value: string) =>
    value && value.length < min ? message || `Must be ${min} characters or more` : undefined;

const email = (message?: string) => (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? message || 'Invalid email address' : undefined;

const validator = {
    minLength,
    maxLength,
    required,
    email,
};

export default validator;

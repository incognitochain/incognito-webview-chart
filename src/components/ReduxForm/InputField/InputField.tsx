import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { INPUT_FIELD } from './InputField.constant';
import { Styled } from './InputField.styled';

export interface IInputFieldProps {
    meta: WrappedFieldMetaProps;
    input: WrappedFieldInputProps;
    componentProps: React.InputHTMLAttributes<HTMLInputElement> | React.InputHTMLAttributes<HTMLInputElement> | any;
    inputType?: number;
    subtitle?: boolean;
    suffix?: string;
    warning?: string;
    errorCustom?: string;
}

interface IInputProps {
    input: WrappedFieldInputProps;
    componentProps: React.InputHTMLAttributes<HTMLInputElement>;
}

interface ITextAreaProps {
    input: WrappedFieldInputProps;
    componentProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const Input = React.memo((props: IInputProps) => {
    const { input: inputProps, componentProps } = props;
    return <input type="text" autoComplete="off" {...inputProps} {...componentProps} />;
});

export const TextArea = React.memo((props: ITextAreaProps) => {
    const { input: inputProps, componentProps } = props;
    return <textarea autoComplete="off" {...inputProps} {...componentProps} />;
});

const InputField = (props: IInputFieldProps) => {
    const { meta, input, componentProps, inputType, warning, errorCustom } = props;
    const { error: errorMeta, touched, submitting } = meta;
    const error = errorMeta || errorCustom;
    const renderError = () => {
        if (submitting) {
            return null;
        }
        return (
            <>
                {(touched && error && (
                    <p
                        className={`error fs-small fw-regular ${
                            inputType === INPUT_FIELD.leftTitleDisplayPTag ? 'align-right' : ''
                        }`}
                    >
                        {error}
                    </p>
                )) ||
                    (touched && warning && (
                        <p
                            className={`warning fs-small fw-regular ${
                                inputType === INPUT_FIELD.leftTitleDisplayPTag ? 'align-right' : ''
                            }`}
                        >
                            {warning}
                        </p>
                    ))}
            </>
        );
    };
    const renderInput = () => {
        switch (inputType) {
            default:
                return (
                    <div className="input-container">
                        <Input {...{ input, componentProps }} />
                    </div>
                );
        }
    };
    return (
        <Styled>
            {renderInput()}
            {renderError()}
        </Styled>
    );
};

export default React.memo(InputField);

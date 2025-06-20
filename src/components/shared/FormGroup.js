import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable form group component that combines a label with an input field
 * (text, textarea, or select), supporting error messages, helper text, and custom styling.
 */
const FormGroup = ({
  label,
  id,
  name,
  type = 'text', // Default to text input
  value,
  onChange,
  placeholder,
  options = [], // For select type
  required = false,
  disabled = false,
  readOnly = false,
  error = '',
  helperText = '',
  className = '', // General className for the root div
  labelClassName = '',
  inputClassName = '',
  wrapperClassName = '', // For the div wrapping label and input (useful for relative positioning)
  onBlur,
  ...rest // To capture any other standard input props like min, max, pattern etc.
}) => {
  // Base Tailwind classes for all input types (input, textarea, select)
  // Incorporates design system colors, typography, and spacing.
  const baseInputClasses = `
    block
    w-full
    p-2
    border
    rounded-md
    text-text                 // Design system text color
    bg-white                  // White background for inputs
    focus:outline-none
    focus:ring-2
    focus:ring-primary        // Design system primary color for focus ring
    focus:border-transparent  // Prevents double border on focus
    transition-all
    duration-200
    ease-in-out
    font-inter                // Design system font family
    text-body_text            // Design system font size (1rem) and line height (1.6)
    ${error ? 'border-red-500' : 'border-gray-300'} // Error state border
    ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''} // Disabled state styles
    ${inputClassName}         // Custom classes passed via props
  `;

  // IDs for helper text and error messages, used for accessibility (aria-describedby)
  const describedBy = [];
  if (helperText) describedBy.push(`${id}-helper`);
  if (error) describedBy.push(`${id}-error`);
  const ariaDescribedBy = describedBy.join(' ') || undefined;

  let inputElement;

  // Render the appropriate input element based on the 'type' prop
  switch (type) {
    case 'textarea':
      inputElement = (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={`${baseInputClasses} min-h-[80px] resize-y`} // Min height and vertical resize for textarea
          aria-describedby={ariaDescribedBy}
          {...rest} // Pass any additional props
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={`${baseInputClasses} appearance-none pr-8`} // Hide default arrow, add padding for custom arrow
          aria-describedby={ariaDescribedBy}
          {...rest} // Pass any additional props
        >
          {/* Optional placeholder for select, value must be empty and disabled for proper UX */}
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    // Default case for standard input types (text, password, email, number, etc.)
    case 'text':
    case 'password':
    case 'email':
    case 'number':
    case 'url':
    case 'tel':
    default:
      inputElement = (
        <input
          id={id}
          name={name}
          type={type} // Allows different input types like email, number, password
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={baseInputClasses}
          aria-describedby={ariaDescribedBy}
          {...rest} // Pass any additional props
        />
      );
      break;
  }

  return (
    // Root container for the form group, semantically grouped for accessibility.
    // Adds a bottom margin (mb-4 = 16px) based on design system common margins.
    <div className={`mb-4 ${className}`} role="group" aria-labelledby={`${id}-label`}>
      {/* Label for the input, linked via htmlFor and id.
          Uses design system text color, font, and a small bottom margin (mb-1 = 4px). */}
      <label
        htmlFor={id}
        id={`${id}-label`} // ID for aria-labelledby on the group
        className={`block text-sm font-medium text-text mb-1 ${labelClassName}`}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>} {/* Required indicator */}
      </label>

      {/* Wrapper div for the input element, useful for positioning icons or custom select arrows. */}
      <div className={`relative ${wrapperClassName}`}>
        {inputElement}
        {/* Custom arrow for select input for better visual control */}
        {type === 'select' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707 2.5-2.5-2.5-2.5-.707.707 1.293 1.293V6h1v5.586l1.293-1.293.707.707-2.5 2.5z" />
            </svg>
          </div>
        )}
      </div>

      {/* Helper text, displayed below the input */}
      {helperText && (
        <p id={`${id}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}

      {/* Error message, displayed below the input when an error occurs */}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

FormGroup.propTypes = {
  /** The text label for the input field. */
  label: PropTypes.string.isRequired,
  /** A unique identifier for the input element, used for `htmlFor` and `id` attributes. */
  id: PropTypes.string.isRequired,
  /** The `name` attribute for the input element. */
  name: PropTypes.string.isRequired,
  /** The type of input element to render (e.g., 'text', 'password', 'email', 'textarea', 'select'). */
  type: PropTypes.string,
  /** The current value of the input element (controlled component). */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Callback function to handle input changes. */
  onChange: PropTypes.func.isRequired,
  /** Placeholder text for the input or textarea. */
  placeholder: PropTypes.string,
  /** Array of options for 'select' type: `{ value: string | number, label: string }[]`. */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /** If true, the input field is required. */
  required: PropTypes.bool,
  /** If true, the input field is disabled. */
  disabled: PropTypes.bool,
  /** If true, the input field is read-only. */
  readOnly: PropTypes.bool,
  /** An error message to display below the input. */
  error: PropTypes.string,
  /** Helper text to display below the input. */
  helperText: PropTypes.string,
  /** Additional CSS classes for the root `div` element of the form group. */
  className: PropTypes.string,
  /** Additional CSS classes for the `label` element. */
  labelClassName: PropTypes.string,
  /** Additional CSS classes for the `input`, `textarea`, or `select` element. */
  inputClassName: PropTypes.string,
  /** Additional CSS classes for the wrapper `div` around the input element (useful for relative positioning of icons, etc.). */
  wrapperClassName: PropTypes.string,
  /** Callback function to handle blur events on the input. */
  onBlur: PropTypes.func,
};

FormGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  options: [],
  required: false,
  disabled: false,
  readOnly: false,
  error: '',
  helperText: '',
  className: '',
  labelClassName: '',
  inputClassName: '',
  wrapperClassName: '',
  onBlur: undefined, // Explicitly undefined for optional props
};

export default FormGroup;
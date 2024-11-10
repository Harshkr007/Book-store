import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ label, name, type = 'text', register, placeholder, required = true, error }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                {...register(name, { required })}
                className="p-2 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                placeholder={placeholder}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    register: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string
};

export default InputField;

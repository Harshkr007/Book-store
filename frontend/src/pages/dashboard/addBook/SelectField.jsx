import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, name, options, register, required = true, error }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                {...register(name, { required })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    register: PropTypes.func.isRequired,
    required: PropTypes.bool,
    error: PropTypes.string
};

export default SelectField;

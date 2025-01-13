import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
  const inputClass =
    'p-2 mt-1 text-md border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-colors';

  return (
    <div className="mb-4">
      <label className="block text-md font-semibold text-gray-700">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, { required: true })}
          className={`${inputClass} h-24 resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required: true })}
          className={inputClass}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;

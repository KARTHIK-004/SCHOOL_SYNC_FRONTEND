import React, { useCallback } from "react";
import Select from "react-tailwindcss-select";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import { Label } from "../ui/label";

const FormSelectInput = ({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  name,
  register,
  errors,
  isSearchable = true,
  required = true,
}) => {
  const handleChange = useCallback(
    (selectedOption) => {
      setOption(selectedOption);
      const event = {
        target: {
          name: name,
          value: selectedOption ? selectedOption.value : "",
        },
      };
      register(name).onChange(event);
    },
    [setOption, register, name]
  );

  register(name, {
    required: required ? `${label} is required` : false,
  });

  return (
    <div className="space-y-2">
      <div className="flex space-x-2 items-center">
        {labelShown && <Label className="text-sm font-medium">{label}</Label>}
      </div>

      <div className="flex items-center space-x-2">
        <Select
          isSearchable={isSearchable}
          primaryColor="blue"
          value={option}
          onChange={handleChange}
          options={options}
          placeholder={label}
          name={name}
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm text-foreground border ${
                errors[name] ? "border-destructive" : "border-input"
              } bg-background hover:bg-accent hover:text-accent-foreground h-10 w-full items-center justify-between rounded-md px-3 py-2 ${
                isDisabled && "opacity-50"
              }`,
            menu: "absolute z-10 w-full bg-popover text-popover-foreground shadow-md rounded-md py-1 mt-1",
            listItem: ({ isSelected }) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                isSelected
                  ? `bg-primary text-primary-foreground`
                  : `text-foreground hover:bg-accent hover:text-accent-foreground`
              }`,
          }}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-destructive">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormSelectInput;

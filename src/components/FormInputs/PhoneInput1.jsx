"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import Select from "react-tailwindcss-select";
import { countries } from "@/lib/countryData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PhoneInput({
  register,
  errors,
  label,
  name,
  toolTipText,
  placeholder,
}) {
  const initialCountryCode = "IN";

  const modifiedCountries = countries.map((country) => ({
    value: country.countryCode,
    label: `${country.countryCode} ${country.phoneCode}`,
    phoneCode: country.phoneCode,
    currencyCode: country.currencyCode,
    countryCode: country.countryCode,
    flag: country.flag,
  }));

  const initialCountry = modifiedCountries.find(
    (item) => item.countryCode === initialCountryCode
  );

  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const formatPhoneNumber = (number) => {
    return number.replace(/^0+/, "");
  };

  const fullNumber = (country, number) => {
    if (!country || !country.phoneCode) return number;
    const formattedNumber = formatPhoneNumber(number);
    return `${country.phoneCode}${formattedNumber}`;
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    updatePhoneNumber(country, phoneNumber);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, "");
    setPhoneNumber(cleanValue);
    updatePhoneNumber(selectedCountry, cleanValue);
    setTouched(true);
  };

  const updatePhoneNumber = (country, number) => {
    const fullPhoneNumber = fullNumber(country, number);
    register(name, { required: true }).onChange({
      target: {
        name,
        value: fullPhoneNumber,
      },
    });
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  const inputId = `phone-input-${name}`;
  const selectId = `country-select-${name}`;

  return (
    <div className="space-y-2">
      <div className="flex space-x-2 items-center">
        <Label
          htmlFor={inputId}
          className="text-sm font-medium"
          id={`${inputId}-label`}
        >
          {label}
        </Label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" aria-label="Help information">
                  <CircleHelp className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="mt-2">
        <div className="flex gap-2">
          <div className="w-32">
            <Select
              isSearchable
              primaryColor="primary"
              value={selectedCountry}
              onChange={handleCountryChange}
              options={modifiedCountries}
              placeholder="Country"
              id={selectId}
              aria-labelledby={`${inputId}-label`}
              formatOptionLabel={(option) => (
                <li
                  className={`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                    !option.isSelected
                      ? `text-foreground`
                      : `bg-primary text-primary-foreground`
                  }`}
                >
                  {option.countryCode} {option.phoneCode}
                </li>
              )}
              classNames={{
                menuButton: ({ isDisabled }) =>
                  `flex text-sm text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-full items-center justify-between rounded-md px-3 py-2 ${
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
          </div>
          <div className="relative flex-1">
            <Input
              id={inputId}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onBlur={() => setTouched(true)}
              className={cn(
                "w-full",
                errors[name] &&
                  "border-destructive focus-visible:ring-destructive"
              )}
              placeholder={placeholder || "Phone number"}
              aria-invalid={errors[name] ? "true" : "false"}
            />
          </div>
        </div>
        {errors[name] && (
          <span className="text-xs text-destructive" role="alert">
            {label} is required
          </span>
        )}
      </div>
    </div>
  );
}

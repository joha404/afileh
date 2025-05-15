/* eslint-disable no-unused-vars */
// import ErrorText from "@/components/common/ErrorText";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Select } from "antd";
import { Controller } from "react-hook-form";

const CommonInputWrapper2 = ({
  label = "",
  type = "text",
  placeholder = "",
  register_as = "",
  register,
  name = "",
  options = [],
  errors = {},
  validationRules = {},
  readOnly = false,
  value = "",
  control,
  selectMode = "single",
  isEdit = false,
}) => {
  const [show, setShow] = useState(false);
  const errorMessage = errors[register_as]?.message;
  const isMultiple = selectMode === "multiple" || selectMode === "tags";
  const valueToPass = isMultiple
    ? Array.isArray(value)
      ? value
      : [value]
    : value;

  return (
    <div className="w-full flex flex-col gap-2 justify-start items-start relative text-base text-dark">
      {/* Label */}
      {label && (
        <label className="capitalize text-dark" htmlFor={register_as}>
          {label}
        </label>
      )}

      {/* Eye Icon for Password */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShow((prevState) => !prevState)}
          className={`absolute cursor-pointer right-5 top-[50%] transform ${
            errorMessage ? "translate-y-[-46%]" : "translate-y-[50%]"
          }`}
        >
          {show ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}

      {/* Textarea */}
      {type === "textarea" ? (
        <textarea
          id={register_as}
          placeholder={placeholder}
          name={name}
          defaultValue={value}
          className="w-full resize-none min-h-48 bg-transparent px-4 py-3 border border-[#E4E7E9] rounded-[8px] placeholder-[#5A5C5F] text-dark outline-none"
          {...register(register_as, validationRules)}
        />
      ) : type === "select" ? (
        <Controller
          control={control}
          name={register_as}
          rules={validationRules}
          render={({ field }) => (
            <Select
              {...field}
              mode={selectMode !== "single" ? selectMode : undefined}
              placeholder={placeholder}
              options={options}
              optionFilterProp="label"
              value={field.value || (isMultiple ? [] : undefined)}
              className="w-full min-h-[50px] border-none rounded-none bg-transparent common_input_select placeholder:text-dark"
              showSearch
              allowClear
            />
          )}
        />
      ) : (
        <input
          type={type === "password" ? (show ? "text" : "password") : type}
          id={register_as}
          placeholder={placeholder}
          name={name}
          defaultValue={value}
          readOnly={readOnly}
          className="w-full px-4 py-3 bg-transparent border border-[#E4E7E9] rounded-none placeholder-[#5A5C5F] text-dark outline-none"
          {...register(register_as, validationRules)}
        />
      )}

      {/* Error Message */}
      {/* {errorMessage && <ErrorText error={errorMessage} />} */}
    </div>
  );
};

export default CommonInputWrapper2;

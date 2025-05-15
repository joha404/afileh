import { useForm } from "react-hook-form";
import CommonInputWrapper from "../common/CommonInputWrapper";
import CommonModalWrapper from "../common/CommonModalWrapper";
import CommonSubmitBtn from "../common/CommonSubmitBtn";
import { SignUpUser } from "../api/auth";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const SignUpModal = ({ setIsSignIn, setIsSignUp }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const handleSignInOpen = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue("profile_image", [file]);
    }
  };

  const onSubmit = async (data) => {
    if (!data.profile_image || data.profile_image.length === 0) {
      return alert("Please upload a profile image.");
    }

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirm_password: data.confirm_password,
      profile_image: data.profile_image[0],
    };
    if (data.profile_image[0] === undefined) {
      return alert("image is undefine");
    }
    setLoading(true);
    try {
      const response = await SignUpUser(payload);
      setIsSignIn(true);
      setIsSignUp(false);
      reset();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <CommonModalWrapper
      title="Sign Up"
      subtitle="Please fill out the fields below"
      className="xl:px-24 md:px-12 2xl:py-14 md:py-10"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <CommonInputWrapper
          label="Name"
          name="name"
          type="text"
          placeholder="Enter Your Name"
          register={register}
          errors={errors}
          register_as="name"
          validationRules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long",
            },
          }}
        />

        <CommonInputWrapper
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter Email"
          register={register}
          errors={errors}
          register_as="email"
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          }}
        />

        <CommonInputWrapper
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter Your Phone Number"
          register={register}
          errors={errors}
          register_as="phone"
          validationRules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Enter a valid phone number",
            },
          }}
        />

        <div className="w-full flex lg:flex-row flex-col lg:gap-7 gap-3">
          <CommonInputWrapper
            label="Password"
            name="password"
            type="password"
            placeholder="*********"
            register={register}
            errors={errors}
            register_as="password"
            validationRules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          <CommonInputWrapper
            label="Confirm Password"
            name="confirm_password"
            type="password"
            placeholder="*********"
            register={register}
            errors={errors}
            register_as="confirm_password"
            validationRules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-solid rounded-lg cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              {selectedFileName && (
                <p className="text-green-600 mt-2">{selectedFileName}</p>
              )}
            </div>
            <input
              id="dropzone-file"
              name="profile_image"
              type="file"
              className="hidden"
              multiple={false}
              accept="image/*"
              {...register("profile_image")}
              onChange={handleFileChange}
            />
          </label>
        </div>

        <label htmlFor="terms" className="text-base flex gap-2 items-center">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            {...register("terms", {
              required: "You must accept the terms and conditions",
            })}
          />
          <p>
            I accept the{" "}
            <span className="text-[#3EC65D]">Terms and Conditions</span> and{" "}
            <span className="text-[#3EC65D]">Privacy Policy</span>.
          </p>
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}

        <CommonSubmitBtn className="mt-4">
          {loading ? <PulseLoader size={12} /> : "Sign Up"}
        </CommonSubmitBtn>
      </form>

      <p className="text-base mt-4">
        Already have an account?{" "}
        <b className="cursor-pointer text-[#3EC65D]" onClick={handleSignInOpen}>
          Sign In
        </b>
      </p>
    </CommonModalWrapper>
  );
};

export default SignUpModal;

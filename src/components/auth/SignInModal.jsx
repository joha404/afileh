import { useForm } from "react-hook-form";
import CommonInputWrapper from "../common/CommonInputWrapper";
import CommonModalWrapper from "../common/CommonModalWrapper";
import CommonSubmitBtn from "../common/CommonSubmitBtn";
import { SignInUser } from "../api/auth";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";

const SignInModal = ({ setIsSignIn, setIsSignUp }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignUpOpen = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);
      const response = await SignInUser(payload);
      console.log(response);

      const { access_token, refresh_token } = response.data.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("userInfo", payload.email);

      setIsSignIn(false);
      setIsSignUp(false);
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error?.response?.data || error.message);
      Swal.fire({
        title: "Login Failed",
        text: error?.response?.data?.message || "Please try again",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonModalWrapper
      title="Sign In"
      subtitle="Welcome Back, Please Enter your Details to sign in"
      className="xl:px-24 md:px-12 xl:py-14 md:py-10"
    >
      <div className="w-full flex flex-col gap-7 justify-start items-center sm:mb-4 sm:mt-10 mt-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3 justify-start"
        >
          <CommonInputWrapper
            label="Email address"
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
            label="Password"
            name="password"
            placeholder="Enter Your Password"
            register={register}
            type="password"
            errors={errors}
            register_as="password"
            validationRules={{
              required: "Password is required",
            }}
          />
          <div className="w-full flex 2xs:flex-row flex-col 2xs:justify-between justify-start items-start">
            <label htmlFor="terms" className="xs:text-lg text-base flex gap-2">
              <input
                type="checkbox"
                required
                id="terms"
                name="terms"
                {...register("terms")}
              />
              <span>Remember me</span>
            </label>
            <p className="2xs:self-end cursor-pointer xs:text-lg text-base text-[#FFF] font-medium">
              Forgot password?
            </p>
          </div>
          <CommonSubmitBtn className="sm:mt-7 mt-4">
            {loading ? <PulseLoader size={12} /> : "Sign In"}
          </CommonSubmitBtn>
        </form>

        <p className="sm:text-xl xs:text-lg text-base">
          Don’t have an account?{" "}
          <b
            className="cursor-pointer text-[#3EC65D]"
            onClick={handleSignUpOpen}
          >
            Sign Up
          </b>
        </p>
      </div>
    </CommonModalWrapper>
  );
};

export default SignInModal;

import { useForm } from "react-hook-form";
import CommonInputWrapper from "../common/CommonInputWrapper";
import CommonSubmitBtn from "../common/CommonSubmitBtn";
import CommonModalWrapper from "../common/CommonModalWrapper";
import PulseLoader from "react-spinners/PulseLoader";
import { SendMessage } from "../api/helpLine";
import { useState } from "react";
import Swal from "sweetalert2";
const HelpLineModal = ({ setIsHelp }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      full_name: data.full_name,
      email: data.email,
      message: data.message,
    };
    console.log(payload);
    setLoading(true);
    try {
      const response = await SendMessage(payload);

      console.log(":", response.data);
      setLoading(false);
      Swal.fire({
        title: "Message Sent Success",
        icon: "success",
        draggable: true,
      });
      setIsHelp(false);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <CommonModalWrapper
      title="Help"
      className="xl:px-24 md:px-12 xl:py-14 md:py-10"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3 justify-start"
      >
        {/** Name */}
        <CommonInputWrapper
          label="Full Name"
          name="full_name"
          type="text"
          placeholder="Enter Your Name"
          register={register}
          errors={errors}
          register_as="full_name"
          validationRules={{
            required: "Name is required",
          }}
        />
        {/** email */}
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
        {/**phone */}
        <CommonInputWrapper
          label="Message"
          name="message"
          type="textarea"
          placeholder="Here"
          register={register}
          errors={errors}
          register_as="message"
        />

        <CommonSubmitBtn className="sm:mt-7 mt-4">
          {loading ? <PulseLoader size={12} /> : " Send"}
        </CommonSubmitBtn>
      </form>
    </CommonModalWrapper>
  );
};

export default HelpLineModal;

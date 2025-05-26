import ai_caller from "@/assets/images/ai_caller_profile.png";
import { CreateAiCall } from "@/components/api/aiCall";
import CommonInputWrapper2 from "@/components/common/CommonInputWrapper2";
import CommonSubmitBtn from "@/components/common/CommonSubmitBtn";
import VapiIntegration from "@/utils/VapiIntegration";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPhoneCall } from "react-icons/fi";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";

const AICaller = () => {
  const [loading, setLoading] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        call_type: data.call_type,
        scenario: data.scenario,
        buyer_persona: data.buyer_persona,
        product_description: data.product_description,
      };

      await CreateAiCall(payload);

      Swal.fire({
        title: "AI Call Created Successfully!  You Can Call Now",
        icon: "success",
        draggable: true,
      });

      reset();
      setFormKey((prev) => prev + 1);

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleCallClose = () => {
    setCallOpen(false);
  };

  return (
    <div className="w-full flex lg:flex-row flex-col sm:gap-10 gap-6">
      {/* Left Card */}
      <div className="lg:w-[500px] w-full h-fit flex flex-col lg:gap-8 sm:gap-5 gap-3 justify-center items-center rounded-lg bg-dark lg:py-10 lg:px-14 p-3">
        <div className="w-full flex flex-col sm:gap-3 justify-center items-center">
          <p className="text-sm text-[#FFF]">You have 5 minutes</p>
          <p className="sm:text-2xl text-xl font-semibold text-[#FFF]">Sara</p>
        </div>
        <div className="lg:max-w-[346px] w-full lg:max-h-[371px] max-h-[450px] rounded-4xl overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={ai_caller}
            alt="image"
          />
        </div>
        <button
          onClick={() => setCallOpen(true)}
          disabled={!isSubmitted}
          className={`w-auto px-8 py-3 flex items-center gap-3 text-white rounded-lg mt-4 ${
            isSubmitted
              ? "bg-[#3EC65D] hover:bg-[#448153]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <FiPhoneCall className="sm:text-2xl" />
          <span className="sm:text-xl font-medium">Start Call Now</span>
        </button>
      </div>

      {/* Call Modal */}
      {callOpen && (
        <div className="fixed inset-0 z-10 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl sm:w-[90%] lg:w-[30%]">
            <VapiIntegration
              onClose={handleCallClose}
              isSubmitted={isSubmitted}
            />
          </div>
        </div>
      )}

      {/* Form Section */}
      <div
        key={formKey}
        className="w-full bg-white rounded-lg lg:p-8 sm:p-5 p-3 flex flex-col sm:gap-6 gap-4"
      >
        <CommonInputWrapper2
          label="Call Type"
          register={register}
          register_as="call_type"
          name="call_type"
          type="select"
          options={[
            { value: "cold_call", label: "VIP of Sales" },
            { value: "sales_manager", label: "Sales Manager" },
            { value: "sales_rep", label: "Sales Representative" },
            { value: "customer_service", label: "Customer Service" },
          ]}
          placeholder="Hold call"
          errors={errors}
          control={control}
          validationRules={{ required: "Please enter name" }}
        />
        <CommonInputWrapper2
          label="Scenario"
          register={register}
          register_as="scenario"
          name="scenario"
          type="textarea"
          placeholder="AI Prompt here..... "
          errors={errors}
          control={control}
          validationRules={{ required: "Please write something here" }}
        />
        <CommonInputWrapper2
          label="Your buyer persona"
          register={register}
          register_as="buyer_persona"
          name="buyer_persona"
          type="select"
          placeholder="VIP of Sales"
          errors={errors}
          options={[
            { value: "vip_sales", label: "VIP of Sales" },
            { value: "sales_manager", label: "Sales Manager" },
            { value: "sales_rep", label: "Sales Representative" },
            { value: "customer_service", label: "Customer Service" },
          ]}
          control={control}
          validationRules={{ required: "Please enter name" }}
        />
        <CommonInputWrapper2
          label="Your product description"
          register={register}
          register_as="product_description"
          name="product_description"
          type="textarea"
          placeholder="AI coach for sales teams"
          errors={errors}
          control={control}
          validationRules={{ required: "Please write something here" }}
        />
        <p className="sm:text-lg text-sm text-[#3EC65D]">
          You can change your buyer persona and product description here
        </p>
        <CommonSubmitBtn
          className="mt-4"
          onclick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? <PulseLoader size={12} /> : "Submit"}
        </CommonSubmitBtn>
      </div>
    </div>
  );
};

export default AICaller;

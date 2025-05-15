const CommonModalWrapper = ({ title = "", subtitle = "", className = "", children }) => {
  return (
    <div
      className={`w-full max-w-[950px] mx-auto flex flex-col sm:gap-5 gap-3 items-center ${className}`}
    >
      <h1 className="lg:text-4xl sm:text-3xl text-2xl">{title}</h1>
      <p className="sm:text-lg text-[#FFF]">{subtitle}</p>
      {children}
    </div>
  );
};

export default CommonModalWrapper;

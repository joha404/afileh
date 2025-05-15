const LeaderBoardCard = ({ userInfo = {} }) => {
  const { id, position = 0, img = "", name = "Unknown", mark = 0 } = userInfo;
  console.log(id);
  // Define background color based on position
  const bgColor =
    position === "1st"
      ? "bg-[#FFF2CC]"
      : position === "2nd"
      ? "bg-[#E5FFEE]"
      : position === "3rd"
      ? "bg-[#DAE4FF]"
      : position === "11th"
      ? "bg-[#FFE8DB]"
      : "bg-[#FFFFFF] border-[1px] border-[#EEF2F5]";

  return (
    <div
      className={`w-full sm:p-5 p-2 rounded-lg flex xs:flex-row flex-col justify-between items-center ${bgColor}`}
    >
      <div className="w-full flex xs:flex-row flex-col items-center sm:text-[22px] text-base sm:gap-6 xs:gap-3 gap-1">
        <h2>{position}</h2>
        <div className="sm:w-[72px] w-8 sm:h-[72px] h-8 rounded-full overflow-hidden">
          <img className="w-full h-full object-contain" src={img} alt={name} />
        </div>
        <p>{name}</p>
      </div>
      <h4 className="w-fit sm:text-[22px] text-base">
        Mark:<span className="text-[#3EC65D]">{mark}</span>
      </h4>
    </div>
  );
};

export default LeaderBoardCard;

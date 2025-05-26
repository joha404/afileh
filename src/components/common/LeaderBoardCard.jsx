const LeaderBoardCard = ({ userInfo = {} }) => {
  const { id, position = 0, img = "", name = "Unknown", mark = 0 } = userInfo;

  // Define background color based on position
  const positionColors = {
    "1st": "bg-[#DAE4FF]",
    "2nd": "bg-[#FFF2CC]",
    "3rd": "bg-[#E5FFEE]",
    "4th": "bg-[#F0F8FF]",
    "5th": "bg-[#F5F5DC]",
    "6th": "bg-[#E6E6FA]",
    "7th": "bg-[#FFE4E1]",
    "8th": "bg-[#FDF5E6]",
    "9th": "bg-[#FFF0F5]",
    "10th": "bg-[#F0FFF0]",
    "11th": "bg-[#FFE8DB]",
    "12th": "bg-[#F0FFFF]",
    "13th": "bg-[#FFFACD]",
    "14th": "bg-[#FAFAD2]",
    "15th": "bg-[#E0FFFF]",
  };

  const bgColor =
    positionColors[position] || "bg-[#FFFFFF] border-[1px] border-[#EEF2F5]";

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

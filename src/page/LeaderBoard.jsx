import LeaderBoardCard from "@/components/common/LeaderBoardCard";
import leaderboard_img1 from "../assets/images/leaderboard_img_1.png";
import leaderboard_img2 from "../assets/images/leaderboard_img_2.png";
import leaderboard_img3 from "../assets/images/leaderboard_img_3.png";
import leaderboard_img4 from "../assets/images/leaderboard_img_4.png";
import leaderboard_img5 from "../assets/images/leaderboard_img_5.png";

const LeaderBoard = () => {
  const top = [
    {
      id: 1,
      position: "1st",
      img: leaderboard_img1,
      name: "Mosfiqur Rahman",
      mark: "95%",
    },
    {
      id: 2,
      position: "2nd",
      img: leaderboard_img2,
      name: "Albert Flores",
      mark: "95%",
    },
    {
      id: 3,
      position: "3rd",
      img: leaderboard_img3,
      name: "Ralph Edwards",
      mark: "95%",
    },
    {
      id: 4,
      position: "4th",
      img: leaderboard_img4,
      name: "Kathryn Murphy",
      mark: "95%",
    },
  ];

  const you = {
    id: 1,
    position: "11th",
    img: leaderboard_img5,
    name: "Darrell Steward",
    mark: "90%",
  };

  const other = [
    {
      id: 1,
      position: "2nd",
      img: leaderboard_img1,
      name: "Mosfiqur Rahman",
      mark: "95%",
    },
    {
      id: 2,
      position: "5th",
      img: leaderboard_img2,
      name: "Albert Flores",
      mark: "95%",
    },
    {
      id: 3,
      position: "6th",
      img: leaderboard_img3,
      name: "Ralph Edwards",
      mark: "95%",
    },
    {
      id: 4,
      position: "9th",
      img: leaderboard_img4,
      name: "Kathryn Murphy",
      mark: "95%",
    },
  ];

  return (
    <div className="bg-white w-full flex flex-col gap-5 rounded-lg sm:p-6 p-3">
      <div className="w-full flex flex-col sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">
          Top Active Learners
        </h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
          {top?.map((topItem) => (
            <LeaderBoardCard key={topItem.id} userInfo={topItem} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">You</h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>

        <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
          <LeaderBoardCard userInfo={you} />
        </div>
      </div>
      <div className="w-full flex flex-col sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">
          Top Active Learners
        </h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
          {other?.map((otherItem) => (
            <LeaderBoardCard key={otherItem.id} userInfo={otherItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;

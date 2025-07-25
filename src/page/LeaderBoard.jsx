import { useEffect, useState } from "react";
import LeaderBoardCard from "@/components/common/LeaderBoardCard";
import leaderboard_img1 from "../assets/images/leaderboard_img_1.png";
import leaderboard_img2 from "../assets/images/leaderboard_img_2.png";
import leaderboard_img3 from "../assets/images/leaderboard_img_3.png";
import leaderboard_img4 from "../assets/images/leaderboard_img_4.png";
import leaderboard_img5 from "../assets/images/leaderboard_img_5.png";
import { getLeaderBoard } from "@/components/api/callLog";

const LeaderBoardSkeleton = () => (
  <div className="w-full animate-pulse border border-gray-200 p-4 rounded-lg flex flex-col gap-2 bg-gray-100">
    <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
    <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
  </div>
);

const LeaderBoard = () => {
  const [topLearners, setTopLearners] = useState([]);
  const [otherLearners, setOtherLearners] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const fallbackImages = [
    leaderboard_img1,
    leaderboard_img2,
    leaderboard_img3,
    leaderboard_img4,
    leaderboard_img5,
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getLeaderBoard();
      const data = res.data;
      setTopLearners(data.top_learners || []);
      setOtherLearners(data.other_learners || []);
      setCurrentUser(data.you || null);
    } catch (err) {
      console.error("Failed to fetch leaderboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white w-full flex flex-col gap-5 rounded-lg sm:p-6 p-3">
      {/* Top Learners */}
      <div className="w-full flex flex-col sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">
          Top Active Learners
        </h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
          {loading
            ? [1, 2, 3, 4].map((i) => <LeaderBoardSkeleton key={i} />)
            : topLearners.map((user, index) => (
                <LeaderBoardCard
                  key={user.user_id}
                  userInfo={{
                    id: index + 1,
                    position: getOrdinal(user.rank),
                    img:
                      user.profile_image ||
                      fallbackImages[index] ||
                      leaderboard_img5,
                    name: user.name,
                    mark: `${user.marks}%`,
                  }}
                />
              ))}
        </div>
      </div>

      {/* You */}
      <div className="w-full flex flex-col mt-6 sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">You</h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
          {loading ? (
            <LeaderBoardSkeleton />
          ) : currentUser ? (
            <LeaderBoardCard
              key={currentUser.user_id}
              userInfo={{
                id: currentUser.rank,
                position: getOrdinal(currentUser.rank),
                img:
                  currentUser.profile_image === null
                    ? leaderboard_img4
                    : currentUser.profile_image,
                name: currentUser.name,
                mark: `${currentUser.marks}%`,
              }}
            />
          ) : (
            <div className="text-gray-500">You are not ranked yet.</div>
          )}
        </div>
      </div>

      {/* All Learners */}
      <div className="w-full flex flex-col mt-8 sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">All Learners</h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
          {loading
            ? [1, 2, 3, 4].map((i) => <LeaderBoardSkeleton key={i} />)
            : otherLearners.map((user) => (
                <LeaderBoardCard
                  key={user.user_id}
                  userInfo={{
                    id: user.rank,
                    position: getOrdinal(user.rank),
                    img:
                      user.profile_image === null
                        ? leaderboard_img5
                        : user.profile_image,
                    name: user.name,
                    mark: `${user.marks}%`,
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;

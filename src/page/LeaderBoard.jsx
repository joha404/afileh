import { useEffect, useState } from "react";
import LeaderBoardCard from "@/components/common/LeaderBoardCard";
import leaderboard_img1 from "../assets/images/leaderboard_img_1.png";
import leaderboard_img2 from "../assets/images/leaderboard_img_2.png";
import leaderboard_img3 from "../assets/images/leaderboard_img_3.png";
import leaderboard_img4 from "../assets/images/leaderboard_img_4.png";
import leaderboard_img5 from "../assets/images/leaderboard_img_5.png";
import { getAllCalls } from "@/components/api/callLog";
import { GetSingleUser } from "@/components/api/auth";

const LeaderBoardSkeleton = () => (
  <div className="w-full animate-pulse border border-gray-200 p-4 rounded-lg flex flex-col gap-2 bg-gray-100">
    <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
    <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
  </div>
);

const LeaderBoard = () => {
  const [topThree, setTopThree] = useState([]);
  const [allUserScores, setAllUserScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchTopPerformers = async () => {
    setLoading(true);
    try {
      const allCalls = await getAllCalls();
      const userCall = allCalls.filter(
        (call) => !!call.assistantOverrides?.variableValues?.email
      );

      const scores = {};

      userCall.forEach((call) => {
        const email = call.assistantOverrides?.variableValues?.email;
        const isSuccess = call.analysis?.successEvaluation === "true";
        const messageCount = call.messages?.length || 0;

        if (email && isSuccess) {
          scores[email] = (scores[email] || 0) + messageCount;
        }
      });

      const allUserEmails = [
        ...new Set(
          userCall.map((call) => call.assistantOverrides?.variableValues?.email)
        ),
      ];

      const allUserScores = allUserEmails.map((email) => {
        const rawScore = scores[email] || 0;
        const cappedScore = Math.min(rawScore, 100);
        return { email, score: cappedScore };
      });

      allUserScores.sort((a, b) => b.score - a.score);

      // Assign top 5 with placeholder images
      const images = [
        leaderboard_img1,
        leaderboard_img2,
        leaderboard_img3,
        leaderboard_img4,
        leaderboard_img5,
      ];

      const topFive = allUserScores.slice(0, 5).map((user, i) => ({
        ...user,
        profile_image_url: images[i] || leaderboard_img5,
      }));

      // All users get a default image
      const allScoredUsers = allUserScores.map((user) => ({
        ...user,
        profile_image_url: leaderboard_img5,
      }));

      setTopThree(topFive);
      setAllUserScores(allScoredUsers);
    } catch (error) {
      console.error("Error fetching call logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const currentEmail = localStorage.getItem("userInfo");

  async function signleUser() {
    const currentUser = await GetSingleUser(currentEmail);
    if (currentUser) {
      setUsers(currentUser);
    }
  }

  useEffect(() => {
    fetchTopPerformers();
    signleUser();
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
            : topThree.map((user, index) => (
                <LeaderBoardCard
                  key={user.email}
                  userInfo={{
                    id: index + 1,
                    position: getOrdinal(index + 1),
                    img: user.profile_image_url,
                    name: user.email,
                    mark: `${user.score}%`,
                  }}
                />
              ))}
        </div>
      </div>
      {/* Current User */}
      <div className="w-full flex flex-col mt-6 sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">You</h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
          {loading ? (
            <LeaderBoardSkeleton />
          ) : (
            (() => {
              const foundUser = allUserScores.find(
                (user) => user.email === currentEmail
              );
              if (!foundUser) {
                return (
                  <div className="text-gray-500">You are not ranked yet.</div>
                );
              }
              const index = allUserScores.findIndex(
                (user) => user.email === currentEmail
              );
              return (
                <LeaderBoardCard
                  key={foundUser.email}
                  userInfo={{
                    id: index + 1,
                    position: getOrdinal(index + 1),
                    img: foundUser.profile_image_url,
                    name: foundUser.email,
                    mark: `${foundUser.score}%`,
                  }}
                />
              );
            })()
          )}
        </div>
      </div>
      {console.log(users)}
      {/* All Learners */}
      <div className="w-full flex flex-col mt-8 sm:gap-5 gap-3">
        <h1 className="sm:text-2xl text-xl font-semibold">All Learners</h1>
        <div className="w-full border-[1px] border-[#EEF2F5]"></div>
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-5">
          {loading
            ? [1, 2, 3, 4].map((i) => <LeaderBoardSkeleton key={i} />)
            : allUserScores.map((user, index) => (
                <LeaderBoardCard
                  key={user.email}
                  userInfo={{
                    id: index + 1,
                    position: getOrdinal(index + 1),
                    img: user.profile_image_url,
                    name: user.email,
                    mark: `${user.score}%`,
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;

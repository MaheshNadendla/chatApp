import React, { useContext } from "react";
import "./Channels.css";
import { ContextDef } from "../contextDef";

const channels = [
  {
    name: "Learn English | IELTS | Grammar",
    followers: "74L followers",
    image: "channels.jpg",
    bio: "Improve your English grammar, speaking, and IELTS prep.",
    followed: false,
  },
  {
    name: "PWR X FF",
    followers: "28T followers",
    image: "channels.jpg",
    bio: "Gaming, fun, and esports strategies.",
    followed: false,
  },
  {
    name: "LUCENT GK GS NCERT SSC GD GD GK T...",
    followers: "18.5L followers",
    image: "channels.jpg",
    bio: "Crack SSC, GD exams with Lucent, NCERT & GK tricks.",
    followed: false,
  },
  {
    name: "Learn English Speaking & Communication...",
    followers: "26T followers",
    image: "channels.jpg",
    bio: "Boost your English communication and confidence.",
    followed: false,
  },
  {
    name: "IT Job Openings and Referrals",
    followers: "14T followers",
    image: "channels.jpg",
    bio: "Daily job posts and employee referrals for IT roles.",
    followed: false,
  },
  {
    name: "Logical Reasoning Tricks",
    followers: "23L followers",
    image: "channels.jpg",
    bio: "Ace your logical reasoning exams with proven tricks.",
    followed: false,
  },
  {
    name: "General Knowledge | UPSC & SSC",
    followers: "45L followers",
    image: "channels.jpg",
    bio: "Stay updated for UPSC and SSC exams with GK capsules.",
    followed: false,
  },
  {
    name: "Learn English | IELTS | Grammar",
    followers: "74L followers",
    image: "channels.jpg",
    bio: "Improve your English grammar, speaking, and IELTS prep.",
    followed: false,
  },
  {
    name: "PWR X FF",
    followers: "28T followers",
    image: "channels.jpg",
    bio: "Gaming, fun, and esports strategies.",
    followed: false,
  },
  {
    name: "LUCENT GK GS NCERT SSC GD GD GK T...",
    followers: "18.5L followers",
    image: "channels.jpg",
    bio: "Crack SSC, GD exams with Lucent, NCERT & GK tricks.",
    followed: false,
  },
  {
    name: "Learn English Speaking & Communication...",
    followers: "26T followers",
    image: "channels.jpg",
    bio: "Boost your English communication and confidence.",
    followed: false,
  },
  {
    name: "IT Job Openings and Referrals",
    followers: "14T followers",
    image: "channels.jpg",
    bio: "Daily job posts and employee referrals for IT roles.",
    followed: false,
  },
  {
    name: "Logical Reasoning Tricks",
    followers: "23L followers",
    image: "channels.jpg",
    bio: "Ace your logical reasoning exams with proven tricks.",
    followed: false,
  },
  {
    name: "General Knowledge | UPSC & SSC",
    followers: "45L followers",
    image: "channels.jpg",
    bio: "Stay updated for UPSC and SSC exams with GK capsules.",
    followed: false,
  }
];


const ChannelsList = () => {

  const {setHomeRightPageChannel,homeRightPageChannel} = useContext(ContextDef);

  return (
    <div className="channels-container">
      <div className="channels-header">
        <h2>Channels</h2>
        <button className="add-btn">＋</button>
      </div>
      <p className="subtext">Stay updated on your favorite topics</p>
      <p className="description">Find channels to follow below</p>

      <div className="channels-scroll">
        {channels.map((channel, index) => (
          <div
            className="channel-item"
            key={index}
            onClick={() => setHomeRightPageChannel(channel)}

            style={{
              backgroundColor: channel === homeRightPageChannel ? "#f7f5f4" : ""
            }}

          >
            <img src={channel.image} alt={channel.name}  />
            <div className="channel-info">
              <div className="name">{channel.name}</div>
              <div className="followers">{channel.followers}</div>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        ))}
      </div>

        <div className="Chny-Dis">

            <button className="discover-btn">Discover more</button>

        </div>

    </div>
  );
};

export default ChannelsList;

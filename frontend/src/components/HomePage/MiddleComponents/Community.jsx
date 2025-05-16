import React, { useContext } from "react";
import "./Community.css";
import { ContextDef } from "../contextDef";

const communities = [
  {
    name: "Web Developers Hub",
    followers: "42L followers",
    image: "channels.jpg",
    bio: "A space for modern frontend & backend discussions.",
    followed: false,
  },
  {
    name: "AI & ML Enthusiasts",
    followers: "31T followers",
    image: "channels.jpg",
    bio: "Learn, share, and innovate in the world of AI.",
    followed: false,
  },
  {
    name: "UI/UX Design Corner",
    followers: "20L followers",
    image: "channels.jpg",
    bio: "Where aesthetics meet usability.",
    followed: false,
  },
  {
    name: "Freelance & Remote Jobs",
    followers: "38T followers",
    image: "channels.jpg",
    bio: "Your go-to place for job leads and gig sharing.",
    followed: false,
  },
  {
    name: "Competitive Programming",
    followers: "15L followers",
    image: "channels.jpg",
    bio: "Sharpen your coding skills with daily challenges.",
    followed: false,
  },
  {
    name: "JavaScript Masters",
    followers: "28L followers",
    image: "channels.jpg",
    bio: "Master JS with top developers around the world.",
    followed: false,
  },
  {
    name: "Cloud & DevOps",
    followers: "19T followers",
    image: "channels.jpg",
    bio: "Explore cloud computing, automation, and CI/CD.",
    followed: false,
  },
  {
    name: "Freelance & Remote Jobs",
    followers: "38T followers",
    image: "channels.jpg",
    bio: "Your go-to place for job leads and gig sharing.",
    followed: false,
  },
  {
    name: "Competitive Programming",
    followers: "15L followers",
    image: "channels.jpg",
    bio: "Sharpen your coding skills with daily challenges.",
    followed: false,
  },
  {
    name: "JavaScript Masters",
    followers: "28L followers",
    image: "channels.jpg",
    bio: "Master JS with top developers around the world.",
    followed: false,
  },
  {
    name: "Cloud & DevOps",
    followers: "19T followers",
    image: "channels.jpg",
    bio: "Explore cloud computing, automation, and CI/CD.",
    followed: false,
  },
];


const CommunityList = () => {

  const{setHomeRightPage,homeRightPage} = useContext(ContextDef);

  return (
    <div className="community-container">
      <div className="community-header">
        <h2>Community</h2>
        <button className="community-add-btn">＋</button>
      </div>
      <p className="community-subtext">Join communities that match your interests</p>
      <p className="community-description">Explore and follow communities below</p>

      <div className="community-scroll">
        {communities.map((community, index) => (
          <div className="community-item" key={index}  onClick={() => setHomeRightPage(community)}  style={{
              backgroundColor: community === homeRightPage ? "#f7f5f4" : ""
            }} >
            <img src={community.image} alt={community.name} />
            <div className="community-info">
              <div className="name">{community.name}</div>
              <div className="followers">{community.followers}</div>
            </div>
           
              <button className="community-follow-btn">Follow</button>
          
          </div>
        ))}
      </div>

         <div className="Cmty-Dis">
            <button className="community-discover-btn">Discover more</button>
        </div>
    </div>
  );
};

export default CommunityList;

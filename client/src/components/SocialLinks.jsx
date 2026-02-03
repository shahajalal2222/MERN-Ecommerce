import React from 'react';
import{
   FaEnvelope,
   FaFacebook,
   FaGithub,
   FaLinkedin,
   FaYoutube,
} from "react-icons/fa";
const linkData=[
    {
        icon: <FaGithub/>,
        href: "https://github.com/shahajalal2222",
    },
    {
        icon: <FaYoutube/>,
        href: "https://www.youtube.com/feed/subscriptions",
    },
    {
        icon: <FaLinkedin/>,
        href: "https://www.linkedin.com/in/shahajalal-islam-336009341/",
    },
    {
        icon: <FaFacebook/>,
        href: "https://www.linkedin.com/in/shahajalal-islam-336009341/",
    },
    {
        icon: <FaEnvelope/>,
        href: "https://www.youtube.com/feed/subscriptions",
    },
];
const SocialLinks = () => {
  return (
    <div className="text-xl pt-2 text-white/50 flex items-center gap-x-2">
      {linkData?.map((item,index)=>
        (<a key={index} href={item?.href} target='blank'
        className="border border-white/20 inline-flex
        p-2 rounded-full hover:text-white hover:border-white
        duration-300 cursor-p-2">{item?.icon}</a>))}
    </div>
  );
};

export default SocialLinks;

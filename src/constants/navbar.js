
import {
  FaHouse,
  FaUser,
  FaFolder,
  FaPaperPlane,
  FaRegFileLines,
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

export const navigationItems = [
  { label: "Home", href: "/", icon: FaHouse },
  { label: "About", href: "/about", icon: FaUser },
  { label: "UI Gallery", href: "/gallery", icon: FaFolder },
];

export const socialItems = [
  { label: "GitHub", href: "https://github.com/dj740792", icon: FaGithub },
  { label: "X", href: "https://x.com/dhrxvui", icon: FaXTwitter },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhruv-jha-7a1a4441b/",
    icon: FaLinkedinIn,
  },
];

export const contactItem = {
  label: "Contact",
  icon: FaPaperPlane,
};

export const resumeItem = {
  label: "Resume",
  href: "/resume.pdf",
  icon: FaRegFileLines,
};

import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types"; 
import { Link } from "react-router-dom";// Import PropTypes
import { Button,buttonVariants } from "@/components/ui/button";

const tabs = [
  { text: "Home", link: "/" },
  { text: "Shoot", link: "/photographer" },
  { text: "About", link: "/about" },
  { text: "FAQ", link: "/faq" }
];

const ChipTabs = () => {
  const [selected, setSelected] = useState(tabs[0].text);

  return (
    <div className="px-24  py-10 text-white glass bg-[#46332e] justify-center md:justify-between flex items-center flex-wrap gap-2 fixed z-50 w-full top-0">
      <div className="">
        <h1 className="text-[18px]">ShutterSport</h1>
      </div>
     <div className="flex gap-5">
     {tabs.map((tab) => (
        <Chip
          text={tab.text}
          link={tab.link}
          selected={selected === tab.text}
          setSelected={setSelected}
          key={tab.text}
        />
      ))}
     </div>
       <div>
          <Link to="/login">
         < Button>Login</Button>
    </Link>
      </div>
    </div>
  );
};

const Chip = ({
  text,
  link,
  selected,
  setSelected,
}) => {
  return (
    <Link to={link}>
      <button
        onClick={() => setSelected(text)}
        className={`${
          selected
            ? "text-white"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
          ></motion.span>
        )}
      </button>
    </Link>
  );
};

// Define PropTypes for Chip component
Chip.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default ChipTabs;

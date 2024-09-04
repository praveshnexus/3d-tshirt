import {motion } from "framer-motion";

import {slideAnimation} from "../config/motion";

const Footer = () => {

    return (
      <>
          <motion.footer className="text-gray-800 w-fit mx-auto pb-1" {...slideAnimation('up')}>
              created with <span className="text-red-600">❤️</span> by <a href="https://davegizmo.vercel.app" target="_blank" className="underline">davegizmo</a>
          </motion.footer>
      </>
    )
  }
  
  export default Footer
import "../style.css";
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useContext } from "react";                   
import { AuthContext } from "../context/auth.context"; 


const links =   [
  { name: "Home", to: "/", id: 1 ,displayNotLogged: "y"},
  { name: "Log In ", to: "/LogIn", id: 2 ,displayNotLogged: "n"},
  { name: "Sign Up", to: "/SignUp", id: 3 ,displayNotLogged: "n"},
  { name: "Create a Post", to: "/CreatePost", id: 4 ,displayNotLogged: "y"},
  { name: "My profile", to: "/Profile", id: 5, displayNotLogged: "y"},
];
const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};
export default function NavBar() {
const { isLoggedIn, logoutUser  } = useContext(AuthContext); 
    const [open, cycleOpen] = useCycle(false, true);
  return (
    <main className="navbar">
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 300
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 }
            }}
          >
            <motion.div
              className="container-navbar"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {links
                .filter(link => {
                if(isLoggedIn === true){return link.displayNotLogged.includes("y")}
                else{return link}
              })
                .map(({ name, to, id }) => (
                <motion.a
                  key={id}
                  href={to}
                  whileHover={{ scale: 1.05 }}
                  variants={itemVariants}
                >
                  {name}
                </motion.a>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="btn-container">
        <button onClick={cycleOpen}>{open ? "<" : ">"}</button>
      </div>
    </main>
  );
}
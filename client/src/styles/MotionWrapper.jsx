import styled from "styled-components";
import { motion } from "framer-motion";

const MotionArticle = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  opacity: 0; /* Start hidden */
`;

const MotionWrapper = ({ index, children }) => {
  return (
    <MotionArticle
      initial={{ opacity: 0, y: 20 }} // Starts slightly lower and transparent
      animate={{ opacity: 1, y: 0 }} // Moves up and fades in
      transition={{ delay: index * 0.2, duration: 0.5 }} // Stagger effect
    >
      {children}
    </MotionArticle>
  );
};

export default MotionWrapper;
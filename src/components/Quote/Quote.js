import React from 'react';
import { motion } from 'framer-motion';
import './Quote.css';

const Quote = () => (
  <motion.section
    className="quote-wrap"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false }}
  >
    <div className="quote-box">
      <p className="quote-text">“There is always one more bug.”</p>
      <p className="quote-author">— Lubarsky's Law of Cybernetic Entomology</p>
    </div>
  </motion.section>
);

export default Quote;

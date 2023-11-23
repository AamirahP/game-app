import React, { useState } from "react";
interface Props {
  children: string;
  maxChars?: number;
}

const Expandable = ({ children, maxChars = 50 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (children.length >= maxChars) {
    return (
      <p>
        {isExpanded ? children : children.substring(0, maxChars)}...
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Less" : "More"}
        </button>
      </p>
    );
  }
};

export default Expandable;

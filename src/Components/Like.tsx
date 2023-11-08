import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }, Props) => {
  const [like, setLike] = useState(true);

  const toggle = () => {
    setLike(!like);
  };

  if (like) return <AiFillHeart color="red" size={50} onClick={toggle} />;
  return <AiOutlineHeart size={50} onClick={toggle} />;
};

export default Like;

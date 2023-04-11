import { Link, useLocation } from "react-router-dom";

const ActiveLink = ({ path, name, className, onClick }) => {
  const location = useLocation();
  const activeColor = "#65fcdb";
  const style = {
    color: location.pathname === path && activeColor,
    fontWeight: location.pathname === path && 600,
  };

  return (
    <Link onClick={onClick} style={style} to={path} className={className}>
      {name}
    </Link>
  );
};

export default ActiveLink;

import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  FolderKanban,
  Briefcase,
  Send
} from "lucide-react";
import "./BottomDock.css";

const BottomDock = () => {
  return (
    <nav className="dock-root">
      <NavLink to="/" end className="dock-item">
        <Home className="dock-icon" />
      </NavLink>

      <NavLink to="/aboutme" className="dock-item">
        <User className="dock-icon" />
      </NavLink>

      <NavLink to="/projects" className="dock-item">
        <FolderKanban className="dock-icon" />
      </NavLink>

      <NavLink to="/experience" className="dock-item">
        <Briefcase className="dock-icon" />
      </NavLink>

      <NavLink to="/contact" className="dock-item">
        <Send className="dock-icon" />
      </NavLink>
    </nav>
  );
};

export default BottomDock;

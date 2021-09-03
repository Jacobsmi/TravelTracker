import "./Landing.css";
import logo from "../../GlobeLogo.svg";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="Landing">
      <nav className="Landing_Nav">
        <img src={logo} alt="Logo" className="Landing_Nav_Logo" />
        <div className="Landing_Nav_Links">
          <Link to="/login" className="Landing_Nav_Link"> Login</Link>
          <Link to="/signup" className="Landing_Nav_Link">Sign Up</Link>
        </div>
      </nav>
      <main className="Landing_Main">
        <div className="Landing_Main_Header">
          Travel Tracker is the easy way to track all your dream vacation destinations.
        </div>
        <Link to="/signup" className="Landing_Main_Button">
          Get Started
        </Link>
      </main>

    </div>
  )
}
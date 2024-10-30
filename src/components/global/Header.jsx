import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container mx-auto">
      <Link to="/"><img src="../public/logo.png" alt="" className="w-[7rem]"/></Link>
        <div className="flex between"></div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

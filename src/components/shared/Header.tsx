import { NavLink } from "react-router-dom";
import { routerLinks } from "../../router/Router";
import logo from "/assets/favicon-32x32.png";

export const Header = () => {
  return (
    <header className="flex justify-between max-w-screen-xl mx-auto p-2 items-center">
      <div className="flex items-end">
        <img src={logo} alt="logo" />
        <h3 className="text-2xl font-semibold">arijus Techin</h3>
      </div>
      <div className="flex gap-2">
        {routerLinks.map((link) => (
          <div key={link.title}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "bg-slate-400" : ""} rounded-lg py-1 px-2 border`
              }
              to={link.href}
            >
              {link.title}
            </NavLink>
          </div>
        ))}
      </div>
    </header>
  );
};

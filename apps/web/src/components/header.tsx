import { NavLink } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const links = [{ to: "/", label: "Polygon Treasury Wallet" }] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? "font-bold" : "")}
                end
              >
                {label}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ConnectButton />
        </div>
      </div>
      <hr />
    </div>
  );
}

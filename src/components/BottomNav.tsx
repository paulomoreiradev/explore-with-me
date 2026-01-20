import { useState, useEffect } from "react";
import { Home, Compass, Calendar, User, CalendarDays, Bell } from "lucide-react";
import { NavLink } from "@/components/NavLink";

interface CurrentUser {
  email: string;
  name: string;
  type: "traveler" | "guide" | "entrepreneur";
}

const BottomNav = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const isGuide = currentUser?.type === "guide";

  // Nav items for travelers
  const travelerNavItems = [
    { icon: Home, label: "Início", path: "/dashboard" },
    { icon: Compass, label: "Explorar", path: "/explore" },
    { icon: Bell, label: "Alertas", path: "/notifications", badge: 3 },
    { icon: Calendar, label: "Roteiro", path: "/itinerary" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  // Nav items for guides
  const guideNavItems = [
    { icon: Home, label: "Início", path: "/guide-dashboard" },
    { icon: Compass, label: "Explorar", path: "/explore" },
    { icon: Bell, label: "Alertas", path: "/notifications", badge: 5 },
    { icon: CalendarDays, label: "Agenda", path: "/guide-schedule" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  const navItems = isGuide ? guideNavItems : travelerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-smooth"
            activeClassName="text-primary"
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {"badge" in item && item.badge && (
                <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-medium text-destructive-foreground">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;

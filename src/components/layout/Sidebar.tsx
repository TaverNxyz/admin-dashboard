import { Home, BarChart3, FileText, Mail, ClipboardList, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Sales", href: "/sales" },
  { icon: FileText, label: "Invoicing", href: "/invoicing" },
  { icon: Mail, label: "Email", href: "/email" },
  { icon: ClipboardList, label: "Surveys", href: "/surveys" },
  { icon: Package, label: "Orders", href: "/orders" },
];

export const Sidebar = ({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-black/50 backdrop-blur-xl border-r border-gray-800",
        "transition-all duration-300 z-50",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <img 
            src="/lovable-uploads/4a0b7229-c6d6-4c70-81c7-f3b656a33bdb.png"
            alt="AlgoTech Builds"
            className="h-32 w-auto mx-auto animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] hover:animate-none transition-all duration-300"
          />
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg",
                    "text-gray-300 hover:text-white hover:bg-white/10",
                    "transition-all duration-200",
                    "group relative"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {isOpen && <span className="animate-pulse-slow">{item.label}</span>}
                  {!isOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
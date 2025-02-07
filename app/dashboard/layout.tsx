'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3, Boxes, LayoutDashboard, LogOut, MapPin, Settings, Truck, Users, Loader2, ChevronDown, ChevronRight, Plus, List, Bomb, Fuel, Leaf, Bot, Menu } from 'lucide-react';
import { signOut } from 'next-auth/react';

import 'leaflet/dist/leaflet.css';

const menuItems = [
  {
    name: 'dashboard',
    icon: LayoutDashboard,
    label: 'Панель управления',
    href: '/dashboard',
  },
  { name: 'map', icon: MapPin, label: 'Карта', href: '/dashboard/map' },
  {
    name: 'vehicles',
    icon: Truck,
    label: 'Транспорт',
    href: '/dashboard/vehicles',
  },
  {
    name: 'incidents',
    icon: Bomb,
    label: 'Инциденты',
    href: '/dashboard/incidents',
  },
  {
    name: 'analytics',
    icon: BarChart3,
    label: 'Аналитика',
    href: '/dashboard/analytics',
    subItems: [
      {
        name: 'fuel',
        icon: Fuel,
        label: 'Топливо',
        href: '/dashboard/analytics/fuel',
      },
      {
        name: 'co2',
        icon: Leaf,
        label: 'Экология',
        href: '/dashboard/analytics/co2',
      },
    ],
  },
  {
    name: 'users',
    icon: Users,
    label: 'Водители',
    href: '/dashboard/users',
  },
  {
    name: 'settings',
    icon: Settings,
    label: 'Настройки',
    href: '/dashboard/settings',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      switch (session.user.role) {
        case 'ADMIN':
          router.replace('/admin/dashboard');
          break;
        case 'MANAGER':
          router.replace('/manager/dashboard');
          break;
        case 'USER':
          break
        case 'DRIVER':
          break
        default:
          console.error('Unknown user role:', session.user.role);
      }
    } else if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, session, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="mt-4 text-lg">Загрузка...</p>
      </div>
    );
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'USER') {
    return null;
  }

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} md:w-64 border-r bg-muted/40 transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center space-x-2">
              <Truck className="h-6 w-6" />
              <span className="font-bold">3GIS</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                        {openSubmenu === item.name ? (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Button>
                      {openSubmenu === item.name && (
                        <div className="ml-4 mt-1 grid gap-1">
                          {item.subItems.map((subItem) => (
                            <Link key={subItem.name} href={subItem.href}>
                              <Button
                                variant={
                                  pathname === subItem.href
                                    ? 'secondary'
                                    : 'ghost'
                                }
                                className="w-full justify-start"
                              >
                                <subItem.icon className="mr-2 h-4 w-4" />
                                {subItem.label}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href}>
                      <Button
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="flex h-14 items-center border-b px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">
            {menuItems.find((item) => item.href === pathname)?.label ||
              menuItems.find((item) =>
                item.subItems?.some((subItem) => subItem.href === pathname)
              )?.label ||
              'Панель управления'}
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}


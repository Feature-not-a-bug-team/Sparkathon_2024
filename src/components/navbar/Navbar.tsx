'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react';
export type menuItem = {
  slug: string;
  path: string;
};
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: menuItem[] = [
    { slug: 'Invoice', path: '/invoices' },
    { slug: 'Inventory', path: '/products' },
    { slug: 'Frequently Bought Together', path: '/frequentlyBoughtTogether' },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="mb-10">
      <NavbarContent className="sm:hidden " justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="text-4xl  font-bold text-inherit">Retail Sync</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <p className="text-4xl font-bold text-inherit">Retail Sync</p>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.slug}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.slug}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.slug}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

import { UserData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ThemeSwitcher } from 'components/theme-switcher';
import { IconBrandLaravel } from 'justd-icons';
import React from 'react';
import { buttonStyles, Navbar, Separator } from 'ui';

const navigations = [
  {
    name: 'Home',
    textValue: 'Home',
    href: '/'
  }
];

export function AppNavbar({ children, ...props }: React.ComponentProps<typeof Navbar>) {
  const page = usePage();
  const { user } = usePage<UserData>().props;
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => setIsOpen(false), [page.url]);

  return (
    <Navbar isOpen={isOpen} onOpenChange={setIsOpen} {...props}>
      <Navbar.Nav>
        <Navbar.Logo aria-label="Logo">
          <IconBrandLaravel className="size-6" />
        </Navbar.Logo>
        <Navbar.Section>
          {navigations.map((item) => (
            <Navbar.Item isCurrent={item.href === page.url} key={item.href} href={item.href}>
              {item.name}
            </Navbar.Item>
          ))}
        </Navbar.Section>
        <Navbar.Section className="hidden ml-auto gap-x-1 lg:flex">
          <ThemeSwitcher />
          <LoginButton />
        </Navbar.Section>
      </Navbar.Nav>

      <Navbar.Compact>
        <Navbar.Flex>
          <Navbar.Trigger />
          <Separator className="h-6" orientation="vertical" />
          <Navbar.Logo aria-label="Logo">
            <IconBrandLaravel />
          </Navbar.Logo>
        </Navbar.Flex>
        <Navbar.Flex className="gap-x-1">
          <ThemeSwitcher />
          <LoginButton />
        </Navbar.Flex>
      </Navbar.Compact>

      {children}
    </Navbar>
  );
}

function LoginButton() {
  return (
    <Link href={route('login')} className={buttonStyles({ appearance: 'outline', size: 'small' })}>
      Login
    </Link>
  );
}

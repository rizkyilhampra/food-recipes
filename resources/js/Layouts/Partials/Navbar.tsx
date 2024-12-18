import { useTheme } from '@/components/theme-provider';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ThemeSwitcher } from 'components/theme-switcher';
import { IconBrandLaravel } from 'justd-icons';
import React from 'react';
import { Selection } from 'react-aria-components';
import { Avatar, buttonStyles, Menu, Navbar, Separator } from 'ui';

const navigations = [
  {
    name: 'Home',
    textValue: 'Home',
    href: '/'
  },
  {
    name: 'Categories',
    textValue: 'Categories',
    href: '/categories'
  },
  {
    name: 'Ingredients',
    textValue: 'Ingredients',
    href: '/ingredients'
  }
];

export function AppNavbar({ children, ...props }: React.ComponentProps<typeof Navbar>) {
  const page = usePage();
  const { user } = usePage<PageProps>().props.auth;
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
        <Navbar.Section className="ml-auto hidden gap-x-1 lg:flex">
          {!user && <ThemeSwitcher />}
          {user ? <UserMenu /> : <LoginButton />}
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
          {!user && <ThemeSwitcher />}
          {user ? <UserMenu /> : <LoginButton />}
        </Navbar.Flex>
      </Navbar.Compact>

      {children}
    </Navbar>
  );
}

function LoginButton() {
  return (
    <Link
      prefetch
      href={route('login')}
      className={buttonStyles({ appearance: 'outline', size: 'small' })}
    >
      Login
    </Link>
  );
}

function UserMenu() {
  const { user } = usePage<PageProps>().props.auth;
  const { theme, setTheme } = useTheme();
  const currentTheme = theme || 'system';
  const [selectedTheme, setSelectedTheme] = React.useState<Selection>(new Set([currentTheme]));
  return (
    <Menu>
      <Menu.Trigger aria-label="Open menu">
        <Avatar status="online" size="medium" src={user.avatar} className="size-8" />
      </Menu.Trigger>
      <Menu.Content showArrow placement="bottom end" className="sm:min-w-56">
        <Menu.Section>
          <Menu.Header separator className="relative">
            <div>{user.name}</div>
            <div className="truncate whitespace-nowrap pr-6 text-sm font-normal text-muted-fg">
              {user.email}
            </div>
          </Menu.Header>
        </Menu.Section>
        <Menu.Submenu>
          <Menu.Item>Preferences</Menu.Item>
          <Menu.Content
            selectionMode="single"
            selectedKeys={selectedTheme}
            onSelectionChange={(keys) => {
              if (keys !== 'all') {
                setSelectedTheme(keys);
                setTheme(keys.has('system') ? 'system' : keys.has('dark') ? 'dark' : 'light');
              } else {
                setSelectedTheme(new Set(['system']));
                setTheme('system');
              }
            }}
            items={[
              { name: 'Light', value: 'light' },
              { name: 'Dark', value: 'dark' },
              { name: 'System', value: 'system' }
            ]}
          >
            {(item) => (
              <Menu.Checkbox id={item.value} textValue={item.name}>
                {item.name}
              </Menu.Checkbox>
            )}
          </Menu.Content>
        </Menu.Submenu>
        <Menu.Item routerOptions={{ method: 'delete' }} href={route('logout')}>
          <span>Logout</span>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

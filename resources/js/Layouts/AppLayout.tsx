import { Footer } from '@/components/footer';
import { AppNavbar } from '@/Layouts/Partials/Navbar';
import { PropsWithChildren } from 'react';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <AppNavbar>{children}</AppNavbar>
      <Footer />
    </div>
  );
}

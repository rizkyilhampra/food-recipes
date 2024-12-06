import { Head } from '@inertiajs/react';
import { IconBrandGoogle } from 'justd-icons';
import { GuestLayout } from 'layouts';
import React from 'react';
import { buttonStyles } from 'ui';

interface LoginProps {
  status: string;
}

export default function Login(args: LoginProps) {
  const { status } = args;

  return (
    <>
      <Head title="Log in" />
      {status && (
        <div className="mb-4 text-sm font-medium text-red-600 dark:text-red-400">{status}</div>
      )}
      <a
        href={route('login.google')}
        target="_self"
        className={buttonStyles({ intent: 'primary', className: 'w-full flex justify-center' })}
      >
        <IconBrandGoogle />
        <span>Continue with Google</span>
      </a>
    </>
  );
}

Login.layout = (page: React.ReactNode) => {
  return <GuestLayout header="Login" description="Log in to your account." children={page} />;
};

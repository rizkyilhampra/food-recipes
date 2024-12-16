import clsx from 'clsx';
import { IconChevronLgLeft } from 'justd-icons';
import { Link } from './ui';

const LinkBack = ({ className, ...props }: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      className={clsx(
        'mb-2 inline-flex items-center justify-center gap-x-2 px-5 py-2.5 text-dodger-blue-500 underline transition-colors hover:text-dodger-blue-700 focus:text-dodger-blue-700',
        className
      )}
      {...props}
    >
      <IconChevronLgLeft />
      Back
    </Link>
  );
};

export default LinkBack;

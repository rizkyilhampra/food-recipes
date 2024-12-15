import { PageProps } from '@/types/index';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toast } from 'ui';

export function FlashMessage() {
  const { flash_message } = usePage<{
    flash_message: PageProps['flashMessage'];
  }>().props;

  useEffect(() => {
    if (flash_message && flash_message.message) {
      showToast(flash_message);
    }
  }, [flash_message]);

  return <Toast />;
}

const showToast = (flashMessage: PageProps['flashMessage']) => {
  switch (flashMessage.type) {
    case 'success':
      toast.success(flashMessage.message);
      break;
    case 'error':
      toast.error(flashMessage.message);
      break;
    case 'info':
      toast.info(flashMessage.message);
      break;
    case 'warning':
      toast.warning(flashMessage.message);
      break;
    default:
      toast(flashMessage.message);
  }
};

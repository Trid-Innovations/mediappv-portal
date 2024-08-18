import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import AuthenicatedLayout from '@/components/core/layout';
import { Notifications } from '@/components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';

export const metadata = { title: `Settings | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <AuthenicatedLayout>
      <Stack spacing={3}>
        <Notifications />
        <UpdatePasswordForm />
      </Stack>
    </AuthenicatedLayout>
  );
}

import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import AuthenicatedLayout from '@/components/core/layout';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';

export const metadata = { title: `Account | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <AuthenicatedLayout>
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid lg={4} md={6} xs={12}>
            <AccountInfo />
          </Grid>
          <Grid lg={8} md={6} xs={12}>
            <AccountDetailsForm />
          </Grid>
        </Grid>
      </Stack>
    </AuthenicatedLayout>
  );
}

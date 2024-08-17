import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

import { config } from '@/config';
import { CreditCard } from '@/components/dashboard/overview/credit-card';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <CreditCard
          sx={{ height: '100%' }}
          value="2k"
          title="Credit Available"
          iconColor='var(--mui-palette-primary-main)'
          icon={<ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CreditCard
          sx={{ height: '100%' }}
          value="1.6k"
          title="All Credit Used"
          iconColor='var(--mui-palette-warning-main)'
          icon={<CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CreditCard
          sx={{ height: '100%' }}
          value="1.6k"
          title="Article Read"
          iconColor='var(--mui-palette-success-main)'
          icon={<ReceiptIcon fontSize="var(--icon-fontSize-lg)" />} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CreditCard
          sx={{ height: '100%' }}
          value="1.6k"
          title="Credit Bought"
          iconColor='var(--mui-palette-warning-main)'
          icon={<CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />}
        />
      </Grid>
    </Grid>
  );
}

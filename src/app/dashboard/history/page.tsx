import * as React from 'react';
import type { Metadata } from 'next'; 
import Stack from '@mui/material/Stack'; 
import dayjs from 'dayjs';

import { config } from '@/config';
import { HistoryFilters } from '@/components/dashboard/history/history-filters';
import { HistoryTable } from '@/components/dashboard/history/history-table';
import type { History } from '@/components/dashboard/history/history-table';

export const metadata = { title: `History | Dashboard | ${config.site.name}` } satisfies Metadata;

const history = [
  {
    id: 'USR-010',
    provider: 'Forbes magazine',
    credit: '2',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-009',
    provider: 'NY Times',
    credit: '2',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-008',
    provider: 'Washington Post',
    credit: '2',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-007',
    provider: 'The Guardian',
    credit: '1',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-006',
    provider: 'Wall Street Journal',
    credit: '2',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    provider: 'Fran Perez',
    credit: '4',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },

  {
    id: 'USR-004',
    provider: 'Business Insider',
    credit: '2',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-003',
    provider: 'Medium',
    credit: '3',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-002',
    provider: 'Reuters',
    credit: '2',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-001',
    provider: 'Subs',
    credit: '2',
    link: 'https://www.forbes.com/sites/antoinegara/2020/10/05/how-cathie-wood-beat-wall-street-by-betting-tesla-is-worth-more-than-1-trillion/',
    date: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies History[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedHistory = applyPagination(history, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      {/* <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div> 
      </Stack>*/}
      <HistoryFilters />
      <HistoryTable count={paginatedHistory.length} page={page} rows={paginatedHistory} rowsPerPage={rowsPerPage} />
    </Stack>
  );
}

function applyPagination(rows: History[], page: number, rowsPerPage: number): History[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

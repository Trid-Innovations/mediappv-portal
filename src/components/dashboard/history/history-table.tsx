'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr/Link';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

export interface History {
  id: string;
  credit: string;
  provider: string;
  link: string;
  date: Date;
}

interface HistoryTableProps {
  count?: number;
  page?: number;
  rows?: History[];
  rowsPerPage?: number;
}

export function HistoryTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: HistoryTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((history) => history.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Credits Used</TableCell>
              <TableCell>Read Date</TableCell>
              <TableCell>Article Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>{row.credit}</TableCell>
                  <TableCell>{dayjs(row.date).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="warning"
                      component={RouterLink}
                      href={row.link}
                      startIcon={<LinkIcon fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                    >
                      Go to Article
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

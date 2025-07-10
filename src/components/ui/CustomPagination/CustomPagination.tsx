import { Pagination } from '@mui/material';

type CustomPaginationProps = {
  totalPages: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

function CustomPagination({
  totalPages,
  page,
  onChange,
}: CustomPaginationProps) {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={onChange}
      siblingCount={1}
      boundaryCount={1}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        '& .MuiPagination-ul': {
          gap: '0.5rem',
          backgroundColor: 'var(--color-black)',
          borderRadius: '15px',
        },
        '& .MuiPaginationItem-root': {
          color: 'var(--color-white) !important',
          fontWeight: 400,
        },
        '& .Mui-selected': {
          color: 'var(--color-white)',
          fontWeight: 700,
          backgroundColor: 'var(--color-black)',
          '&:hover': {
            backgroundColor: 'var(--color-black)',
          },
        },
      }}
    />
  );
}

export default CustomPagination;

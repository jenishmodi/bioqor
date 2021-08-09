import { Button, Pagination, Table as BsTable } from 'react-bootstrap';
import { usePagination, useTable } from 'react-table';

import './Table.scss';

const Table = ({
  rowData,
  columns,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data: rowData,
    },
    usePagination
  );

  return (
    <div className="custom-table">
      <BsTable striped bordered responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th />
              <th />
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onEdit(row.original)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(row.original._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </BsTable>
      <Pagination className="justify-content-end">
        <Pagination.Prev onClick={previousPage} disabled={!canPreviousPage} />
        {/* {pages} */}
        <Pagination.Next onClick={nextPage} disabled={!canNextPage} />
      </Pagination>
    </div>
  );
};

export default Table;

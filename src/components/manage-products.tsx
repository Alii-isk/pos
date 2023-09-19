import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User as Product,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "./icons/PlusIcon";
import { VerticalDotsIcon } from "./icons/VerticalDotsIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { columns, products } from "./data";
import { capitalize } from "./utils";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

type Product = (typeof products)[0];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([])
  );

  const [selectedQuantity, setSelectedQuantity] = React.useState([
  ]);
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Product, b: Product) => {
      const first = a[sortDescriptor.column as keyof Product] as number;
      const second = b[sortDescriptor.column as keyof Product] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (product: Product, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof Product];
      switch (columnKey) {
        case "name":
          return (
            <Product
              avatarProps={{ radius: "lg", src: product.avatar }}
              description={product.email}
              name={cellValue}
            >
              {product.email}
            </Product>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {product.team}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          // // if id is in selectedKeys, then return x1 else x0
          // if (selectedKeys.has(product.id.toString())) {
          //   // get the quantity of the product
          //   const quantity = selectedQuantity.find(
          //     (item) => item.id === product.id
          //   )?.quantity;
          //   return `${quantity} qty - ${cellValue}`;
          // } else {
          //   return `0 qty - ${cellValue}`;
          // }
          return 22;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {products.length} products
          </span>
          {/* <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="15">100</option>
              <option value="10">10</option>
            </select>
          </label> */}
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    products.length,
    hasSearchFilter,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      color={"success"}
      // bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "w-full",
      }}
      selectedKeys={selectedKeys}
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={(keys) => {
        // const unselectedKeys = new Array(...keys);
        // if (unselectedKeys.length == 1) {
        //   setSelectedKeys((x) => new Set([...x, unselectedKeys[0] as string]));
        //   const idd = parseInt(unselectedKeys[0] as string);
        //   console.log("adding id : ", idd);
        //   setSelectedQuantity((x) => [...x, { id: idd, quantity: 1 }]);
        //   console.log({ selectedQuantity });
        //   return;
        // }
        // const selectedKey = new Array(...selectedKeys).find(
        //   (key) => !unselectedKeys.includes(key)
        // );
        // console.log({ selectedKey });

        // const quantity = selectedQuantity.find((item) => item.id === parseInt(id))
        // ?.quantity;
        // console.log({id,quantity});
      }}
      onSortChange={setSortDescriptor}
      onRowAction={(key) => {
        console.log(`Opening item ${key}...`);
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              return <TableCell>{renderCell(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

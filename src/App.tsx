import React, { useEffect } from "react";

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
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { columns, products } from "./components/data";
import { SearchIcon } from "./components/icons/SearchIcon";
import { PlusIcon } from "./components/icons/PlusIcon";
import { VerticalDotsIcon } from "./components/icons/VerticalDotsIcon";
import { useCartStore } from "./store/ui";
import useShiftHolded from "./hooks/useShiftHolded";

const INITIAL_VISIBLE_COLUMNS = ["name", "quantity", "price", "actions"];

type Product = (typeof products)[0];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const inCartProducts = useCartStore((x) => x.products);
  const addToCart = useCartStore((x) => x.addProduct);
  const removeFromCart = useCartStore((x) => x.removeProduct);
  const incrementProductQuantity = useCartStore(
    (x) => x.increaseProductQuantity
  );
  const decrementProductQuantity = useCartStore(
    (x) => x.decreaseProductQuantity
  );
  const isShiftHolded = useShiftHolded();

  const [visibleColumns, _] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, __] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(500);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  useEffect(() => {
    const noContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", noContextMenu);
    return () => {
      window.removeEventListener("contextmenu", noContextMenu);
    };
  }, []);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue, statusFilter]);

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
              avatarProps={{ radius: "lg", src: product.photo }}
              //   description={product.email}
              name={cellValue}
            >
              {product.name}
            </Product>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">22.3</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                dirham
              </p>
            </div>
          );
        case "quantity":
          //get the quantity of the product in the cart
          const quantity =
            inCartProducts.find(
              (x) => x.id.toString() === product.id.toString()
            )?.quantity || 0;
          return (
            <div className="flex gap-1 items-center">
              <Button
                onClick={() => decrementProductQuantity(product)}
                isIconOnly
                size="sm"
                variant="light"
              >
                <PlusIcon className="text-default-300" />
              </Button>
              <Chip
                className="capitalize"
                color={"default"}
                size="sm"
                variant="flat"
              >
                x {quantity}
              </Chip>
              <Button  onClick={() => incrementProductQuantity(product)} isIconOnly size="sm" variant="light">
                <PlusIcon className="text-default-300" />
              </Button>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [inCartProducts.length]
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
              {inCartProducts.length} Products
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {products.length} products
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    products.length,
    hasSearchFilter,
    inCartProducts,
  ]);

  return (
    <div className="flex flex-col gap-3 w-screen h-screen max-w-4xl mx-auto relative">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        onRowAction={(item) => {
          const product = products.find(
            (product) => product.id.toString() === item.toString()
          );
          if (product) {
            if (isShiftHolded) {
              //remove from cart
              removeFromCart(product.id);
              return;
            }
            addToCart(product);
          }
        }}
      >
        <TableHeader columns={headerColumns}>
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
        <TableBody emptyContent={"No products found"} items={sortedItems}>
          {items.map((item) => {
            const isInCart =
              inCartProducts.find(
                (x) => x.id.toString() === item.id.toString()
              ) !== undefined;
            return (
              <TableRow
                // className="cursor-pointer  active:outline-none active:bg-gray-100"
                // if incart has the product then add the class

                className={`cursor-pointer ${
                  isInCart ? "hover:bg-gray-200" : "hover:bg-gray-200"
                } ${isInCart ? "bg-gray-100" : ""}`}
                key={item.id}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          })}

          {/* {(item) => (
            <TableRow
              // className="cursor-pointer  active:outline-none active:bg-gray-100"

              className="cursor-pointer  hover:bg-gray-50"
              key={item.id}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )} */}
        </TableBody>
      </Table>
    </div>
  );
}

import { useUIStore } from "./store/ui";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  User,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { Key, useCallback, useState } from "react";
import { VerticalDotsIcon } from "./components/icons/VerticalDotsIcon";
import { EditIcon } from "./components/icons/EditIcon";
import { DeleteIcon } from "./components/icons/DeleteIcon";

const App: React.FC = () => {
  const [selectionBehavior, setSelectionBehavior] = useState("toggle");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [cart, setCart] = useState([
    {
      key: "1",
      quantity: 2,
    },
  ]);
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      price: "12.33",
      quantity: 0,
    },
    {
      key: "2",
      name: "Laurie Borer",
      price: "12.33",
      quantity: 0,
    },
    {
      key: "3",
      name: "Laurie Borer",
      price: "2.33",
      quantity: 0,
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "price",
      label: "PRICE",
    },
    {
      key: "quantity",
      label: "QUANTITY",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const renderCell = useCallback((item: any, columnKey: Key) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.avatar }}
            description={item.email}
            name={cellValue}
          >
            {item.email}
          </User>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              dirham
            </p>
          </div>
        );
      case "quantity":
        const cartItem = cart.find((i) => i.key === item.key);
        return (
          <Chip
            className="capitalize"
            color={"primary"}
            size="sm"
            variant="flat"
          >
            x {cartItem === undefined ? 0 : cartItem.quantity}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user" color="secondary">
              <span className="text-lg  text-secondary cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 w-screen h-screen max-w-4xl mx-auto">
      <Table
        aria-label="Rows actions table example with dynamic content"
        // selectionMode="multiple"
        // selectionBehavior={"toggle"}
        // showSelectionCheckboxes={false}
        onRowAction={(key) => {
          console.log("onRowAction", key);
          setCart((x) => {
            const item = x.find((i) => i.key === key);
            if (item) {
              item.quantity += 1;
            } else {
              x.push({ key: key.toString(), quantity: 1 });
            }
            return [...x];
          });
          if (selectedKeys.includes(key.toString())) {
            // setSelectedKeys(selectedKeys.filter((k) => k !== key));
            console.log("already selected");
          } else {
            setSelectedKeys((x) => [...x, key.toString()]);
          }
          //increace quantity
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow 
            // className="bg-success-100  text-success-600"
            
            key={item.key}>
              {(columnKey) => (
                <TableCell
                >{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;

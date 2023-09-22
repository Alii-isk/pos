import {
  Button,
  Chip, Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  User,
  useDisclosure
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@nextui-org/react";
import { Key, useCallback, useState } from "react";
import { EditIcon } from "./components/icons/EditIcon";
import { DeleteIcon } from "./components/icons/DeleteIcon";
import { SearchIcon } from "./components/icons/SearchIcon";

const App: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
    },
    {
      key: "2",
      name: "Laurie Borer",
      price: "12.33",
      quantity: 0,
      pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
    },
    {
      key: "3",
      name: "Laurie Borer",
      price: "2.33",
      quantity: 0,
      pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
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
            avatarProps={{ radius: "lg", src: item.pic }}
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
          <div className="flex gap-2 justify-center items-center">
            <Chip
              className="capitalize"
              color={"primary"}
              size="sm"
              variant="flat"
            >
              x {cartItem === undefined ? 0 : cartItem.quantity}
            </Chip>
            <Tooltip content="reset" color="danger">
              <span className="text-lg  text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user" color="secondary">
              <span className="text-lg  text-secondary cursor-pointer active:opacity-50">
                <Button
                  isIconOnly
                  color="secondary"
                  onPress={onOpen}
                  aria-label="Like"
                >
                  <EditIcon />
                </Button>
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
        color="primary"
        // selectedKeys={['1']}
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
            <TableRow className="hover:bg-success-100" key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal 
      placement="center"
      isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
             <div className="flex flex-col
              gap-4">
             <div className="flex gap-2 items-center">
                  <Button isIconOnly color="danger" aria-label="Like">
                    <DeleteIcon />
                  </Button>
                  <Input
                  readOnly
                    placeholder="0.00"
                    className="max-w-[70px]"
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">د.م </span>
                      </div>
                    }
                  />
                  <Button
                    isIconOnly
                    color="warning"
                    variant="faded"
                    aria-label="Take a photo"
                  >
                    <SearchIcon />
                  </Button>
                  <h1 className="ml-auto">الكمية</h1>
                </div>
                <div className="flex gap-2 items-center">
                
                  <Input
                  readOnly
                    placeholder="0.00"
                    className="max-w-[170px]"
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">د.م </span>
                      </div>
                    }
                  />
                 
                  <h1 className="ml-auto">الثمن</h1>
                </div>
             </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default App;

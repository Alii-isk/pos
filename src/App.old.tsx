// import {
//   Button,
//   Chip,
//   Input,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   SortDescriptor,
//   Tooltip,
//   User,
//   useDisclosure,
// } from "@nextui-org/react";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@nextui-org/react";
// import { Key, useCallback, useMemo, useState } from "react";
// import { EditIcon } from "./components/icons/EditIcon";
// import { DeleteIcon } from "./components/icons/DeleteIcon";
// import { SearchIcon } from "./components/icons/SearchIcon";
// import Products from "./products";
// import { PlusIcon } from "./components/icons/PlusIcon";

// const App: FC = () => {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   const [cart, setCart] = useState<
//     {
//       key: string;
//       quantity: number;
//     }[]
//   >([]);

//   const [filterValue, setFilterValue] = useState("");
//   const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
//   const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
//   const [statusFilter, setStatusFilter] = useState<Selection>("all");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
//     column: "age",
//     direction: "ascending",
//   });

//   const [page, setPage] = useState(1);

//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = useMemo(() => {
//     if (visibleColumns === "all") return columns;

//     return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
//   }, [visibleColumns]);

//   const filteredItems = useMemo(() => {
//     let filteredUsers = [...users];

//     if (hasSearchFilter) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.name.toLowerCase().includes(filterValue.toLowerCase()),
//       );
//     }
//     if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
//       filteredUsers = filteredUsers.filter((user) =>
//         Array.from(statusFilter).includes(user.status),
//       );
//     }

//     return filteredUsers;
//   }, [users, filterValue, statusFilter]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage);

//   const items = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

 

//   const rows = [
//     {
//       key: "1",
//       name: "Tony Reichert",
//       price: "12.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "2",
//       name: "Laurie Borer",
//       price: "12.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "3",
//       name: "Laurie Borer",
//       price: "2.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "4",
//       name: "Laurie Borer",
//       price: "2.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "5",
//       name: "Laurie Borer",
//       price: "2.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "6",
//       name: "Laurie Borer",
//       price: "2.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "7",
//       name: "Laurie Borer",
//       price: "2.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "8",
//       name: "Laurie Borer",
//       price: "2.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//     {
//       key: "9",
//       name: "Laurie Borer",
//       price: "2.33",
//       quantity: 0,
//       pic: "https://cdn.bic.com/media/catalog/product/cache/f794010ace31b648ca7ce8cbac4f31be/g/s/gsmg144e-a-blk_grouping.jpg",
//     },
//   ];

//   const columns = [
//     {
//       key: "name",
//       label: "NAME",
//     },
//     {
//       key: "price",
//       label: "PRICE",
//     },
//     {
//       key: "quantity",
//       label: "QUANTITY",
//     },
//     {
//       key: "actions",
//       label: "ACTIONS",
//     },
//   ];

//   const renderCell = useCallback(
//     (item: any, columnKey: Key) => {
//       const cellValue = item[columnKey];

//       switch (columnKey) {
//         case "name":
//           return (
//             <User
//               avatarProps={{ radius: "lg", src: item.pic }}
//               description={item.email}
//               name={cellValue}
//             >
//               {item.email}
//             </User>
//           );
//         case "price":
//           return (
//             <div className="flex flex-col">
//               <p className="text-bold text-small capitalize">{cellValue}</p>
//               <p className="text-bold text-tiny capitalize text-default-400">
//                 dirham
//               </p>
//             </div>
//           );
//         case "quantity":
//           const cartItem = cart.find((i) => i.key === item.key);
//           return (
//             <div className="relative flex items-center">
//               <Chip
//                 className="capitalize"
//                 color={"primary"}
//                 size="sm"
//                 variant="flat"
//               >
//                 x {cartItem === undefined ? 0 : cartItem.quantity}
//               </Chip>
//             </div>
//           );
//         case "actions":
//           return (
//             <div className="relative flex items-center gap-2">
//               <Tooltip content="Edit user" color="secondary">
//                 <span className="text-lg  text-secondary cursor-pointer active:opacity-50">
//                   <Button
//                     isIconOnly
//                     color="secondary"
//                     onPress={onOpen}
//                     aria-label="Like"
//                   >
//                     <EditIcon />
//                   </Button>
//                 </span>
//               </Tooltip>
//             </div>
//           );
//         default:
//           return cellValue;
//       }
//     },
//     [cart]
//   );

//   const isInCart = useCallback(
//     (key: string) => {
//       return cart.find((i) => i.key === key) !== undefined;
//     },
//     [cart]
//   );

  
 
 
//   const onSearchChange = useCallback((value?: string) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);

//   const onClear = useCallback(()=>{
//     setFilterValue("")
//     setPage(1)
//   },[])

//   const topContent = useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             className="w-full sm:max-w-[44%]"
//             placeholder="Search by name..."
//             startContent={<SearchIcon />}
//             value={filterValue}
//             onClear={() => onClear()}
//             onValueChange={onSearchChange}
//           />
        
//         </div>
     
//       </div>
//     );
//   }, [
//     filterValue,
//     statusFilter,
//     visibleColumns,
//     onSearchChange,
//     hasSearchFilter,
//   ]);

//   return (
//     <div className="flex flex-col gap-3 w-screen h-screen max-w-4xl mx-auto relative">
//       <Button
//       //sticky on bottom right
//         className="fixed z-40 bottom-5 right-6"
//       color="success" endContent={<SearchIcon />}>
//         بيع     </Button>
//       <Table
//         aria-label="Rows actions table example with dynamic content"
//         color="primary"
//         onRowAction={(key) => {
//           // check if cart has item
//           const cartItem = cart.find((i) => i.key === key);
//           if (cartItem === undefined) {
//             // add item to cart
//             setCart((x) => [
//               ...x,
//               {
//                 key: key.toString(),
//                 quantity: 1,
//               },
//             ]);
//             console.log({ cart });
//           } else {
//             // update item
//             const newCart = cart.map((i) => {
//               if (i.key === key) {
//                 return { ...i, quantity: i.quantity + 1 };
//               }
//               return i;
//             });
//             console.log({ newCart });
//             setCart(newCart);
//           }
//         }}
//         topContent={topContent}
//       >
//         <TableHeader columns={columns}>
//           {(column) => (
//             <TableColumn key={column.key}>{column.label}</TableColumn>
//           )}
//         </TableHeader>
//         <TableBody items={rows}>
//           {(item) => {
//             console.log({ isInCart: isInCart(item.key) });
//             return (
//               <TableRow
//                 // className={`${isInCart(item.key) ? "bg-success-200" : "hover:opacity-"}`}
//                 key={item.key}
//                 //if fiest child then give it a border radius
//                 className="cursor-pointer  active:outline-none active:bg-gray-100
//                 "
//               >
//                 {(columnKey) => (
//                   <TableCell>{renderCell(item, columnKey)}</TableCell>
//                 )}
//               </TableRow>
//             );
//           }}
//         </TableBody>
//       </Table>
//       <Modal
//         placement="center"
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         isDismissable={false}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Modal Title
//               </ModalHeader>
//               <ModalBody>
//                 <div
//                   className="flex flex-col
//               gap-4"
//                 >
//                   <div className="flex gap-2 items-center">
//                     <Input
//                       type="number"
//                       placeholder="0.00"
//                       labelPlacement="outside"
//                       className="max-w-[170px]"
//                       startContent={
//                         <div className="pointer-events-none flex items-center">
//                           <span className="text-default-400 text-small">x</span>
//                         </div>
//                       }
//                     />

//                     <h1 className="ml-auto">الكمية</h1>
//                   </div>
//                   <div className="flex gap-2 items-center">
//                     <Input
//                       readOnly
//                       placeholder="0.00"
//                       className="max-w-[170px]"
//                       labelPlacement="outside"
//                       endContent={
//                         <div className="pointer-events-none flex items-center">
//                           <span className="text-default-400 text-small">
//                             د.م{" "}
//                           </span>
//                         </div>
//                       }
//                     />

//                     <h1 className="ml-auto">الثمن</h1>
//                   </div>
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default App;

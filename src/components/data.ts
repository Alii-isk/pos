
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "PRICE", uid: "price", sortable: true},
  {name: "QUANTITY", uid: "quantity", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];



const products = [
  {
    id: 1,
    name: "Tony Reichert",
    price: 22,
    quantity: 0,
    photo: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Zoey Lang",
    price: 44,
    quantity: 0,
    photo: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Jane Fisher",
    price: 99,
    quantity: 0,
    photo: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 4,
    name: "William Howard",
    price: 9,
    quantity: 0,
    photo: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  
];

export {columns, products};

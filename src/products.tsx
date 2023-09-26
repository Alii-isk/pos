import { Input, Listbox, ListboxItem, cn } from "@nextui-org/react";
import { EditIcon } from "./components/icons/EditIcon";

export default function Products() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <ListboxWrapper
    className=" w-[900px] "

    >
      <Listbox
        className=" w-[900px] "
        variant="faded"
        aria-label="Listbox menu with icons"
      >
        <ListboxItem
          key="new"
          startContent={<EditIcon className={iconClasses} />}
          endContent={
            <div className="pointer-events-none flex items-center">
              <Input
                key={"d"}
                type="email"
                label="Email"
                placeholder="Enter your email"
              />
              <span className="text-default-400 text-small">x{" 2"}</span>
            </div>
          }
        >
          New file
        </ListboxItem>
        <ListboxItem
          key="copy"
          startContent={<EditIcon className={iconClasses} />}
        >
          Copy link
        </ListboxItem>
        <ListboxItem
          key="edit"
          showDivider
          startContent={<EditIcon className={iconClasses} />}
        >
          Edit file
        </ListboxItem>
        <ListboxItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<EditIcon className={cn(iconClasses, "text-danger")} />}
        >
          Delete file
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export const ListboxWrapper = ({ children }: any) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

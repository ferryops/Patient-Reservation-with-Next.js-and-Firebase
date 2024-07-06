import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  Button,
} from "@nextui-org/react";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import MainModal from "../MainModal";
import Snackbar from "../Snackbar";
import DokterForm from "../Dokter/DokterForm";
import { deleteDokter } from "@/services/dokterService";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function DokterCells({ columns, users, onUpdate }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [addDokter, setAddDokter] = React.useState(false);
  const [updateDokter, setUpdateDokter] = React.useState(false);
  const [selectDokter, setSelectDokter] = React.useState();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    position: "bottom-center",
    variant: "success",
  });

  const handleDeleteDokter = async (id) => {
    try {
      await deleteDokter(id).then((res) => {
        setOpenModal(false);
        setSnackbar({
          open: true,
          message: res.message,
          position: "top-center",
          variant: "success",
        });
        onUpdate(true);
      });
    } catch (error) {
      console.error("Error deleting pasien:", error);
    }
  };
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User avatarProps={{ radius: "lg", src: user.avatar }} description={user.nama} name={user.nama}>
            {user.nama}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.nomor_kontak}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="items-center gap-6 flex justify-center">
            <Tooltip color="warning" content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectDokter(user.id);
                  setUpdateDokter(true);
                }}
              >
                <FaPencilAlt color="warning" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectDokter(user.id);
                  setOpenModal(true);
                }}
              >
                <FaTrash color="danger" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <Button color="primary" startContent={<FaPlus />} onClick={() => setAddDokter(true)}>
          Tambah Dokter
        </Button>
        <Pagination total={10} initialPage={1} />
      </div>
      {/* <pre>{JSON.stringify(selectDokter, null, 2)}</pre> */}
      <MainModal
        size="md"
        onOpen={openModal}
        onClose={() => setOpenModal(false)}
        onTrue={() => handleDeleteDokter(selectDokter)}
        title={"Konfirmasi Hapus Dokter"}
        content={"Yakin ingin menghapus dokter ini?"}
        showFooter={true}
        textTrue="Hapus"
        textFalse="Batal"
      />
      <MainModal
        size="md"
        onOpen={addDokter}
        onClose={() => setAddDokter(false)}
        onTrue={() => console.log("add")}
        title={"Tambah Dokter"}
        content={<DokterForm id={null} onClose={() => setAddDokter(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <MainModal
        size="md"
        onOpen={updateDokter}
        onClose={() => setUpdateDokter(false)}
        onTrue={() => console.log("update")}
        title={"Edit Dokter"}
        content={<DokterForm id={selectDokter} onClose={() => setUpdateDokter(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <Snackbar message={snackbar.message} show={snackbar.open} position={snackbar.position} variant={snackbar.variant} />
    </div>
  );
}

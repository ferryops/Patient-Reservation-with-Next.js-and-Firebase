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
import PasienForm from "../Pasien/PasienForm";
import { deletePasien, exportToExcelPasiens } from "@/services/pasienService";

export default function PasienCells({ columns, users, onUpdate }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [addPasien, setAddPasien] = React.useState(false);
  const [updatePasien, setUpdatePasien] = React.useState(false);
  const [selectPasien, setSelectPasien] = React.useState();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    position: "bottom-center",
    variant: "success",
  });

  const handleDeletePasien = async (id) => {
    try {
      await deletePasien(id).then((res) => {
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
          <User avatarProps={{ radius: "lg", src: user.avatar }} name={user.nama} className="capitalize">
            {user.nama}
          </User>
        );
      case "contact":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user?.nomor_telepon}</p>
            <p className="text-bold text-sm text-default-400">{user?.email}</p>
          </div>
        );
      case "last_diagnosis":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {user?.diagnosis_terakhir}
          </Chip>
        );
      case "actions":
        return (
          <div className="items-center gap-6 flex justify-center">
            <Tooltip color="warning" content="Edit Pasien">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectPasien(user.id);
                  setUpdatePasien(true);
                }}
              >
                <FaPencilAlt color="warning" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Pasien">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectPasien(user.id);
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

  const handleExportToExcelPasiens = async () => {
    try {
      await exportToExcelPasiens().then((res) => {
        setSnackbar({
          open: true,
          message: "Exported successfully",
          position: "top-center",
          variant: "success",
        });
      });
    } catch (error) {
      console.error("Error exporting pasien:", error);
    }
  };

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
        <div>
          <Button color="primary" startContent={<FaPlus />} onClick={() => setAddPasien(true)}>
            Tambah Pasien
          </Button>
          <Button color="warning" startContent={<FaPlus />} onClick={() => handleExportToExcelPasiens()}>
            Ekspor data ke Excel
          </Button>
        </div>
        <Pagination total={10} initialPage={1} />
      </div>
      <MainModal
        size="md"
        onOpen={openModal}
        onClose={() => setOpenModal(false)}
        onTrue={() => handleDeletePasien(selectPasien)}
        title={"Konfirmasi Hapus Pasien"}
        content={"Yakin ingin menghapus pasien ini?"}
        showFooter={true}
        textTrue="Hapus"
        textFalse="Batal"
      />
      <MainModal
        size="md"
        onOpen={addPasien}
        onClose={() => setAddPasien(false)}
        onTrue={() => console.log("add")}
        title={"Tambah Pasien"}
        content={<PasienForm id={null} onClose={() => setAddPasien(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <MainModal
        size="md"
        onOpen={updatePasien}
        onClose={() => setUpdatePasien(false)}
        onTrue={() => console.log("update")}
        title={"Edit Pasien"}
        content={<PasienForm id={selectPasien} onClose={() => setUpdatePasien(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <Snackbar message={snackbar.message} show={snackbar.open} position={snackbar.position} variant={snackbar.variant} />
    </div>
  );
}

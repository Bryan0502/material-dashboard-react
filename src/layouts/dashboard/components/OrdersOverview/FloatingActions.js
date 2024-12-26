import React, { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PaidIcon from "@mui/icons-material/Paid"; // Ícono para "Ingreso"
import MoneyOffIcon from "@mui/icons-material/MoneyOff"; // Ícono para "Gasto"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"; // Ícono para "Transferencia"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function FloatingActions() {
  const [openModal, setOpenModal] = useState(false); // Controla si el modal está abierto
  const [modalTitle, setModalTitle] = useState(""); // Guarda el título según la opción seleccionada

  const actions = [
    { icon: <PaidIcon />, name: "Ingreso" },
    { icon: <MoneyOffIcon />, name: "Gasto" },
    { icon: <SwapHorizIcon />, name: "Transferencia" },
  ];

  // Estilo del modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#344767", // Fondo personalizado
    color: "white", // Texto en blanco
    p: 4,
    borderRadius: 2,
    outline: "none",
    boxShadow: 24,
    textAlign: "center",
  };

  // Manejador para abrir el modal con el título adecuado
  const handleOpenModal = (actionName) => {
    setModalTitle(actionName); // Configura el título del modal
    setOpenModal(true); // Abre el modal
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {/* Botón flotante con tres opciones */}
      <SpeedDial
        ariaLabel="Opciones"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          "& .MuiFab-primary": {
            width: 50, // Aumenta el tamaño del FAB
            height: 50, // Aumenta el tamaño del FAB
          },
        }}
        icon={<SpeedDialIcon sx={{ fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleOpenModal(action.name)} // Llama al modal con el título correspondiente
          />
        ))}
      </SpeedDial>

      {/* Modal que se muestra al seleccionar una opción */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h5">{modalTitle}</Typography> {/* Título del modal */}
        </Box>
      </Modal>
    </>
  );
}

export default FloatingActions;

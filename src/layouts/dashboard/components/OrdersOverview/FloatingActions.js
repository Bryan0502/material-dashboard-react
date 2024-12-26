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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

import billeteraIcon from "assets/images/icons/cuentas/billetera.png"; // Ruta del icono

function FloatingActions() {
  const [openModal, setOpenModal] = useState(false); // Controla si el modal de Ingreso/Gasto está abierto
  const [openTransferModal, setOpenTransferModal] = useState(false); // Controla si el modal de Transferencia está abierto
  const [modalTitle, setModalTitle] = useState(""); // Guarda el título según la opción seleccionada
  const [selectedAccountDesde, setSelectedAccountDesde] = useState("planillin"); // Inicializa con el valor "Cuenta de Ahorros"
  const [selectedAccountHacia, setSelectedAccountHacia] = useState("ahorrito"); // Inicializa con el valor "Cuenta de Ahorros"

  const [openSpeedDial, setOpenSpeedDial] = useState(false); // Controla si el SpeedDial está abierto

  const actions = [
    { icon: <PaidIcon />, name: "Ingreso" },
    { icon: <MoneyOffIcon />, name: "Gasto" },
    { icon: <SwapHorizIcon />, name: "Transferencia" },
  ];

  // Estilo de los modales
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
    minWidth: 300,
  };

  // Manejador para abrir el modal con el título adecuado
  const handleOpenModal = (actionName) => {
    if (actionName === "Transferencia") {
      setOpenTransferModal(true); // Abre el modal de Transferencia
    } else {
      setModalTitle(actionName); // Configura el título del modal
      setOpenModal(true); // Abre el modal de Ingreso/Gasto
    }
  };

  // Manejadores para cerrar los modales
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseTransferModal = () => {
    setOpenTransferModal(false);
  };

  // Manejador para el select cuenta desde
  const handleSelectChangeDesde = (event) => {
    setSelectedAccountDesde(event.target.value); // Actualiza el valor seleccionado
  };

   // Manejador para el select cuenta hacia
   const handleSelectChangeHacia = (event) => {
    setSelectedAccountHacia(event.target.value); // Actualiza el valor seleccionado
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
            width: 70, // Tamaño del FAB
            height: 70, // Tamaño del FAB
          },
        }}
        icon={<SpeedDialIcon sx={{ fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }} />}
        onClick={() => setOpenSpeedDial((prev) => !prev)} // Alternar el estado al hacer clic
        open={openSpeedDial} // Controla si está abierto o cerrado
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "2rem !important", // Aumenta el tamaño del ícono
              },
              "& .MuiSpeedDialAction-fab": {
                width: 60, // Aumenta el tamaño del botón
                height: 60, // Aumenta el tamaño del botón
              },
            }}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleOpenModal(action.name)} // Llama al modal con el título correspondiente
          />
        ))}
      </SpeedDial>

      {/* Modal para Ingreso y Gasto */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {modalTitle}
          </Typography>
          {/* Select para elegir cuenta */}
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="account-select" sx={{ color: "white" }}>
              Cuenta
            </InputLabel>
            <NativeSelect
              value={selectedAccountDesde} // Asigna el valor actual del estado
              inputProps={{
                name: "account",
                id: "account-select",
              }}
              sx={{
                color: "white", // Color del texto dentro del select
                bgcolor: "#2c3557", // Fondo del select
                borderRadius: 1, // Bordes redondeados
                "&:before": { borderBottom: "1px solid white !important" },
                "&:after": { borderBottom: "1px solid white !important" },
                "& .MuiNativeSelect-icon": { color: "white" }, // Icono del select
                "& option": { color: "white !important", backgroundColor: "#2c3557 !important" }, // Estilo de las opciones
                "& .MuiNativeSelect-select": { color: "white !important", backgroundColor: "#2c3557 !important" }, // Estilo de las opciones
              }}
              onChange={handleSelectChangeDesde}
            >
              <option value="ahorrito" id="ahorrito">
                Cuenta de Ahorros
              </option>
              <option value="planillin" id="planillin">
                Cuenta de Planilla
              </option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Modal>

      {/* Modal para Transferencia */}
      <Modal open={openTransferModal} onClose={handleCloseTransferModal}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Transferencia
          </Typography>
          {/* Aquí puedes incluir otros elementos específicos para Transferencia */}
          {/* Select para elegir cuenta desde*/}
          <FormControl fullWidth sx={{
                display: "flex",
                flexDirection: "row", // Alinea en una sola línea
                alignItems: "center", // Centra verticalmente
                gap: 1, // Espaciado entre ícono y select
            }}>
        <Box
          component="img"
          src={billeteraIcon}
          alt="Desde"
          sx={{ width: 24, height: 24}}
        />
        <NativeSelect
          value={selectedAccountDesde}
          inputProps={{
            name: "account",
            id: "account-select",
          }}
          sx={{
            color: "white",
            bgcolor: "transparent", // Fondo transparente
            border: "none", // Sin bordes
            outline: "none", // Sin contorno
            flexGrow: 1, // Hace que el select ocupe el espacio restante
            "& .MuiNativeSelect-icon": { color: "white" },
            "& option": {
              color: "white !important",
              backgroundColor: "transparent !important", // Fondo transparente para las opciones
              border: "none", // Sin bordes en las opciones
            },
            "& .MuiNativeSelect-select": { color: "white !important", backgroundColor: "#2c3557 !important" }, // Estilo de las opciones nuevas
            "&:hover": {
              backgroundColor: "transparent", // Sin cambio de fondo al hover
            },
          }}
          onChange={handleSelectChangeDesde}
        >
          <option value="ahorrito" id="ahorrito">
            Cuenta de Ahorros
          </option>
          <option value="planillin" id="planillin">
            Cuenta de Planilla
          </option>
        </NativeSelect>
      </FormControl>

      {/* Select "Hacia" */}
      <FormControl
  fullWidth
  sx={{
    display: "flex",
    flexDirection: "row", // Alinea en una sola línea
    alignItems: "center", // Centra verticalmente
    gap: 1, // Espaciado entre ícono y select
  }}
>
  {/* Ícono a la izquierda */}
  <Box
    component="img"
    src={billeteraIcon}
    alt="Icono"
    sx={{ width: 24, height: 24 }}
  />
  {/* Select a la derecha */}
  <NativeSelect
    value={selectedAccountHacia}
    inputProps={{
      name: "accountto",
      id: "account-selectto",
    }}
    sx={{
      color: "white",
      bgcolor: "transparent", // Fondo transparente
      border: "none", // Sin bordes
      outline: "none", // Sin contorno
      flexGrow: 1, // Hace que el select ocupe el espacio restante
      "& .MuiNativeSelect-icon": { color: "white" },
      "& option": {
        color: "white !important",
        backgroundColor: "transparent !important", // Fondo transparente para las opciones
        border: "none", // Sin bordes en las opciones
      },
      "& .MuiNativeSelect-select": { color: "white !important", backgroundColor: "#2c3557 !important" }, // Estilo de las opciones nuevas
      "&:hover": {
        backgroundColor: "transparent", // Sin cambio de fondo al hover
      },
    }}
    onChange={handleSelectChangeHacia}
  >
    <option value="ahorrito" id="ahorrito">
      Cuenta de Ahorros
    </option>
    <option value="planillin" id="planillin">
      Cuenta de Planilla
    </option>
  </NativeSelect>
</FormControl>


        </Box>
      </Modal>
    </>
  );
}

export default FloatingActions;

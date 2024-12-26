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
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import billeteraIcon from "assets/images/icons/cuentas/billetera.png"; // Ruta del icono
import transferenciaIcon from "assets/images/icons/categorias/transferencia.png"; // Ruta del icono
import detalleIcon from "assets/images/icons/categorias/detalles.png"; // Ruta del icono
import fechaIcon from "assets/images/icons/categorias/fecha.png"; // Ruta del icono

function FloatingActions() {
  const [openModal, setOpenModal] = useState(false); // Controla si el modal de Ingreso/Gasto está abierto
  const [openTransferModal, setOpenTransferModal] = useState(false); // Controla si el modal de Transferencia está abierto
  const [modalTitle, setModalTitle] = useState(""); // Guarda el título según la opción seleccionada
  const [selectedAccountDesde, setSelectedAccountDesde] = useState("planillin"); // Inicializa con el valor "Cuenta de Ahorros"
  const [selectedAccountHacia, setSelectedAccountHacia] = useState("ahorrito"); // Inicializa con el valor "Cuenta de Ahorros"
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [transferDetail, setTransferDetail] = useState(""); //Inicializa el detalle

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
        <Modal open={openTransferModal} onClose={() => setOpenTransferModal(false)}>
        <Box sx={modalStyle}>
            <Typography variant="h5" sx={{ mb: 2 }}>
            Transferencia
            </Typography>

            {/* Campo Monto */}
            <FormControl
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                marginBottom: "10px",
            }}
            >
            <Box component="img" src={transferenciaIcon} alt="Monto" sx={{ width: 24, height: 24 }} />
            <input
                type="number"
                placeholder="Monto"
                style={{
                flexGrow: 1,
                padding: "8px",
                border: "none",
                outline: "none",
                backgroundColor: "#2c3557",
                color: "white",
                borderRadius: "4px",
                }}
            />
            </FormControl>

            {/* Select Desde */}
            <FormControl
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                marginBottom: "10px",
            }}
            >
            <Box component="img" src={billeteraIcon} alt="Desde" sx={{ width: 24, height: 24 }} />
            <NativeSelect
                value={selectedAccountDesde}
                inputProps={{
                name: "account",
                id: "account-select",
                }}
                sx={{
                color: "white",
                bgcolor: "transparent",
                border: "none",
                outline: "none",
                flexGrow: 1,
                "& .MuiNativeSelect-icon": { color: "white" },
                "& option": {
                    color: "white !important",
                    backgroundColor: "transparent !important",
                    border: "none",
                },
                "& .MuiNativeSelect-select": {
                    color: "white !important",
                    backgroundColor: "#2c3557 !important",
                },
                "&:hover": {
                    backgroundColor: "transparent",
                },
                }}
                onChange={(e) => setSelectedAccountDesde(e.target.value)}
            >
                <option value="ahorrito" id="ahorrito">
                Cuenta de Ahorros
                </option>
                <option value="planillin" id="planillin">
                Cuenta de Planilla
                </option>
            </NativeSelect>
            </FormControl>

            {/* Select Hacia */}
            <FormControl
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                marginBottom: "10px",
            }}
            >
            <Box component="img" src={billeteraIcon} alt="Hacia" sx={{ width: 24, height: 24 }} />
            <NativeSelect
                value={selectedAccountHacia}
                inputProps={{
                name: "accountto",
                id: "account-selectto",
                }}
                sx={{
                color: "white",
                bgcolor: "transparent",
                border: "none",
                outline: "none",
                flexGrow: 1,
                "& .MuiNativeSelect-icon": { color: "white" },
                "& option": {
                    color: "white !important",
                    backgroundColor: "transparent !important",
                    border: "none",
                },
                "& .MuiNativeSelect-select": {
                    color: "white !important",
                    backgroundColor: "#2c3557 !important",
                },
                "&:hover": {
                    backgroundColor: "transparent",
                },
                }}
                onChange={(e) => setSelectedAccountHacia(e.target.value)}
            >
                <option value="ahorrito" id="ahorrito">
                Cuenta de Ahorros
                </option>
                <option value="planillin" id="planillin">
                Cuenta de Planilla
                </option>
            </NativeSelect>
            </FormControl>

            {/* Campo Detalle */}
            <FormControl
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                marginBottom: "10px",
            }}
            >
            <Box component="img" src={detalleIcon} alt="Detalle" sx={{ width: 24, height: 24 }} />
            <TextField
                fullWidth
                variant="standard"
                placeholder="Detalle"
                value={transferDetail}
                onChange={(e) => setTransferDetail(e.target.value)}
                InputProps={{
                disableUnderline: true,
                style: {
                    color: "white",
                    backgroundColor: "#2c3557",
                    padding: "8px",
                    borderRadius: "4px",
                },
                }}
            />
            </FormControl>

            {/* Campo Fecha */}
            <FormControl
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                marginBottom: "10px",
            }}
            >
                <Box component="img" src={fechaIcon} alt="Fecha" sx={{ width: 24, height: 24 }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha"
                        value={selectedDate}
                        format="YYYY-MM-DD"
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slotProps={{
                        openPickerButton: {
                        color: 'white',
                        },
                        textField: {
                            size: "small",
                            InputProps: {
                            style: {
                                color: "white",
                                backgroundColor: "#2c3557",
                                borderRadius: "4px",
                            },
                            },
                        },
                        day: {
                            sx: {
                            "&.Mui-selected": {
                                backgroundColor: "#2c3557 !important", // Fondo del día seleccionado
                                color: "white", // Texto blanco
                            },
                            "&:hover": {
                                backgroundColor: "lightblue", // Fondo al pasar el mouse
                            },
                            },
                        },
                        }}
                    />
                </LocalizationProvider>

            </FormControl>
            </Box>
        </Modal>

    </>
  );
}

export default FloatingActions;

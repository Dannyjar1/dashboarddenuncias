import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, React, useEffect } from 'react';
import { Link } from 'react-router-dom';
// @mui
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Image
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';

// sections
import { DenunciasListHead, DenunciasListToolBar } from '../sections/@dashboard/blog';
// mock
import denuncias from '../_mock/denuncias';
// Importa la librería axios para realizar las solicitudes HTTP (instálala si aún no lo has hecho)

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tituloDenuncia', label: 'Titulo', alignRight: false },
  { id: 'nombreDenunciante', label: 'Denunciante', alignRight: false },
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'estado', label: 'Estado', alignRight: false },
  { id: 'categoria', label: 'Categoria', alignRight: false },
  { id: 'evidencia', label: 'Evidencia', alignRight: false },
  { id: 'ubicacion', label: 'Ubicacion', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function DenunciasPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataAPI, setDataAPI] = useState({ dataInfo: [] });
  console.log('dENUNCIASpRUEBAS');

  useEffect(() => {
    console.log('hola estoy en use effect');
    callFetch();
  }, []);

  const callFetch = async () => {
    try {
      const response = await denuncias();
      setDataAPI({ dataInfo: response });
      console.log("salida",response)
    } catch (error) {
      // Manejar el error si es necesario
      console.error('Error al obtener las Denuncias:', error);
    }
  };

  const { dataInfo } = dataAPI;
  
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataInfo?.length) : 0;

  return (
    <>
      <Helmet>
        <title>Denuncias | Minimal UI</title>
      </Helmet>

      <Container>


        <Card>
          <DenunciasListToolBar numSelected={selected.length} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DenunciasListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataInfo?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {dataInfo?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, tituloDenuncia, nombreDenunciante, descripcion, ubicacion, categoria, estado, evidencia,coordenadas } = row;
                    const selectedDenuncia = selected.indexOf(tituloDenuncia) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedDenuncia}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedDenuncia} onChange={(event) => handleClick(event, tituloDenuncia)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={tituloDenuncia}/>
                            <Typography variant="subtitle2" noWrap>
                              {tituloDenuncia}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{nombreDenunciante}</TableCell>

                        <TableCell align="left">{descripcion}</TableCell>

                        <TableCell align="left">{estado}</TableCell>

                        <TableCell align="left">{categoria}</TableCell>

                        <TableCell align="left"> <img src='{evidencia}' alt='{evidencia}'/> </TableCell>

                        <TableCell align="left">{ubicacion.coordenadas}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                        
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataInfo.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Link to="/dashboard/denuncia">
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          {/* <a Navigate to ="usuario">Ver</a> */}
          ver</Link>
        </MenuItem>
      </Popover>
    </>
  );
}

export default DenunciasPage;


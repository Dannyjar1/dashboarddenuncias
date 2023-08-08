import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, React, useEffect } from 'react';
import axios from 'axios';

// @mui
import {
  Box,
  CardContent,
  Card,
  CardMedia,
  Container,
  IconButton,
  theme,
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
import denuncia from '../_mock/denuncia';
// Importa la librería axios para realizar las solicitudes HTTP (instálala si aún no lo has hecho)

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

function DenunciaPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataAPI, setDataAPI] = useState({ dataInfo: [] });
  console.log('dENUNCIApRUEBA');

  useEffect(() => {
    console.log('hola estoy en use effect');
    callFetch();
  }, []);

  const callFetch = async () => {
    try {
      const response = await denuncia();
      setDataAPI({ dataInfo: response });
      console.log("salida",response)
    } catch (error) {
      // Manejar el error si es necesario
      console.error('Error al obtener la Denuncia:', error);
    }
  };

  const { dataInfo } = dataAPI;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataInfo?.length) : 0;

  return (
    <Card sx={{ display: 'flex' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          Denuncia 
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          detalles de cada una
        </Typography>
      </CardContent>
      
    </Box>
    <CardMedia
      component="img"
      sx={{ width: 151 }}
      image="/static/images/cards/live-from-space.jpg"
      alt="Live from space album cover"
    />
  </Card>
  );
}

export default DenunciaPage;
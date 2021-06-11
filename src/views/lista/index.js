import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import dados from "../data/dados.json";

const useStylesPG = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStylesPG();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  root: {
    width: "90%",
    margin: "15px",
    textAlign: "left",
    padding: "15px",
  },
  container: {
    maxHeight: "100%",
  },
  select: {
    width: "150px",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: "10px",
    color: "#FFA500",
  },
  link: {
    display: "flex",
    marginRight: "10px",
  },
  head: {
    fontWeight: "bold",
    backgroundColor: "#DCDCDC",
  },
  fabButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Lista = () => {
  var data = [];
  if (localStorage.getItem("dados")) {
    data = JSON.parse(localStorage.getItem("dados"));
  } else {
    localStorage.setItem("dados", JSON.stringify(dados));
  }
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(data);
  const [allRows] = React.useState(data);
  const [filtroUnop, setUnop] = React.useState("");
  const [filtroSituacao, setSituacao] = React.useState("");

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function pesquisar(valorUnop, valorSituacao) {
    setUnop(valorUnop);
    setSituacao(valorSituacao);
    let data_filter;
    if (valorUnop !== "" || valorSituacao !== "") {
      if (isNaN(parseInt(valorUnop))) {
        data_filter = allRows.filter(
          (element) =>
            (valorUnop === ""
              ? true
              : element.nome.substr(0, valorUnop.length).toLowerCase() ===
                valorUnop.toLowerCase()) &&
            (valorSituacao === "" ? true : element.situacao === valorSituacao)
        );
      } else {
        data_filter = allRows.filter(
          (element) =>
            (filtroUnop === ""
              ? true
              : element.codigo === parseInt(valorUnop)) &&
            (valorSituacao === "" ? true : element.situacao === valorSituacao)
        );
      }
      updateData(data_filter);
    } else {
      updateData(data_filter);
    }
  }

  const updateData = (data) => {
    setRows(data);
  };

  const Deletar = (props) => {
    const [open, setOpen] = React.useState(false);
    const [dados] = React.useState(JSON.parse(JSON.stringify(rows)));

    const abrir = () => {
      setOpen(true);
    };

    const fechar = () => {
      setOpen(false);
    };

    const remover = () => {
      let database = dados;
      let posicao;
      database.map((rec, idx) => {
        if (rec.codigo === parseInt(props.id)) {
          posicao = idx;
        }
        return "";
      });
      database.splice(posicao, 1);
      setRows(database);
      localStorage.setItem("dados", JSON.stringify(database));
      fechar();
    };

    return (
      <div>
        <Button onClick={abrir}>
          <DeleteOutlineIcon style={{ color: "red" }} />
        </Button>
        <Dialog
          open={open}
          onClose={fechar}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Excluir</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se confirmar os dados do restaurante serão excluidos
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={fechar} color="primary">
              Cancelar
            </Button>
            <Button onClick={remover} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const abriAdd = () => {
    window.location.href = "/#/formulario";
  };

  const abriEdit = (cod) => {
    window.location.href = "/#/formulario?id=" + cod;
  };

  return (
    <Paper className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/unop/#/">
          <HomeIcon className={classes.icon} />
          Home
        </Link>
        <Link color="inherit" href="/unop/#/" className={classes.link}>
          Titulo menu
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          Lista de UNOPs
        </Typography>
      </Breadcrumbs>
      <Typography variant="h4" style={{ textAlign: "left" }}>
        Lista de UNOPs
      </Typography>
      <TextField
        onChange={(ev) => pesquisar(ev.target.value, filtroSituacao)}
        fullWidth
        style={{ textAlign: "left", margin: "5px" }}
        label="Pesquisar UNOP"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon style={{ color: "#FFA500" }} />
            </InputAdornment>
          ),
        }}
      />
      <FormControl variant="outlined" style={{ margin: "5px" }}>
        <InputLabel htmlFor="outlined-age-native-simple">Situação</InputLabel>
        <Select
          className={classes.select}
          native
          onChange={(ev) => pesquisar(filtroUnop, ev.target.value)}
          label="Situação"
        >
          <option value="" />
          <option value={"Ativo"}>Ativo</option>
          <option value={"Inativo"}>Inativo</option>
        </Select>
      </FormControl>
      <Typography variant="h6" style={{ textAlign: "left" }}>
        Lista de UNOPs
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>UNOP</TableCell>
              <TableCell className={classes.head} align="center">
                Código da UNOP
              </TableCell>
              <TableCell className={classes.head} align="center">
                Situação
              </TableCell>
              <TableCell className={classes.head} align="center">
                Edição
              </TableCell>
              <TableCell className={classes.head} align="center">
                Exclusão
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.codigo}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.situacao}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Button onClick={() => abriEdit(row.codigo)}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <Deletar id={row.codigo} rows={rows} />
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage="Linhas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} 
                    de ${count !== -1 ? count : `mais que ${to}`}`
                }
                rowsPerPageOptions={[5, 10, 15]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fabButton}
        onClick={() => abriAdd()}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
};

export default Lista;

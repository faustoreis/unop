import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import { urlParams } from "../../urlParams";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Deletar from "./deletar";
import Incluir from "./incluir";

const useStyles = makeStyles({
  root: {
    width: "90%",
    margin: "15px",
    textAlign: "left",
    padding: "15px",
  },
  container: {
    maxHeight: "100%",
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
  table: {
    minWidth: "90%",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    marginBottom: "10px",
  },
  head: {
    fontWeight: "bold",
    backgroundColor: "#DCDCDC",
  },
  title: {
    margin: "10px",
    color: "#4F4F4F",
    textAlign: "left",
  },
});

function Formulario(props) {
  const classes = useStyles();

  class FormCadastro extends React.Component {
    constructor(props) {
      super(props);
      let parametro = props.location.search;
      let json = urlParams(parametro);
      localStorage.removeItem("posicao");
      this.state = {
        dados: this.dados(json),
        todosDados: this.dados(json),
        acao: json === "Endpoint inválido" ? "add" : "edit",
        openTurno: false,
      };
    }

    salvar() {
      let database = JSON.parse(localStorage.getItem("dados"));
      if (this.state.acao === "add") {
        database.push(this.state.dados);
      } else {
        database[localStorage.getItem("posicao")] = this.state.dados;
      }
      localStorage.setItem("dados", JSON.stringify(database));
      window.location.href = "/";
    }

    dados(json) {
      let dados;
      if (json === "Endpoint inválido") {
        dados = {
          codigo: "",
          nome: "",
          cnpj: "",
          situacao: "Ativo",
          turnos: [],
          restaurantes: [],
          feriados: [],
        };
      } else {
        let database = JSON.parse(localStorage.getItem("dados"));
        let posicao;
        database.map((rec, idx) => {
          if (rec.codigo === parseInt(json[1])) {
            posicao = idx;
          }
          return "";
        });
        dados = database[posicao];
        localStorage.setItem("posicao", posicao);
      }
      return dados;
    }

    atualizarTurno(dados) {
      var rec = this.state.dados;
      rec.turno = dados;
      this.setState({ dados: rec, todosDados: rec });
    }

    atualizarRestaurantes(dados) {
      var rec = this.state.dados;
      rec.restaurantes = dados;
      this.setState({ dados: rec, todosDados: rec });
    }

    atualizarFeriados(dados) {
      var rec = this.state.dados;
      rec.feriados = dados;
      this.setState({ dados: rec, todosDados: rec });
    }

    pesquisar(valor, lista) {
      let data_filter;
      let data = this.state.dados;
      let allRows =
        lista === "turnos"
          ? this.state.todosDados.turnos
          : this.state.todosDados.restaurantes;
      if (valor !== "") {
        data_filter = allRows.filter((element) =>
          valor === ""
            ? true
            : element.descricao.substr(0, valor.length).toLowerCase() ===
              valor.toLowerCase()
        );
      } else {
        data_filter = allRows;
      }
      if (lista === "turnos") {
        data.turnos = data_filter;
      } else {
        data.restaurantes = data_filter;
      }
      this.setState({ dados: data });
    }

    setar(ev, campo) {
      let data = this.state.dados;
      if (campo === "situacao") {
        data.situacao = ev.target.checked ? "Ativo" : "Inativo";
      } else {
        data[campo] = ev.target.value;
      }
      this.setState({ dados: data });
    }

    render() {
      return (
        <>
          <Typography
            variant="h4"
            style={{ textAlign: "left", marginBottom: "1em" }}
          >
            Configuração da UNOP
          </Typography>
          {this.state.acao === "edit" ? (
            <Typography variant="h6" style={{ textAlign: "left" }}>
              {this.state.dados.codigo} - {this.state.dados.nome}
            </Typography>
          ) : (
            ""
          )}
          {this.state.acao === "edit" ? (
            <Typography variant="h6" style={{ textAlign: "left" }}>
              CNPJ:{" "}
              <span style={{ fontWeight: "bold" }}>
                {("00000000000000" + this.state.dados.cnpj.toString())
                  .slice(-14)
                  .replace(
                    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
                    "$1.$2.$3/$4-$5"
                  )}
              </span>
            </Typography>
          ) : (
            <div>
              <TextField
                onChange={(ev) => this.setar(ev, "codigo")}
                size="small"
                style={{ textAlign: "left", margin: "15px" }}
                label="Código"
                variant="outlined"
                required
                helperText={
                  this.state.dados.codigo === "" ? "Campo obrigatório" : ""
                }
                error={this.state.dados.codigo === ""}
              />

              <TextField
                onChange={(ev) => this.setar(ev, "nome")}
                size="small"
                style={{ textAlign: "left", margin: "15px", width: "300px" }}
                label="Nome da UNOP"
                variant="outlined"
                helperText={
                  this.state.dados.nome === "" ? "Campo obrigatório" : ""
                }
                error={this.state.dados.nome === ""}
              />

              <TextField
                onChange={(ev) => this.setar(ev, "cnpj")}
                size="small"
                style={{ textAlign: "left", margin: "15px", width: "250px" }}
                label="CNPJ"
                variant="outlined"
                required
                helperText={
                  this.state.dados.cnpj === "" ? "Campo obrigatório" : ""
                }
                error={this.state.dados.cnpj === ""}
              />
            </div>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.dados.situacao === "Ativo" ? true : false}
                onChange={(ev) => this.setar(ev, "situacao")}
                name="situacao"
                color="primary"
              />
            }
            label="Ativa"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper>
                <Typography variant="h5" className={classes.title}>
                  Turnos
                </Typography>
                <TextField
                  onChange={(ev) => this.pesquisar(ev.target.value, "turnos")}
                  size="small"
                  style={{ textAlign: "left", margin: "5px", width: "98%" }}
                  label="Pesquisar Turnos"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon style={{ color: "#FFA500" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TableContainer>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>
                          Turno selecionados
                        </TableCell>
                        <TableCell className={classes.head}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.dados.turnos.map((rowTurnos, idxTurno) => (
                        <TableRow key={rowTurnos.turno}>
                          <TableCell component="th" scope="row">
                            {rowTurnos.descricao}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Deletar
                              lista="turnos"
                              posicao={idxTurno}
                              dados={this.state.dados.turnos}
                              upDate={(dados) => this.atualizarTurno(dados)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Incluir
                  lista="turno"
                  dados={this.state.dados.turnos}
                  upDate={(dados) => this.atualizarTurno(dados)}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                  Restaurantes
                </Typography>
                <TextField
                  onChange={(ev) =>
                    this.pesquisar(ev.target.value, "restaurantes")
                  }
                  size="small"
                  style={{ textAlign: "left", margin: "5px", width: "98%" }}
                  label="Pesquisar Restaurantes"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon style={{ color: "#FFA500" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TableContainer>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>
                          Restaurantes selecionados
                        </TableCell>
                        <TableCell className={classes.head}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.dados.restaurantes.map(
                        (rowRestaurantes, idxRestaurantes) => (
                          <TableRow key={rowRestaurantes.restaurantes}>
                            <TableCell component="th" scope="row">
                              {rowRestaurantes.descricao}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                              <Deletar
                                lista="restaurantes"
                                posicao={idxRestaurantes}
                                dados={this.state.dados.restaurantes}
                                upDate={(dados) =>
                                  this.atualizarRestaurantes(dados)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Incluir
                  lista="Restaurante"
                  dados={this.state.dados.restaurantes}
                  upDate={(dados) => this.atualizarRestaurantes(dados)}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                  Configurar calendário da unidade
                </Typography>
                <TableContainer>
                  <Table className={classes.table} style={{ width: "95%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>
                          Dias selecionados
                        </TableCell>
                        <TableCell className={classes.head}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.dados.feriados.map(
                        (rowFeriados, idxFeriados) => (
                          <TableRow key={rowFeriados.feriados}>
                            <TableCell component="th" scope="row">
                              {new Intl.DateTimeFormat().format(
                                new Date(rowFeriados.data)
                              )}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                              <Deletar
                                lista="feriados"
                                posicao={idxFeriados}
                                dados={this.state.dados.feriados}
                                upDate={(dados) =>
                                  this.atualizarFeriados(dados)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Incluir
                  lista="Feriado"
                  dados={this.state.dados.feriados}
                  upDate={(dados) => this.atualizarFeriados(dados)}
                />
              </Paper>
            </Grid>
            <Button
              variant="contained"
              className={classes.button}
              style={{
                color: "#FFFFFF",
                backgroundColor: "#1C1C1C",
                marginLeft: "auto",
                marginTop: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                width: "250px",
              }}
              onClick={() => this.salvar()}
              disabled={
                this.state.dados.codigo === "" ||
                this.state.dados.cnpj === "" ||
                this.state.dados.nome === ""
              }
            >
              Salvar
            </Button>
          </Grid>
        </>
      );
    }
  }

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
          Configuração de UNOP
        </Typography>
      </Breadcrumbs>
      <FormCadastro {...props} />
    </Paper>
  );
}

export default Formulario;

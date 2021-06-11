import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

class Incluir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      descricao: "",
    };
  }
  abrir() {
    this.setState({ open: true });
  }

  fechar() {
    this.setState({ open: false });
  }

  adiconar() {
    let database = this.props.dados;
    if (this.props.lista === "Feriado") {
      database.push({ data: this.state.descricao + " 00:00:00" });
    } else {
      database.push({ descricao: this.state.descricao });
    }
    this.props.upDate(database);
    this.fechar();
  }

  setar(ev) {
    this.setState({ descricao: ev.target.value });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={() => this.abrir()}
          style={{
            color: "#FFFFFF",
            backgroundColor: "#1C1C1C",
            marginLeft: "auto",
            marginTop: "20px",
            marginRight: "20px",
            marginBottom: "20px",
            width: "250px",
          }}
        >
          {"Incluir " + this.props.lista}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.fechar()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Incluir</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.lista === "Feriado" ? (
                <TextField
                  onChange={(ev) => this.setar(ev)}
                  id="date"
                  label="Feriado"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <TextField
                  onChange={(ev) => this.setar(ev)}
                  size="small"
                  style={{ textAlign: "left", margin: "5px", width: "98%" }}
                  label={"Descrição do " + this.props.lista}
                  variant="outlined"
                />
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.fechar()} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => this.adiconar()} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
Incluir.propTypes = {
  upDate: PropTypes.func,
};
export default Incluir;

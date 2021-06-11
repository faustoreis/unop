import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

class Deletar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  abrir() {
    this.setState({ open: true });
  }

  fechar() {
    this.setState({ open: false });
  }

  remover() {
    let database = this.props.dados;
    database.splice(this.props.posicao, 1);
    this.props.upDate(database);
    this.fechar();
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.abrir()}>
          <DeleteOutlineIcon style={{ color: "red" }} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.fechar()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Excluir</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se confirmar os dados serão excluidos
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.fechar()} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => this.remover()} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
Deletar.propTypes = {
  upDate: PropTypes.func,
};
export default Deletar;

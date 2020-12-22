import React from 'react';
import { Button, Input } from '@material-ui/core';
import { TransactionList } from '../components';
import { withSnackbar } from 'notistack';
import { queryTableGetCollection } from '../newCore/parser'

class TransactionsScreen extends React.Component {
  TransactionView = null;

  state = {
    currentQuery: '',
  }

  onChange = (currentQuery) => {
    this.setState({ currentQuery }, () => {
      this.execute();
    });
  }

  execute = () => {
    this.TransactionView.reloadData();
  }

  render() {
    return (
      <div>
        <Button variant='outlined' color='primary' onClick={() => this.TransactionView.promptToCreate()}>Create New Transaction</Button>
        <div></div>
        <Input fullWidth value={this.state.currentQuery} onChange={(e) => this.onChange(e.target.value)} />
        <Button variant='outlined' color='primary' onClick={() => this.execute()}>Execute</Button>

        <TransactionList
          ref={(o) => this.TransactionView = o}
          enqueueSnackbar={this.props.enqueueSnackbar}
          viewOnly={false}
          loadData={() => queryTableGetCollection(global.transactionManager.table, this.state.currentQuery)}
        />
      </div>
    );
  }
}

export default withSnackbar(TransactionsScreen);

import React ,{Component} from 'react';

import Snackbar from '@material-ui/core/Snackbar';


class CustomizedSnackBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            openSnackBar: props.open
        };
    }
    componentDidMount(){
        this.setState({
            openSnackBar: this.props.open
        });
    }
    render(){
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.openSnackBar}
        autoHideDuration={2000}
        onClose={() => this.setState({openSnackBar: false})}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
      />
    </div>
  );
}
}
export default CustomizedSnackBar;
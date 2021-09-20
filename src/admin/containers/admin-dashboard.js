import React,{ Component } from "react";
import CardView from "../../shared/ui-components/cardview";
import "./admin-dashboard.css";
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,Title
  } from '@devexpress/dx-react-chart-material-ui';
  const data = [
    { region: 'Normal', val: 100 },
    { region: 'Handicapped', val: 20 },
    { region: 'Infants', val: 10 },
  ];
class AdminDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data,
          };
    }
   
    render(){
        const { data: chartData } = this.state;
        return(
            <div>
            <div className="admin-dashboard-1">
                <div className="admin-dasboard-1-1">
                <CardView total="5" title = "Total Flights"/>
                </div>
                <div className="admin-dasboard-1-2">
                <CardView total = "300" title = "Total Passengers" />
                </div>
                <div className="admin-dasboard-1-3">
                <CardView total = "400" title = "Total Seats" />
                </div>
                <div className="admin-dasboard-1-4">
                <CardView total = "350" title = "Total Bookings" />
                </div>
            </div>
            <div className="admin-dashboard-2">
                 <Paper>
        <Chart
          data={chartData}
        > <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            valueField="val"
            argumentField="region"
          />
          
          <Title
            text="The Categories of Passengers"
          />
        </Chart>
      </Paper>
            </div>
            </div>
        )
    }
}
export default AdminDashboard;
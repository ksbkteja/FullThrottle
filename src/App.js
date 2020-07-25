import React from 'react';
import { Card, Row, Col, Button, Modal, Calendar, Avatar } from 'antd';
import 'antd/dist/antd.css';
import {data} from './data.js';
import './App.css';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      selectedPerson:[],
      selectedDate:[]
     }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChange = value => {
    const{selectedPerson}=this.state;
    let selectDate=selectedPerson[0].activity_periods.filter(record=> { 
       if(moment(record.start_time).format("YYYY-MM-DD") === value.format('YYYY-MM-DD')){
         return record
      }
    })
    this.setState({selectedDate:selectDate})
  }
  

  onClick = (id) => {
    this.showModal();
    let selectedDate = data.members.filter((record)=>{
      if(id === record.id){
        return record.activity_periods
      }  
    })
    this.setState({selectedPerson:selectedDate});
  }

  render() { 
    const {selectedDate} = this.state;
    // console.log(selectedDate,"opo");
    return ( 
      
      <React.Fragment>
        {data.members.map((data,index)=>{
          return(
            <Row justify="center">
              <Col span={6}>
                <Card hoverable>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}/>
                  &nbsp;&nbsp;&nbsp;{data.real_name}&nbsp;&nbsp;
                  <Button type="primary" onClick={()=>this.onClick(data.id)}>My Activity</Button>
                  <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    // bodyStyle={{width:'900px'}}
                  >
                    
                    <div >
                      <div style={{justify:"center"}}>
                        <Calendar onChange={this.onChange} fullscreen={false}/>
                      </div>
                      <div style={{border:'1px solid',padding:'30px',paddingLeft:'190px'}} >
                        <h3 style={{justifyContent:'center'}}>Activity Period</h3>
                        {selectedDate.length!==0?selectedDate[0].start_time:"No Schedule"}
                        &nbsp;&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;&nbsp;
                        {selectedDate.length!==0?selectedDate[0].end_time:"No Schedule"}
                      </div>
                    </div>
                  </Modal>
                </Card>
                
              </Col>
            </Row>

          )
        })}
        
      </React.Fragment>
     );
  }
}
 
export default App;
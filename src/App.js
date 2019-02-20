import React, { Component } from 'react';
import './App.css';

const CLOCKED_IN = "Clocked In";
const CLOCKED_OUT = "Clocked Out"

class App extends Component {
  
  employees = new Map();
  
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    
    this.state = {
      time: new Date(),
      events: [],
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.updateTime(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  
  updateTime() {
    this.setState({
      time: new Date()
    });
  }
  
  renderEvents(){
    const events = [];
    let rowColor = "snow";
    
    for(let i = this.state.events.length-1; i >= 0; i--){
      
      const style = {backgroundColor: rowColor};
      
      events.push(
        <div key={i} className="event" style={style}>
          <div className="column">{this.state.events[i].name} </div>
          <div className="column">{this.state.events[i].time.toLocaleString()} </div>
          <div className="column">{this.state.events[i].type} </div>
        </div>
      )
      
      if(rowColor === "snow")
        rowColor = "white";
      else
        rowColor = "snow"
    }
   
    
    return events;
  }
  
  clockIn = () => {
    const name = this.inputRef.current.value;
    const lowerCaseName = name.toLowerCase();
    const time = this.state.time;
    
    if(name.length === 0){
      alert("Name field cannot be empty");
      return;
    }
    
    console.log(name.length);
    
    if(this.employees.has(lowerCaseName)){
      if(this.employees.get(lowerCaseName) === CLOCKED_IN){
        alert(`${name} is already clocked in!`);
        return;
      }
    }
    
    this.employees.set(lowerCaseName, CLOCKED_IN);
    
    const event = {name: name, time: time, type: "Clock In"}
    const events = this.state.events.slice();
    events.push(event);
    this.setState({events: events});
    this.inputRef.current.value = "";
  }
  
  clockOut = () => {
    const name = this.inputRef.current.value;
    const lowerCaseName = name.toLowerCase();
    const time = this.state.time;
    
    if(name.length === 0){
      alert("Name field cannot be empty");
      return;
    }
    
    if(this.employees.has(lowerCaseName)){
      if(!(this.employees.get(lowerCaseName) === CLOCKED_IN)){
        alert(`${name} must be clocked in to clock out!`);
        return;
      }
    }
    else{
      alert(`${name} must be clocked in to clock out!`);
      return;
    }
    
    this.employees.set(lowerCaseName, CLOCKED_OUT);
    
    const event = {name: name, time: time, type: "Clock Out"}
    const events = this.state.events.slice();
    events.push(event);
    this.setState({events: events});
    this.inputRef.current.value = "";
  }
  
  render() {
    return (
      <div className="App">
        <p>
          {this.state.time.toLocaleString()}
          { this.state.currentName }
        </p>
        
        <div id="inputForm">
          Name: <input type="text" ref={this.inputRef}/>
          <button type="button" onClick={this.clockIn}>Clock In</button>
          <button type="button" onClick={this.clockOut}>Clock Out</button>
        </div>
        
        <div className="event">
          <div className="column"><b>Name</b></div>
          <div className="column"><b>Time</b></div>
          <div className="column"><b>Event Type</b></div>
        </div>
        
        {this.renderEvents()}
        
      </div>
    );
  }
}

export default App;

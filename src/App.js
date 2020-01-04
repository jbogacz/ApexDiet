import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import './App.css';
import Formula from './Formula/Formula';
import Introduction from './Introduction/Introduction';
import Card from './Cards/Cards';
import WeightDecrease from './Cards/WeightDecrease';
import WeightIncrease from './Cards/WeightIncrease';
// import { thisExpression } from '@babel/types';
import Graph from './Graph/Graph';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';




class App extends Component {
  state =  {
    Gender: '',
    Age: '',
    Weight: '',
    Height: '',
    Activity: '1.375',
    DisplayFormula: false,
    DisplayCut: false,
    DisplayBulk: false,
    DisplayGraph: false,
    Calories: '',
    Modifier: '',
    CarbModifier: '0.4',
    FatModifier: '0.4',
    ProteinModifier: '0.2',
    IsButtonActive: false,
  };

  handleGenderChange = (event) => {
    this.setState({
      Gender: event.target.value,
    });
  };

  handleAgeChange = (event) => {
    this.setState({
      Age: event.target.value,
    });
  };

  handleWeightChange = (event) => {
    this.setState({
      Weight: event.target.value,
    });
  };

  handleHeightChange = (event) => {
    this.setState({
      Height: event.target.value,
    });
  };

  handleActivityChange = (event) => {
    this.setState({
      Activity: event.target.value,
    })
  };

  // Modify 'Calorie' state in standalone function 
  // genderHandler = () => {

  // }

  buttonClickHandler = () => {
    this.setState({
      DisplayFormula: true,
      Calories: this.state.Gender === "Male" ? parseInt(((10 * this.state.Weight) + (6.25 * this.state.Height) - (5 * this.state.Age) + 5) * this.state.Activity) : parseInt(((10 * this.state.Weight) + (6.25 * this.state.Height) - (5 * this.state.Age) - 161) * this.state.Activity),
      DisplayCut: false,
      DisplayBulk: false,
      DisplayGraph: false,
    })
    let ButtonName = document.getElementById('Calc-Btn');
    if(ButtonName.firstChild.data === 'Go back!') {
      ButtonName.firstChild.data = 'Calculate!'
    } else { ButtonName.firstChild.data = 'Calculate!' };
  };

  cutButtonHandler = () => {
    this.setState({
      DisplayFormula: false,
      DisplayCut: true,
      DisplayGraph: true,
      Modifier: -350,
      CarbModifier: '0.4',
      FatModifier: '0.4',
      ProteinModifier: '0.2'
    })
    document.getElementById('Calc-Btn').firstChild.data = 'Go back!';
  };

  bulkButtonHandler = () => {
    this.setState({
      DisplayFormula: false,
      DisplayBulk: true,
      DisplayGraph: true,
      Modifier: 350,
      CarbModifier: '0.4',
      FatModifier: '0.4',
      ProteinModifier: '0.2'
    })
    document.getElementById('Calc-Btn').firstChild.data = 'Go back!';
  };

  lowCarbHandler = () => {
    this.setState({
      CarbModifier: '0.25',
      FatModifier: '0.5',
      ProteinModifier: '0.25'
    });
  };

  highCarbHandler = () => {
    this.setState({
      CarbModifier: '0.5',
      FatModifier: '0.25',
      ProteinModifier: '0.25'
    })
  };


  render() {
    return (
    <div className="App container col-md-6 col-sm-12 py-5 justify-content-center">
      <Introduction />
      <FormControl className="col-6">
        {/* <FormLabel component="legend">Gender</FormLabel> */}
        <RadioGroup row className="justify-content-center" aria-label="gender" name="gender"  onChange={this.handleGenderChange}>
          <FormControlLabel
            control={<Radio color="primary"/>} 
            value="Male"  
            onChange={this.handleGenderChange}
            id="male-check"
            label="Male"
            />
          <FormControlLabel
            control={<Radio color="primary"/>} 
            value="Female" 
            onChange={this.handleGenderChange}
            id="female-check"
            label="Female"
            /> 
          </RadioGroup>
        </FormControl>
        
        
      
        <div className="form-group row justify-content-center">
          <InputLabel htmlFor="age" className="col-2 col-form-label">Age:</InputLabel> 
          <TextField 
            type="number" 
            name="age" 
            onChange={this.handleAgeChange}
            className="form-control col-4"
            id="age"
            placeholder="(years)"
            variant="outlined"
            size="small"
          />
         
        </div>
        <div className="form-group row justify-content-center">
          <InputLabel htmlFor="weight" className="col-2 col-form-label">Weight:</InputLabel>
          <TextField 
            type="number" 
            name="weight" 
            onChange={this.handleWeightChange}
            className="form-control col-4"
            id="weight"
            placeholder="(kg)"
            variant="outlined"
            size="small"
          />
          
        </div>
        <div className="form-group row justify-content-center">
          <InputLabel htmlFor="height" className="col-2 col-form-label">Height:</InputLabel>
          <TextField 
            type="number" 
            name="height" 
            onChange={this.handleHeightChange}
            className="form-control col-4"
            id="height"
            placeholder="(cm)"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="form-group row justify-content-center">
          <InputLabel htmlFor="activity" className="col-2 col-form-label">Activity:</InputLabel> 
          {/* Activity values are basically RMR multipliers, used later on in the Formula */}
          <FormControl variant="outlined" className="col-4" size="small">
          {/* <InputLabel id="activity" className="col-4"> */}
            <Select
              labelId="activity"
              // id="activity"
              value={this.state.Activity}
              onChange={this.handleActivityChange}
               
            >
            <MenuItem
              label="Select"
              value={1.2}>
              Sedentary lifestyle
            </MenuItem>
            <MenuItem 
              value={1.375}
              >Light excercise, 1-2 times per week
            </MenuItem>
            <MenuItem
              value={1.550}>
              Moderate excercise, 3-5 times per week
            </MenuItem>
            <MenuItem
              value={1.725}>
              Hard excercise, 6-7 times per week
            </MenuItem>
            <MenuItem
              value={1.9}>
              Athlete, two times per day
            </MenuItem>
            </Select>
            </FormControl>
          {/* </InputLabel> */}
          
        </div>
      
        <div className="py-2">
          <button  
            className="btn btn-primary"
            onClick={this.buttonClickHandler}
            id="Calc-Btn">
              Calculate!
          </button>
        </div>
      {this.state.DisplayFormula ?
        <Formula 
        gender={this.state.Gender}
        age={this.state.Age}
        weight={this.state.Weight}
        height={this.state.Height}
        activity={this.state.Activity}
        display={this.state.DisplayFormula}
        calories={this.state.Calories}
      /> : null
      }
      {this.state.DisplayFormula ?
        <Card
        handleCutButton={this.cutButtonHandler}
        handleBulkButton={this.bulkButtonHandler}
        />
      : null }
      {this.state.DisplayCut ? 
        <WeightDecrease 
        calories={this.state.Calories}
        handleClassic={this.cutButtonHandler}
        handleLowCarb={this.lowCarbHandler}
        handleHighCarb={this.highCarbHandler}
        />
      : null } 
      {this.state.DisplayBulk ? 
        <WeightIncrease 
        calories={this.state.Calories}
        handleClassic={this.bulkButtonHandler}
        handleLowCarb={this.lowCarbHandler}
        handleHighCarb={this.highCarbHandler}
        />
      : null }
      {/* {this.state.DisplayGraph ?
        <CanvasJSChart options={graphProperties} 
        />
      : null } */}
     {this.state.DisplayGraph ?
      <Graph  
        carbohydrates={parseInt((this.state.Calories + this.state.Modifier) * this.state.CarbModifier / 4)}
        fat={parseInt((this.state.Calories + this.state.Modifier) * this.state.FatModifier / 9)}
        protein={parseInt((this.state.Calories + this.state.Modifier) * this.state.ProteinModifier / 4)}
        calories={this.state.Calories + this.state.Modifier}
      />
    : null }
    </div>
  )};
}

export default App;

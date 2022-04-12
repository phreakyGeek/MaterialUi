import React,{ useState, useEffect} from 'react'
import { Grid } from '@material-ui/core';
import {useForm, Form} from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as employeeService from '../../services/employeeService';

const genderItems = [
  {id:'male',title:'Male'},
  {id:'female',title:'female'},
  {id:'other',title:'Other'},

]

//Setting initial Global Variables to default values
const initialFValues = {
  id:0,
  fullName:'',
  email:'',
  mobile:'',
  city:'',
  gender:'male',
  departmentId:'',
  hireDate:new Date(),
  isPermanent:false,
}

//EmployeeForm component called from App.js
export default function EmployeeForm(props) {

  // Record sent for Edit
  const { addOrEdit, recordForEdit } = props;
  
  // Creating Validation Rules which sets the temp values if empty or invalid
  // Then returns true if each error is empty or invalid
  const validate = (fieldValues = values) => {

    let temp = {...errors}
    if('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName?'':'This field is required.'
    if('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email)?'':'Email is not Valid.'
    if('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile.length>9?'':'Minimum 10 Numbers required.'
    if('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length!==0?'':'This field is required.'

      setErrors({
       ...temp 
    })

    if(fieldValues === values)
      return Object.values(temp).every(x => x === "");

  }


  //Using functions from useForm file for resetting the form vales, setting new values of form,
  // handling any input changes by setting the values
  const {
    values, 
    setValues, 
    errors, 
    setErrors, 
    resetForm,
    handleInputChange
  } = useForm(initialFValues, true, validate);

  
  //Works on every press of submit button
  const handleSubmit = e => {
    e.preventDefault();
    
    if(validate()){
      addOrEdit(values, resetForm);

    }
  }

  useEffect(() => {
    if(recordForEdit !== null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit])

  return (
      <Form onSubmit={handleSubmit}>

        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              label='Full Name'
              name='fullName'
              value={values.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            <Controls.Input
              label='Email'
              name='email'
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label='Mobile'
              name='mobile'
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
            <Controls.Input
              label='City'
              name='city'
              value={values.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.RadioGroup
                name='gender'
                label='Gender'
                value={values.gender}
                onChange={handleInputChange}
                items={genderItems}
            />
              <Controls.Select
                name='departmentId'
                label='Department'
                value={values.departmentId}
                onChange={handleInputChange}
                options={employeeService.getDepartmentCollection()}
                error={errors.departmentId}
              />
              <Controls.DatePicker
                name='hireDate'
                label='Hire Date'
                value={values.hireDate}
                onChange={handleInputChange}
              />
              <Controls.Checkbox
                name='isPermanent'
                label='Permanent Employee'
                value={values.isPermanent}
                onChange={handleInputChange}
              />
              <div>
                <Controls.Button
                  type='submit'
                  text='Submit'
                />
                <Controls.Button
                  color='default'
                  text='Reset'
                  onClick={resetForm}
                />
              </div>
          </Grid>
        </Grid>
      
      </Form>
  )
}

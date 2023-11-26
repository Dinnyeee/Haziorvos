import React, { useEffect, useState } from "react";
import DoctorResponsiveAppBar from './DoctorResponsiveAppBar';
import { Autocomplete, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { deleteCase, getAllCases } from "services/CaseApi";
import { getAllFamilies } from "services/FamilyApi";
import dayjs from "dayjs";
import { getDoctorById } from "services/DoctorApi";



export const Cases = (props) => {

  useEffect(() => {
    const getData = async () => {
      try{
        //const docById = await get
        const result = await getAllCases();
        console.log(result);
        setCases(result);
      } catch(error){
        console.error('Error getAllCases data', error);
      }
    }; 

  const fetchFamilies = async () => {
    try{
      const res = await getAllFamilies();
      console.log(res);
      setFamilies(res);
    }catch (error){
        console.error('Error getAllFamilies data', error);

    }
  }
    getData();
    fetchFamilies();
  }, [])

  const navigate = useNavigate();
  const [familyValue, setFamilyValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const [priority, setPrio] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [families, setFamilies] = React.useState([]);

  const handleChange_1 = (event) => {
    setStatus(event.target.value);
  };
  const handleChange_2 = (event) => {
    setPrio(event.target.value);
  };
  const handleViewDetail =(e) => {
    navigate("/detailedcase");
  }
  const handleSearch = () => {
    //TODO send data and fetch the search result!! and update the list of cases based on that
  }

  const [cases, setCases] = useState([])
  const  handleDelete = (id) => {
    const newList = cases.filter((family) => family.id !== id);
    deleteCase(id).then(() =>setCases(newList));
 }

  return (
    <div>
     <DoctorResponsiveAppBar></DoctorResponsiveAppBar>

      <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '50vh' }}
        >

            <Grid item xs={3}>

<div className="search-field-doctor">
        <Autocomplete 
            
            value={familyValue}
            onChange={(event, newValue) => {
              setFamilyValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={families.map(f=>f.name)}
            sx={{ width: 250, margin:1 }}
            renderInput={(params) => <TextField {...params} label="Family" />}
      />

        <FormControl sx={{ width: 250, margin:1}}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange_1}
            >
                <MenuItem value={10}>NEW</MenuItem>
                <MenuItem value={20}>IN PROGRESS</MenuItem>
                <MenuItem value={30}>CLOSED</MenuItem>
            </Select>
        </FormControl>

        <FormControl 
              sx={{ width: 250, margin:1 }}>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="Priority"
              onChange={handleChange_2}
            >
            <MenuItem value={10}>TOP</MenuItem>
            <MenuItem value={20}>MEDIUM</MenuItem>
            <MenuItem value={30}>LOW</MenuItem>
          </Select>
        </FormControl>

        <Button sx={{ margin:1}} variant="contained" startIcon={<SearchIcon/>} onClick={handleSearch}> Search
        </Button>

</div>
    
 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Id</b></TableCell>
            <TableCell align="right"><b>Patient</b></TableCell>
            <TableCell align="right"><b>Opened</b></TableCell>
            <TableCell align="right"><b>Status</b></TableCell>
            <TableCell align="right"><b>Priority</b></TableCell>
            <TableCell align="right"><b>Appointment</b></TableCell>
            <TableCell align="right"><b></b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cases.map((family) => (
            <TableRow
              key={family.id}
              sx={{ '&:last-family td, &:last-family th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {family.id}
              </TableCell>
              <TableCell align="right">{family.child.name}</TableCell>
              <TableCell align="right">{dayjs(family.createdAt).format('YYYY/MM/DD hh:MM')}</TableCell>
              <TableCell align="right">
                  {family.status}
                </TableCell>
              <TableCell align="right">
                  {family.priority}
                </TableCell>
              <TableCell align="right">{dayjs(family.appointmentDate).format('YYYY/MM/DD hh:MM')}</TableCell>

              <TableCell align="right">
                 <IconButton onClick={handleViewDetail}>
                  <Visibility fontSize="small"/>
                 </IconButton>
                <IconButton aria-label="delete" size="small" onClick={() => handleDelete(family.id)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
</Grid>
</Grid>

    </div>
  );
}
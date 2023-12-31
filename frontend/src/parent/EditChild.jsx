import Container from '@mui/material/Container';
import React, { useEffect, useState } from "react";
import { Button, Card, Grid, TextField } from '@mui/material';
import {Routes, Route, useNavigate} from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import { getChildById, updateChild } from 'services/ChildApi';


export default function EditChild(props){
    const [name, setName] = useState('');
    const [taj, setTaj] = useState(''); 
    const [birth, setBirth] = useState('');
    const [nameError, setNameError] = useState(false); 
    const [tajError, setTajError] = useState(false); 
    const [birthError, setBirthError] = useState(false); 


    const [child, setChild] = useState({
        name:"valami",
        taj:1233479138,
        birthday: new Date(),
        
    });

    useEffect(() => {
    const getChild = async () => {
      try{
        const result = await getChildById(152);
        console.log(result);
        setChild(result);
      } catch(error){
        console.error(error.response.data);
      }
    }; 

    getChild();
  }, [])
    
    const navigate = useNavigate();
    
    const navigateToHome = () => {
        navigate('/admin');
  }
    const handleSubmit = (e) => {
        e.preventDefault()
        setNameError(false)
        setTajError(false)
        setBirthError(false)

        if(name == ''){
            setNameError(true);
        }

        if(taj == ''){
            setTajError(true);
        }

        if(birth == ''){
            setBirthError(true);
        }

        if(name && taj && birth){
        updateChild(child).then(() =>navigateToHome());
        }
       
        //TODO calling controller to edit the corresponding item on the list in the backend
        // only after that succeeds do we navigate back 
        // navigate back to listchild component where the new item will show as well
    }

   

    return (

    <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '80vh' }}
        >

            <Grid item xs={3}>
                <Card className='mycard'>
                        <form noValidate autoComplete='off' className='myform' onSubmit={handleSubmit}>
                            <div>
                                <TextField 
                                    label="Name"
                                    value={child.name}
                                    variant='outlined'
                                    required
                                    error={nameError}
                                    onChange={(e) => {setName(e.target.value);}}
                                />
                            </div>
                    
                            <div>
                                <TextField 
                                    label="TAJ"
                                    value={child.taj}
                                    variant='outlined'
                                    required
                                    error={tajError}
                                    onChange={(e) => {setTaj(e.target.value);}}
                                />
                            </div>
                            <div>
                                <TextField 
                                    helperText="Birthdate"
                                    variant='outlined'
                                    value={child.birthday}
                                    required
                                    error={birthError}
                                    type='date'
                                    onChange={(e) => {setBirth(e.target.value);}}

                                />
                            </div> 

                            <div className='buttons-in-form'>
                                <Button variant='contained' color='secondary' type='submit'>Save</Button>  
                                <Button onClick={navigateToHome} variant='outlined'>Cancel</Button>
                            </div>
                        </form>
                </Card>
            </Grid>
        </Grid>
    </div>
)}


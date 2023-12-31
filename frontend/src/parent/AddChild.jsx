import Container from '@mui/material/Container';
import React, { useState } from "react";
import { Button, Card, Grid, TextField } from '@mui/material';
import {Routes, Route, useNavigate} from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import { createChild } from 'services/ChildApi';




export default function AddChild(){
    const [name, setName] = useState('');
    const [taj, setTaj] = useState('');
    const [birth, setBirth] = useState('');
    const [nameError, setNameError] = useState(false); 
    const [tajError, setTajError] = useState(false); 
    const [birthError, setBirthError] = useState(false); 
    
    const navigate = useNavigate();
    
    const navigateToHome = () => { 
        navigate('/adminparent');
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
            console.log(name, taj);
            let child = {
                name: name,
                nickname: "Dórika",
                taj: taj,
                birthday: birth
            }
            createChild(child).then(() =>navigateToHome())
 

        }
       
        //TODO calling controller to add it to the list without id
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
                                    variant='outlined'
                                    required
                                    error={nameError}
                                    onChange={(e) => {setName(e.target.value);}}
                                />
                            </div>
                    
                            <div>
                                <TextField 
                                    label="TAJ"
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


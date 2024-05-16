import React, { useRef } from 'react';
import { FormData } from '../../components/interfaces/interface';
import './Form1.css';
import { TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ArrowForwardIos } from '@mui/icons-material';
import Footer from '../footer/Footer';
import logo from '../../assets/logo/heartsign.png';
import Typed from 'typed.js';

const Form1: React.FC<{
    onNext: () => void; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    formData: FormData; 
    formState: boolean;
    loading: boolean,
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    onSubmitClick: () => void; 
}> = ({
    onNext,
    onChange,
    formData,
    formState,
    loading,
    onSubmit,
    onSubmitClick
}) => {
    //Typwriter effect configuration
    const typeEffectEl = useRef(null);
    React.useEffect(() => {
        const typed = new Typed(typeEffectEl.current, {
            strings: ['<p>"The best way to understand your blood pressure is by checking it regularly."</p>'],
            typeSpeed: 10,
            showCursor: false,
            loop: false,
            loopCount: Infinity
        });
    
        return () => {
          // Destroy Typed instance during cleanup to stop animation
          typed.destroy();
        };
      }, []);

    return (
    <div className='fm1-body'>
        <div className='fm1-main'>
            <div className='fm1-left'>
                <div className="fm1-left_header"><img src={logo} alt="vester_logo" /></div>
                <h1>Blood Pressure</h1> <h1><span>Calculator</span></h1><h1> Insights!</h1>
                <div ref={typeEffectEl}>
                </div>
            </div>
            <div className='fm1-right'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '90%' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <h1 style={{width: "100%"}}>Enter your reading</h1>
                    <TextField
                        id="outlined-basic"
                        label="Systolic mmHg"
                        variant="outlined"
                        onChange={onChange}
                        name="systolic"
                        value={formData.systolic}
                        helperText={"Example: 120"}
                        type="number"
                        required
                    />
                    <TextField
                        id="outlined-basic"
                        label="Diastolic mmHg"
                        variant="outlined"
                        name="diastolic"
                        onChange={onChange}
                        value={formData.diastolic}
                        helperText={"Example: 80"}
                        type="number"
                        
                        required
                    />
                    <LoadingButton
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                            onSubmitClick();
                            onNext();
                            return onSubmit(event)
                        }}
                        endIcon={<ArrowForwardIos />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained" 
                        disabled={formState ? true : false}
                        color="secondary"
                    >
                        <span>GENERATE PLAN</span>
                    </LoadingButton>
                </Box>
            </div>
        </div>
            <h4>
                Check your blood pressure reading
                Use this service to:
            </h4>
            <ul>
                <li>check what your blood pressure reading means</li>
                <li>get information about what to do next</li>
            </ul>
        <Footer />
    </div>
    );
};

export default Form1;
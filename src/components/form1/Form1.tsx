import React, { SyntheticEvent, useRef } from 'react';
import { FormData } from '../../components/interfaces/interface';
import './Form1.css';
import { TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ArrowForwardIos } from '@mui/icons-material';
import { CountryType } from '../../components/interfaces/interface';
import Footer from '../footer/Footer';
import logo from '../../assets/logo/vester_ai.png';
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
    //const [value, setValue] = React.useState<CountryType | null>(null);

    // From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
    const countries: readonly CountryType[] = [
        {label: "Algeria", code: "DZ"},
        {label: "Angola", code: "AO"},
        {label: "Benin", code: "BJ"},
        {label: "Botswana", code: "BW"},
        {label: "Burkina Faso", code: "BF"},
        {label: "Burundi", code: "BI"},
        {label: "Cabo Verde", code: "CV"},
        {label: "Cameroon", code: "CM"},
        {label: "Central African Republic", code: "CF"},
        {label: "Chad", code: "TD"},
        {label: "Comoros", code: "KM"},
        {label: "Democratic Republic of the Congo", code: "CD"},
        {label: "Djibouti", code: "DJ"},
        {label: "Egypt", code: "EG"},
        {label: "Equatorial Guinea", code: "GQ"},
        {label: "Eritrea", code: "ER"},
        {label: "Eswatini", code: "SZ"},
        {label: "Ethiopia", code: "ET"},
        {label: "Gabon", code: "GA"},
        {label: "Gambia", code: "GM"},
        {label: "Ghana", code: "GH"},
        {label: "Guinea", code: "GN"},
        {label: "Guinea-Bissau", code: "GW"},
        {label: "Ivory Coast", code: "CI"},
        {label: "Kenya", code: "KE"},
        {label: "Lesotho", code: "LS"},
        {label: "Liberia", code: "LR"},
        {label: "Libya", code: "LY"},
        {label: "Madagascar", code: "MG"},
        {label: "Malawi", code: "MW"},
        {label: "Mali", code: "ML"},
        {label: "Mauritania", code: "MR"},
        {label: "Mauritius", code: "MU"},
        {label: "Morocco", code: "MA"},
        {label: "Mozambique", code: "MZ"},
        {label: "Namibia", code: "NA"},
        {label: "Niger", code: "NE"},
        {label: "Nigeria", code: "NG"},
        {label: "Rwanda", code: "RW"},
        {label: "Sao Tome and Principe", code: "ST"},
        {label: "Senegal", code: "SN"},
        {label: "Seychelles", code: "SC"},
        {label: "Sierra Leone", code: "SL"},
        {label: "Somalia", code: "SO"},
        {label: "South Africa", code: "ZA"},
        {label: "South Sudan", code: "SS"},
        {label: "Sudan", code: "SD"},
        {label: "Tanzania", code: "TZ"},
        {label: "Togo", code: "TG"},
        {label: "Tunisia", code: "TN"},
        {label: "Uganda", code: "UG"},
        {label: "Zambia", code: "ZM"},
        {label: "Zimbabwe", code: "ZW"}
      ];
      

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
        <p>
            <h4>
                Check your blood pressure reading
                Use this service to:
            </h4>
            <ul>
                <li>check what your blood pressure reading means</li>
                <li>get information about what to do next</li>
            </ul>
        </p>
        <Footer />
    </div>
    );
};

export default Form1;
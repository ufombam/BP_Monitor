import React, { SyntheticEvent, useRef } from 'react';
import { FormData } from '../../components/interfaces/interface';
import './Form1.css';
import { TextField, Autocomplete, Button, Box } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { CountryType } from '../../components/interfaces/interface';
import Footer from '../footer/Footer';
import logo from '../../assets/logo/vester_ai.png';
import Typed from 'typed.js';

const Form1: React.FC<{
    onNext: () => void; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    formData: FormData; 
    locationData: (countryData: CountryType | null) => void 
}> = ({
    onNext,
    onChange,
    formData,
    locationData
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
            strings: ['<h1>Unlock Your Potential</h1> <h1>with <span>AI-Powered</span></h1><h1> Insights!</h1><p>"Discover the Future of Assessments with AI. Empowerment Starts Here!"</p>'],
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
                    <h1 style={{width: "100%"}}>Onboarding Form</h1>
                    <TextField
                        id="outlined-basic"
                        label="Startup Name"
                        variant="outlined"
                        onChange={onChange}
                        name="name"
                        value={formData.name}
                        helperText={"Vester AI"}
                        required
                    />
                    <TextField
                        id="outlined-basic"
                        label="Website"
                        variant="outlined"
                        name="website"
                        onChange={onChange}
                        value={formData.website}
                        helperText={"www.vesterai.com"}
                        required
                    />
                    <Autocomplete
                        value={formData.location}
                        onChange={(event: SyntheticEvent<Element, Event>, value: CountryType | null) => {
                            locationData(value)}}
                        id="country-select-demo"
                        sx={{ width: 300 }}
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => {
                            if (option.code === value.code) {
                                return true
                            }
                            return true
                        }}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt=""
                                />
                            {option.label} ({option.code})
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Location in Africa (registered)"
                                name='location'
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                required
                            />
                        )}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<ArrowForwardIos />}
                        onClick={onNext}>
                        NEXT
                    </Button>
                </Box>
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default Form1;
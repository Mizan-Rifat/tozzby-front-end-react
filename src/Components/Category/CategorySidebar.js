import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { useQueryState } from 'react-router-use-location-state'


const useStyles = makeStyles((theme) => ({
    radioRoot: {
        padding: '0px 9px !important',
    },
    formlabel: {
        color: 'unset',
        borderBottom: '1px solid red',
        paddingBottom: '8px',
    }
}));


export default function CategorySidebar({ attributes,search }) {
    return (
        <div>
            {
                attributes.map((attribute, index) => (
                    attribute.type == 'select' &&
                    <div className="my-2">
                        <Section attribute={attribute} queryName={attribute.code} search={search} />
                    </div>
                ))
            }
        </div>
    )
}

function Section({ attribute,queryName,search }) {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const qry = new URLSearchParams(search);

    const [query, setQuery] = useQueryState(queryName, '')

    

    const handleChange = (event) => {
        if (event.target.value == 0){
            setQuery('')
        }else{
            setQuery(event.target.value)
        }
        setValue(parseInt(event.target.value))
    };

    useEffect(()=>{

        if(qry.get(queryName) != null){
            setValue(parseInt(qry.get(queryName)))
        }else{
            setValue(0)
        }
        
    },[])


    return (
        <FormControl component="fieldset" style={{ width: '100%' }}>
            <FormLabel component="legend" className={classes.formlabel}>{attribute.name}</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value={0} control={<Radio size="small" classes={{ root: classes.radioRoot }} />} label='All' />
                {
                    attribute.options.filter(item=>item.label != '').map((option, index) => (

                        <FormControlLabel key={index} value={option.id} control={<Radio size="small" classes={{ root: classes.radioRoot }} />} label={option.label} />
                    ))
                }


            </RadioGroup>
        </FormControl>

    )
}

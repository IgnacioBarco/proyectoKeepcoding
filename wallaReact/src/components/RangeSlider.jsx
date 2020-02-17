import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 400,
    },
});

function valuetext(value) {
    console.log('value de slider: '+value)
    return `${value}`;
}

export default function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState([0, 5000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >
            <Typography id="range-slider" gutterBottom>
                Precio
            </Typography>
            <Slider
                color="primary"
                size="lg"
                marks={true, [50]}
                step={50}
                max={5000}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}

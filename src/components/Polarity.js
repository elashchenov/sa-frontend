import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Polarity extends Component {

    propTypes = {
        sentence: PropTypes.string.isRequired,
        polarity: PropTypes.string.isRequired
    };

    render() {
        const green = Math.round((this.props.polarity + 1) * 128);
        const red = 255 - green;
        const textColor = {
            backgroundColor: 'rgb(0, 255, 0)',
            padding: '15px'
        };

        return <div style={textColor}>This is cat! </div>
    }
}

export default Polarity;

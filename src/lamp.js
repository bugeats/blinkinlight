import React from 'react';

const Lamp = props => {
    const style = {
        width: '200px',
        height: '100px',
        backgroundColor: props.color,
        opacity: props.lit ? 1 : 0.1,
        borderRadius: '50px'
    };

    return (<div style={style}>Lamp</div>);
};

export default Lamp;

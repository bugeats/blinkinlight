import React from 'react';

const Lamp = props => {
    const style = {
        width: '100px',
        height: '100px',
        backgroundColor: 'red',
        opacity: props.lit ? 1 : 0.1,
        borderRadius: '50px'
    };

    return (<div style={style}></div>);
};

export default Lamp;

import React, { useState, useEffect } from 'react';

const TileCanvas = (props) => {
    const [canvasRef] = useState(React.createRef());

    useEffect(() => {
        if (!props.data) { return; }

        console.log(props.data);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.save();
        ctx.clearRect(0, 0, width, height);

        let squareWidth = canvas.width / props.data.width;
        let squareHeight = canvas.height / props.data.height;


        props.data.image.forEach((value, index) => { 
            let x = index % props.data.width;
            let y = Math.floor(index / props.data.width);

            ctx.fillStyle = value;
            ctx.fillRect(x * squareWidth, y * squareHeight, squareWidth, squareHeight);
        });

        ctx.restore();
    }, [props.data, canvasRef]);

    return (
        <canvas width="300" height="300" ref={canvasRef} />
    );
}

export const TileDisplay = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => { 
        setInterval(
            async () => {
                fetch('http://localhost:8000/tiles', {mode: 'cors'})
                .then(response => response.json())
                .then(data => setData(data));
            }
        , 1000);
    }, []);

    return (
        <TileCanvas data={data}/>
    );
}
  
export default TileDisplay;
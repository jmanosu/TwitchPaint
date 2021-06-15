const data = {
    width: 0,
    height: 0,
    image: []
};

const getRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

const tiles = () => {
    return data;
}

const loadDefaultTiles = () => {
    data.width = 100;
    data.height = 100;
    
    for (let i = 0; i < data.width * data.height; ++i) {
        data.image[i] = '#ffffff';
    }
}

const loadRandomTiles = () => {
    data.width = 100;
    data.height = 100;
    
    for (let i = 0; i < data.width * data.height; ++i) {
        data.image[i] = getRandomColor();
    }
}

const modifyTile = (index, color) => {
    if (index > 0 && index < data.image.length) {
        return data.image[index] = color;
    }

    return null
}

const modifyTileXY = (x, y, color) => {
    let index = x * width + y * height;
    return modifyTile(index, color);
}

const modifyTileData = (modifyData) => {
    return modifyTile(modifyData.x, modifyData.y, modifyData.color);
}

const getModifyData = (string) => {
    const regex = /#[0-9A-F]{6} [0-9]+ [0-9]+/;
    const found = string.match(regex);

    let result = { color: "#ffffff", x: -1, y: -1 };
    if (found) {
        let splitString = found[0].split(" ");

        result.color = splitString[0];

        if (Number.isSafeInteger(parseInt(splitString[1]))) {
            result.x = parseInt(splitString[1]);
        }

        if (Number.isSafeInteger(parseInt(splitString[2]))) {
            result.y = parseInt(splitString[2]);
        }
    }
    
    return result;
}

const modifyRandom = () => {
    let index = Math.floor(Math.random() * (data.height * data.width));
    exports.modifyTile(index, getRandomColor());
}

export {
    getRandomColor,
    tiles,
    loadDefaultTiles,
    loadRandomTiles,
    modifyTile, modifyTileXY,
    modifyTileData,
    getModifyData,
    modifyRandom
};
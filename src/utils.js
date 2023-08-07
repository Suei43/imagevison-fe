function getFileFormat(filename) {
    const lastDotIndex = filename.lastIndexOf('.');

    if (lastDotIndex === -1) {
        return null;
    }

    const fileFormat = filename.slice(lastDotIndex + 1).toLowerCase();

    return fileFormat;
}

module.exports = getFileFormat;
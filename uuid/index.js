const v4 = () => {
    return Date.now().toString().split("").reverse().join("").slice(0, 4)-0
}
module.exports = {v4}
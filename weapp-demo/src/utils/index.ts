export function chunk(arr, size) {
    let result: any[] = [];
    let resultItem: any[] = [];
    arr.forEach(item => {
        if (resultItem.length === 0) {
            result.push(resultItem);
        }
        resultItem.push(item);
        if (resultItem.length === size) {
            resultItem = [];
        }
    })
    return result
}




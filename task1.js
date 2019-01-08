/**
 * Programming Problems:
Question:
For the following problems, you are required to write functions to solve the given problems in your
choice of tech stack / language from your understanding. Do not search for solutions online.
1. You have an array of n integers and an integer t. Write a function to return the indices of the
two numbers in the array which add up to t. You cannot use the same number twice. For your
answer, we will need the function codes, output based on the following input and a short
description of what you are trying to achieve.
Input: array = [11, 2, 7, 15], t = 9

Answer:
-step1: loop this array, each item : n1 , we will get one number: _n1 for total: n1 + _n1 = t; when finish we get 2 new array (not original array): array1 contain n1, array 2 contain _n1
-step2: compare array 2 (_n1) with original array
	+ if 2 array not have same any item: return null (no result)
	+ if it contain same atleast 1 item, then next check.
- step 3: check same number twice: if it not twice, it mean have good result.

 */
function getTwiceIndex(array, total){
    // step1: 
    //loop this array, each item : n1 , we will get one number: _n1 for total: n1 + _n1 = t; 
    //when finish we get 2 new array (not original array): array1 contain n1, array 2 contain _n1

    let newArray = []

    array.forEach((item, index) => {
        if(item < total){
            newArray.push({
                n1: item,
                _n1: total - item,
                index: index
            })
        }
    });

    // if newArray empty. then return null:
    if(newArray.length <= 0) return null;


    //step2: compare array 2 (_n1) with original array
    for (let i = 0; i < newArray.length; i++) {
        const {n1, _n1, index} = newArray[i]

        // note this is lastIndexOf, not indexOf, it will helpfull for compare
        let _index = array.lastIndexOf(_n1)

        if(_index !== -1){
            //step 3: check same number twice.
            if(n1 === _n1){
                if(index !== _index){
                    // good result:
                    return {n1: index, _n1: _index}
                }
            }else{
                // good result:
                return {n1: index, _n1: _index}
            }
        }

    }

    return null

}

let array = [11, 2, 7, 15], t = 9
let result = getTwiceIndex(array, t)
console.log(result)
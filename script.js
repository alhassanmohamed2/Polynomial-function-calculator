let superScript_arr = {
    '0':'&#8304;',
    '1':'&#185;',
    '2':'&#178;',
    '3':'&#179;',
    '4':'&#8308;',
    '5':'&#8309;',
    '6':'&#8310;',
    '7':'&#8311;',
    '8':'&#8312;',
    '9':'&#8313;',
}

let superScEle = document.querySelector(".superSc");

function make_super_script_letter(num_in_string){
    let full_super_scr = '';
    for(num in num_in_string){
        full_super_scr += superScript_arr[num_in_string[num]];
    }
    return full_super_scr;
    
}



function factorial(num){
    let fictorialResult = 1;
    for(let i = 1; i <= num; i++ ){
        fictorialResult = fictorialResult * i;
    }
    return fictorialResult;
}

function combination(firstNum, secondNum){
    return factorial(firstNum) / (factorial(firstNum - secondNum) * factorial(secondNum) )
}

function poly(firstXNum, firstXPower, secondXNum, secondXPower, bracketPower){
    let x ,y ,z ,q, h, j;
    let result_arr = [];
    for(let i = 0; i <= bracketPower; i++){
        x = Math.pow(firstXNum, (bracketPower - i));
        y = Math.pow(secondXNum , i);
        z = combination(bracketPower, i);

        q = x * y * z;
        h = i * secondXPower;
        j = (bracketPower  - i) * firstXPower

        
    // conditions for power == 0 or 1 and coff == 0 or 1

        let zero_pow_con  = '';
        let unit_coff_con = '';

        if (h+j == 0){
            zero_pow_con = '';
        }else if(h+j == 1){
            zero_pow_con = 'X'
        }else{
            zero_pow_con = `X${make_super_script_letter(`${h+j}`)}`;
        }
        if(q == 1){
            unit_coff_con = '';
        }else if (q == 0){
            unit_coff_con = '';
            zero_pow_con = '';
        }else{
            unit_coff_con = q;
        }

        result_arr.push(`${unit_coff_con} ${zero_pow_con} `);
    }
    return result_arr;
}

function NthElement(firstXNum, firstXPower, secondXNum, secondXPower, bracketPower, Nth_number){
    let x, y, z, num_orderd, h, j;
    x = combination(bracketPower, Nth_number - 1);
    y = Math.pow(firstXNum, bracketPower - (Nth_number - 1));
    z = Math.pow(secondXNum, Nth_number - 1);
    num_orderd = x * y * z;
    h = (Nth_number - 1) * secondXPower;
    j = (bracketPower - (Nth_number-1)) * firstXPower;


    // conditions for power == 0 or 1 and coff == 0 or 1
    let zero_pow_con  = '';
    let unit_coff_con = '';

    if (h+j == 0){
        zero_pow_con = '';
    }else if(h+j == 1){
        zero_pow_con = 'X'
    }else{
        zero_pow_con = `X${make_super_script_letter(`${h+j}`)}`;
    }
    if(num_orderd == 1){
        unit_coff_con = '';
    }else if (num_orderd == 0){
        unit_coff_con = '';
        zero_pow_con = '';
    }else{
        unit_coff_con = num_orderd;
    }
    return `${unit_coff_con} ${zero_pow_con} `;
}



let form = document.querySelector("form");
let firstNum = document.querySelector('#firstNum');
let firstPower = document.querySelector('#firstPower');
let secondNum = document.querySelector('#secondNum');
let secondPower = document.querySelector('#secondPower');
let bracketPower = document.querySelector('#bracketPower');
let calcButton = document.querySelector('#calcButton');

let OrderdNumCheckBox = document.querySelector('#OrderdNum');
let OrderdNumText = document.querySelector('#OrderdNumText');


function get_values(){
    superScEle.innerHTML = '';
    let para;
    if(OrderdNumCheckBox.checked == false || OrderdNumText.value == 0){
    poly(firstNum.value, firstPower.value, secondNum.value, secondPower.value, bracketPower.value).forEach((element, index) => {
    para = document.createElement("b");
    if(element[0] != '-' && index != 0 ){
        para.innerHTML = `+ ${element}`;
    }else{
       element = element.replace('-', ' - ')
        para.innerHTML = element;
        
    }
    superScEle.appendChild(para);
 
});
}else{
    para = document.createElement("b");
    para.innerHTML =  NthElement(firstNum.value, firstPower.value, secondNum.value, secondPower.value, bracketPower.value, OrderdNumText.value);
    superScEle.appendChild(para);
}

form.reset();
OrderdNumText.style.display = "none";
}
function displayOrderdNumText(){
    if (OrderdNumCheckBox.checked == true){
        OrderdNumText.style.display = "block";
      } else {
        OrderdNumText.style.display = "none";
      }
}


calcButton.addEventListener('click', get_values);

OrderdNumCheckBox.addEventListener('click',displayOrderdNumText);


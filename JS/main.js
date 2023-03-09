let title = document.getElementById('title');
let price = document.getElementById('price');
let texas = document.getElementById('texas');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


//variables
let mood = 'create';
let selectedIndex = 0;
let dataPro  ; 
//variables

//get total
function getTotal(){
    if (price != ''){
        let result = (+price.value + +texas.value + +ads.value) - +discount.value;
        total.innerHTML = result ;
        total.style.background = '#040'
    }else{
        total.innerHTML = '' ; 
        total.style.background = '#a00d02' ;
    }
}
//create prouduct


if (localStorage.prouduct != null) {

    dataPro = JSON.parse(localStorage.prouduct)


}else{
    dataPro = [];
}



submit.onclick = function(){
    let newPro = {
        title : title.value,
        price : price.value,
        texas : texas.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
    }
    if(mood === 'create'){
        dataPro.push(newPro);
    } else {
        dataPro[selectedIndex] = newPro;
        submit.innerHTML = 'create';
        mood = 'create'
    }
    //save localStorage
    localStorage.setItem('prouduct',  JSON.stringify(dataPro))
    ClearData()
    showData() 
}


//clear inputs
function ClearData() {
    title.value = '' ;
    price.value = '' ;
    texas.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;
}


//read

function showData() 
{

    let table ='';

    for(i=0; i < dataPro.length ;i++){
      
        table += 
        `
        <tr>
            <td> ${i} </td>
            <td> ${dataPro[i].title} </td>
            <td> ${dataPro[i].price} </td>
            <td> ${dataPro[i].texas} </td>
            <td> ${dataPro[i].ads} </td>
            <td> ${dataPro[i].discount} </td>
            <td> ${dataPro[i].total} </td>
            <td> ${dataPro[i].category} </td>
            <td> ${dataPro[i].count} </td>
            <td>
                <button onclick="updateData(${i})" id="update">update</button>
                <button onclick="deleteData(${i})" id="delete">delete</button>
            </td>
        </tr>
    
        ` 
    ;
        

    }

    document.getElementById('tbody').innerHTML = table ; 
    let btnDelete = document.getElementById('deleteAll');
    
    if( dataPro.length > 0 )
    {
        btnDelete.innerHTML = 
        `
        <button onclick="deleteAll()">delete All ( ${dataPro.length}) </button>

        `
    }else {
        btnDelete.innerHTML = '' ; 
    }

}
showData()





//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll (){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}








//update
function updateData(i){
   submit.innerHTML = 'update';
   mood = 'update';
   selectedIndex = i;
   title.value = dataPro[i].title
   price.value = dataPro[i].price
   texas.value = dataPro[i].texas
   ads.value = dataPro[i].ads
   discount.value = dataPro[i].discount
   count.value = dataPro[i].count
   category.value = dataPro[i].category;
   count.style.display= 'none'
   getTotal();
}




//search
let searchMood = 'title'; 

function getSearchMood(id){

    let search = document.getElementById('search');

    if (id == 'searchTitle'){

        searchMood = 'title'; 
        search.Placeholder = 'search by title';
    }else{
        searchMood = 'category';
        search.Placeholder = 'search by category';


    }
    search.focus()
    search.value = '' ;
    showData()


   
}





function searchData(value){

    let table = '' ;

    if(searchMood == 'title'){

        for(i = 0 ; i < dataPro.length ; i++){
            
            if(dataPro[i].title.includes(value)){
                let table =  '';

                for(i=0; i < dataPro.length ;i++){
                  
                    table += 
                    `
                    <tr>
                        <td> ${i} </td>
                        <td> ${dataPro[i].title} </td>
                        <td> ${dataPro[i].price} </td>
                        <td> ${dataPro[i].texas} </td>
                        <td> ${dataPro[i].ads} </td>
                        <td> ${dataPro[i].discount} </td>
                        <td> ${dataPro[i].total} </td>
                        <td> ${dataPro[i].category} </td>
                        <td> ${dataPro[i].count} </td>
                        <td>
                            <button onclick="updateData(${i})" id="update">update</button>
                            <button onclick="deleteData(${i})" id="delete">delete</button>
                        </td>
                    </tr>
                    ` 
               
            }
        }

    }
    document.getElementById('tbody').innerHTML = table
} 
}







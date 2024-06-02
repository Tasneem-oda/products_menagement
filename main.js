onload
let title=document.querySelector('.title');
let price=document.querySelector('.price');
let taxes=document.querySelector('.taxes');
let ads=document.querySelector('.ads');
let discount=document.querySelector('.discount');
let total=document.querySelector('.total');
let count=document.querySelector('.count');
let category=document.querySelector('.category');
let create=document.querySelector('.create');
let mood='create';
let tmb;
let search=document.querySelector('.search');


function gettotal()
{
    if (price.value  != ''){
let discount=document.querySelector('.discount');
        let all= (+price.value + +taxes.value + +ads.value )- discount.value;
        total.innerHTML = all;
        total.style.background = '#040';
    }else{ total.innerHTML ='';
    total.style.background ='rgb(235, 33, 33)';}
    
}
     let newpro;
     if (localStorage.product != null){
        datapro= JSON.parse(localStorage.product);
     }else{
        datapro=[];
     }

   create.onclick = function(){
    let newpro ={
        title:title.value .toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value .toLowerCase(),
    }
    if(title.value !=''
    &&price.value !=''
    &&category.value !=''
    &&count.value <=1000000)
    {
       if(mood==='create'){
      if(newpro.count>1){
      for(let i=0;i<newpro.count;i++){
         datapro.push(newpro);
      }
    }else{datapro.push(newpro);}

    }else{  datapro[tmb] = newpro;
      mood='create';
      create.innerHTML='create';
      count.style.display='block';


   }
    cleardata();
    }
   
    localStorage.setItem('product',JSON.stringify(datapro));
     
     showdata()
    
   }
   function cleardata (){
    title.value ='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
   }
   function showdata(){
    let table ='';
    for(let i=0;i<datapro.length;i++){
       table +=`
    <tr>
         <th>${i+1}</th>
         <th>${datapro[i].title}</th>
         <th>${datapro[i].price}</th>
         <th>${datapro[i].taxes}</th>
         <th>${datapro[i].ads}</th>
         <th>${datapro[i].discount}</th>
         <th>${datapro[i].total}</th>
         <th>${datapro[i].category}</th>
         <th><button onclick='updatedata(${i})' class ='update'>update</button></th>
         <th><button onclick='deletedata(${i})' class ='delete'>delete</button></th>
         
    </tr>
       
       `
       gettotal();
   }
   document.querySelector('.tbody').innerHTML=table;
   let deletebtn =document.querySelector('.deleteall')
if (datapro.length> 0){
   deletebtn.innerHTML=`
   <button onclick ='deleteall()'>delete all (${datapro.length})</button>`
}else{
   deletebtn.innerHTML='';
}
}
showdata()
function deletedata(i){
  datapro.splice(i,1);
  localStorage.product= JSON.stringify(datapro);
 showdata()
} 

showdata();
function deleteall(){
datapro.splice(0);
localStorage.clear();
showdata()
}
function updatedata(i){
  title.value = datapro[i].title;
  price .value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  gettotal();
  count.style.display ='none';
  create.innerHTML='update';
  mood='update';
  tmb=i; 
  scroll({
  top: 0,
  behavior:"smooth", 
  });
}
let searchmood='title';

function searchdata(id)
{
  
   

   if(id=="search by title"){
      searchmood='title';
      search.placeholder='search by title';
      
   }else{
      searchmood='category';
      search.placeholder='search by category';
   }
      search.focus();
      search.value='';
      showdata();
}
function searchinput(value)
{
   let table='';
   if(searchmood=='title')
   {
      for(let i=0;i<datapro.length;i++)
      {
         if(datapro[i].title.includes(value.toLowerCase()))
         {
            table +=`
            <tr>
                 <th>${i}</th>
                 <th>${datapro[i].title}</th>
                 <th>${datapro[i].price}</th>
                 <th>${datapro[i].taxes}</th>
                 <th>${datapro[i].ads}</th>
                 <th>${datapro[i].discount}</th>
                 <th>${datapro[i].total}</th>
                 <th>${datapro[i].category}</th>
                 <th><button onclick='updatedata(${i})' class ='update'>update</button></th>
                 <th><button onclick='deletedata(${i})' class ='delete'>delete</button></th>
                 
            </tr>
               
               `
         }
      

      }

      

   }else{
      for(let i=0;i<datapro.length;i++)
      {
         if(datapro[i].category.includes(value.toLowerCase()))
         {
            table +=`
            <tr>
                 <th>${i}</th>
                 <th>${datapro[i].title}</th>
                 <th>${datapro[i].price}</th>
                 <th>${datapro[i].taxes}</th>
                 <th>${datapro[i].ads}</th>
                 <th>${datapro[i].discount}</th>
                 <th>${datapro[i].total}</th>
                 <th>${datapro[i].category}</th>
                 <th><button onclick='updatedata(${i})' class ='update'>update</button></th>
                 <th><button onclick='deletedata(${i})' class ='delete'>delete</button></th>
                 
            </tr>
               
               `
         }
      

      }

   }
   
   document.querySelector('.tbody').innerHTML=table;

}
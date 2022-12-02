const people = require("./people");
const company = require("./companies");

async function main1(){
    try{
        const a = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440")
        console.log (a);
    }catch(e){
        console.log (e);
    }
    try{
        const a = await people.sameJobTitle("Help Desk Operator"); 
        console.log (a);
    }catch(e){
        console.log (e);
    }
    try{
        const a = await people.getPostalCodes("Salt Lake City", "Utah"); 
        console.log (a);
    }catch(e){
        console.log (e);
    }
    try{
        const a = await people.sameCityAndState("SaN Diego", "California"); 
        console.log (a);
    }catch(e){
        console.log (e);
    }
}

async function main2(){
    try{
        const a = await company.listEmployees("CRUickSHAnk-torp");
        console.log(a);
    }
    catch(e){
        console.log(e);
    }
    // try{
    //     const a = await company.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
    //     console.log(a);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const a = await company.sameIndustry("apparel");
    //     console.log(a);
    // }
    // catch(e){
    //     console.log(e);
    // }
}

//main1();
main2();


const axios=require("axios");
const people=require("./people");


async function getCompanies(){
    const { data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json")
    return data;
}

const listEmployees = async (companyName) => {
    if(!companyName) { throw "No Argument passed" }
    if(typeof companyName != 'string') { throw "Invalid Argument Type passed" }
    if(companyName.trim()=="") { throw "Empty spaces passed" }
    let companyData = await getCompanies();
    let flag =0;
    for(i=0;i<companyData.length;i++){
        if(companyData[i].name==companyName){
            companyData = companyData[i];
            flag=1;
            break;
        }
    }
    if(!flag){ throw "Company not found!" }
    let result=[]
    let peopleData = await people.getPeople();
    for(i=0;i<peopleData.length;i++){
        if(peopleData[i].company_id===companyData.id){
            let res = [];
            res[0]=peopleData[i].first_name;
            res[1]=peopleData[i].last_name;
            result.push(res);
            }
    }
    result.sort((a,b)=> {   
        if(a[1]<b[1]){
            return -1;
        } 
        else if(a[1]>b[1]){
            return 1;
        }
        else if(a[1]===b[1])
        {
            return 0;
        }
    });
    finalResult=[];
    result.forEach((element)=>{
        element=element[0]+" "+element[1];
        finalResult.push(element);
    } )
    companyData.employees=finalResult;
    return companyData;
};

const sameIndustry = async (industry) => {
    if(!industry) { throw "No Argument passed" }
    if(typeof industry != 'string') { throw "Invalid Argument Type passed" }
    if(industry.trim()=="") { throw "Empty spaces passed" }
    let companyData = await getCompanies();
    let result=[];
    let count = 0;
    for(i=0;i<companyData.length;i++){
        if(companyData[i].industry.toLowerCase()==industry.toLowerCase()){
            result.push(companyData[i]);
            count++;
        }
    }
    if(count==0){
        throw "No companies in this Industry";
    }
    return result;
};

const getCompanyById = async (id) => {
    if(!id) { throw "No Argument passed" }
    if(typeof id != 'string') { throw "Invalid Argument Type passed" }
    if(id.trim()=="") { throw "Empty spaces passed" }
    let companyData = await getCompanies();
    for(i=0;i<companyData.length;i++){
        if(companyData[i].id==id){
            return companyData[i];
        }
    }
    throw "Company not found";
};

module.exports = {
    firstName: 'Naveen',
    lastName: 'Renji',
    studentId: '20016323',
    listEmployees,
    sameIndustry,
    getCompanyById
};

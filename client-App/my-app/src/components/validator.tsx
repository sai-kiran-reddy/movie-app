export function Validator (obj:any) :string[]
{
    const arr =[];
    const {firstName,LastName,email,firstPassword,secondPassword} = obj;
    if(!firstName)
    {
        arr.push('please enter first name');
    }
    if(!LastName)
    {
        arr.push('please enter last name');
    }
    if(!email)
    {
        arr.push('please enter email');
    }
    if(!firstPassword)
    {
        arr.push('please enter password');
    }
    if(!secondPassword)
    {
        arr.push('please Re enter password');
    }
    if(firstPassword !== secondPassword)
    {
        arr.push('Both passwords should match');
    }
    
    return arr;
}
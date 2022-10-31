var inputDate = document.querySelector("#input-date");
var btnShow = document.querySelector("#btn-show");
var outputMessage = document.querySelector("#output-message");

btnShow.addEventListener("click",clickHandler)

function clickHandler(event){

    var birthdayStr =  inputDate.value;
    var listOfDate = birthdayStr.split('-');
    var date = {

        day   : Number(listOfDate[2]),
        month : Number(listOfDate[1]),
        year  : Number(listOfDate[0])
    }

    var isPalindrome = cheakPalindromeForAllDates(date);

        if(isPalindrome)
        {
           outputMessage.innerText = "Your Birthday is Palindrome";
        }
    
        else 
        {
          var [noOfDays,nextDate] = getNextPalindromeDate(date);
          outputMessage.innerText = 'The next palindrome date is '+nextDate.month+'/'+nextDate.day+'/'+nextDate.year+ ' you miss it by ' +noOfDays+''+'days';

        }    
   }

function cheakPalindromeForAllDates(date){
       
    var listOfPalindromedate = getAllDateFormats(date);
    var isPalindromeflag = false;
     for(i=0; i < listOfPalindromedate.length; i++)
     {
           if(isStringPalindrome(listOfPalindromedate[i]))
           {
              isPalindromeflag=true;
              break;
           }
     }

    return isPalindromeflag;
}
   function isStringPalindrome(dateStr)
{ 
   var reverseDateStr = reverseStr(dateStr);
   return dateStr === reverseDateStr;
 }
  function reverseStr(str)
  {
  var listOfDateChar = str.split('');
  var reverseListOfChar = listOfDateChar.reverse();
  var reversedStr = reverseListOfChar.join(''); 
  return reversedStr;
}

function getAllDateFormats(date){
  
   var bdDateStr = convertDateToStr(date);
   var ddmmyyyy = bdDateStr.day+ bdDateStr.month+bdDateStr.year;
   var mmddyyyy = bdDateStr.month+bdDateStr.day+bdDateStr.year;
   var yyyymmdd = bdDateStr.year+bdDateStr.month+bdDateStr.day;
   var ddmmyy   = bdDateStr.day+ bdDateStr.month+bdDateStr.year.slice(-2);
   var mmddyy = bdDateStr.month+bdDateStr.day+bdDateStr.year.slice(-2);
   var yymmdd = bdDateStr.year.slice(-2)+bdDateStr.month+bdDateStr.day;

   return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];

}
function convertDateToStr(date){
  
    var dateStr = {day : ' ' , month : ' ' , year : ' ' };
    if(date.day < 10){
      
        dateStr.day = '0'+date.day;
    }
    else{

        dateStr.day= date.day.toString();
    }
    if(date.month < 10){
      
        dateStr.month = '0'+ date.month;
    }
    else{

        dateStr.month = date.month.toString();
    }
    if(date.year < 10){
      
        dateStr.year = '0'+ date.year;
    }
    else{

        dateStr.year= date.year.toString();
    }
   
    return dateStr; 
}


function getNextPalindromeDate(date)
{
   var noOfDays = 0;
   var nextDate = getNextDate(date);
   while(1){
   noOfDays++;   
   var isPalindrome = cheakPalindromeForAllDates(nextDate);
   if(isPalindrome)
   {
     break;
   }
   nextDate= getNextDate(nextDate);
  }

  return [noOfDays, nextDate];
}

function getNextDate(date){

    var day = date.day+1;
    var month = date.month;
    var year = date.year;    
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month === 2)
    {          
        if(isLeapYear(year))
        {
        
            if(day > 29)
            {
                
                day =1;
                month++;
            }
         
        }  
        
        else
        {

            if(day > 28)
            {
                day =1;
                month++;
            }
          
        }
     
    } 
    else 
    {
       
        if(day > daysInMonth[month-1]){
    
                day =1;
                month++;
        
            }
    }
 

    if(month > 12) {

        month =1;
        year++;
    }

    return {
        day :day ,
        month : month,
        year : year
    }
    
}

function isLeapYear(year){
    
    if( year %  400 === 0 && year %  100 === 0){
    
        return false;
    }
    if( year %  4 === 0 ){
     return true;
    }
    return false;

 }

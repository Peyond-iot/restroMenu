import { useEffect, useState } from "react";

interface BillProps{
  menuList: any
}

const GenerateBill: React.FC<BillProps> = ({ menuList }) =>{

   const [orderedData, setData] = useState<any>([]);

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);


   const fetchOrderedData = async () => {
     try {
       const response = await fetch(
         "https://backend-nwcq.onrender.com/api/orders"
       );
       if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       const result = await response.json();
       setData(result); // Update the state after filtering
     } catch (error: any) {
       setError(error?.message);
     } finally {
       setLoading(false);
     }
   };

   useEffect(() => {
     // Fetch Menu Data from API
     fetchOrderedData();
     // Clean up the event listener when the component unmounts
     return () => {};
   }, []);

   let geSortedData = (data: any) => {
     // Filter the data using the API response directly
     const filterData = data?.filter(
       (item: any) => item.tableNumber === menuList[0]?.tableNo
     );


    // let tax = (amount * 10) / 100;
    // setTaxAmount(tax);

    // let totalAmount = amount + tax;
    // setTaxableAmount(totalAmount);

     return filterData || []; // Access orderItems if filteredData exists
   };

   let getTotal = (price: number, count: number) =>{
    return (price*count);
   } 
   
  let getTotalAmount = (item:any) =>{
    let amount = item?.orderItems?.reduce((sum: any, item: any) => sum + (item.price*item?.quantity), 0);
    return amount;
  }

  let getTaxAmount = (item: any) =>{
    let amount = item?.orderItems?.reduce((sum: any, item: any) => sum + (item.price*item?.quantity), 0);
    let tax = (amount*10) / 100;

    return tax
  }

  let getTaxableAmount = (item: any) =>{
    let amount = item?.orderItems?.reduce((sum: any, item: any) => sum + (item.price*item?.quantity), 0);
    let tax = (amount*10) / 100;
    let totalAmount = amount + tax;

    return totalAmount
  }

  function getWordAmount(item: any): string {
    let amount = getTaxableAmount(item);

    const nepaliNumbers = [
      "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    ];
    const nepaliTens = [
      "", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninty",
    ];
    const nepaliHundreds = "hundred";
    const nepaliThousands = "thousand";
    const nepaliLakhs = "lakh";
    const nepaliCrores = "crore";
  
    const getNepaliNumber = (num: number): string => {
      if (num < 10) return nepaliNumbers[num];
      if (num < 100) {
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        return nepaliTens[tens] + (ones ? " " + nepaliNumbers[ones] : "");
      }
      return "";
    };
  
    const splitAmount = amount.toFixed(2).split("."); // Split rupees and paisa
    const rupees = parseInt(splitAmount[0]);
    const paisa = parseInt(splitAmount[1]);
  
    let words = "";
  
    if (rupees > 0) {
      const crores = Math.floor(rupees / 10000000);
      const lakhs = Math.floor((rupees % 10000000) / 100000);
      const thousands = Math.floor((rupees % 100000) / 1000);
      const hundreds = Math.floor((rupees % 1000) / 100);
      const remainder = rupees % 100;
  
      if (crores > 0) words += getNepaliNumber(crores) + " " + nepaliCrores + " ";
      if (lakhs > 0) words += getNepaliNumber(lakhs) + " " + nepaliLakhs + " ";
      if (thousands > 0) words += getNepaliNumber(thousands) + " " + nepaliThousands + " ";
      if (hundreds > 0) words += nepaliNumbers[hundreds] + " " + nepaliHundreds + " and" + " ";
      if (remainder > 0) words += getNepaliNumber(remainder) + " ";
      words += "rupees ";
    }
  
    if (paisa > 0) {
      words += " and" + getNepaliNumber(paisa) + " paisa";
    }
  
    return words.trim();
  }
  

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;

    return(
        <div className="p-4">
          {orderedData && geSortedData(orderedData).map((item: any)=>
            <div>
              <div className="mb-4">
                  <h2 className='text-red-500 font-bold text-2xl font-serif mb-2'>Order Details</h2>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Restaurant Name : </h2><p >{item?.restaurantName}</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Restaurant Address : </h2><p>Address</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Invoice No. : </h2><p>{item.orderNO}</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Invoice Date. : </h2><p>{new Date(item?.placedAt).toLocaleDateString()}</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Table No. : </h2><p>{item?.tableNumber}</p></div>
              </div>
              <div className='w-full bg-white rounded-lg shadow-red border-red-500 border-1 p-4 mb-6'>
                <table className="table-auto text-left w-full border-separate">
                    <thead className="text-red-500">
                      <tr>
                        <th className="w-[50%] text-left">Item</th>
                        <th className="w-[25%] text-center">Quantity</th>
                        <th className="w-[25%] text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="text-xl">
                      {item?.orderItems?.map((item: any) => (
                        <tr key={item.name}>
                          <td className="font-mono truncate overflow-hidden">{item?.name}</td>
                          <td className="flex items-center justify-center">
                            <img className="w-2 h-2 mr-1" src="/assets/cross.svg" alt="cross" />
                            <span>{item?.quantity}</span>
                          </td>
                          <td className="text-right">{getTotal(item?.price, item?.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='border-t-2 mt-2 pt-2 border-red-500'>
                    <div className='text-xl flex justify-between'>
                      <div className='flex flex-col gap-2'>
                        <div>Total</div>
                        <div>Taxes(10%)</div>
                        <div className='font-bold text-red-500'>Taxable Amount</div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className="text-right">{getTotalAmount(item)}</div>
                        <div className="text-right">{getTaxAmount(item)}</div>
                        <div className="text-right font-bold">{getTaxableAmount(item)}</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="flex flex-row mt-6 justify-center"><h2 className="font-bold font-mono w-[60%]">Amount(in words): </h2><p className="w-[80%] capitalize font-bold font-mono">{getWordAmount(item)} </p></div>
            </div>)}
        </div>
    )
}

export default GenerateBill;
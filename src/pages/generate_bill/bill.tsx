import { useEffect, useState } from "react";

interface BillProps{
  menuList: any
}

const GenerateBill: React.FC<BillProps> = ({ menuList }) =>{

   const [orderedData, setData] = useState<any>([]);

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const [showBill, setBillShow] = useState<boolean>();

   const [noOfPeople, setNumber] = useState<number>(); 
   const [splittedAmount, setSplittingAmount] = useState<any>(); 

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNumber(Number(event.target.value)); // Update state on input change
    };


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

   let getSortedData = (data: any) => {
     // Filter the data using the API response directly
     const filterData = data?.filter(
       (item: any) => item.tableNumber === menuList[0]?.tableNo
     );
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
      if (hundreds > 0) words += nepaliNumbers[hundreds] + " " + nepaliHundreds + " and ";
      if (remainder > 0) words += getNepaliNumber(remainder) + " ";
      words += "rupees ";
    }
  
    if (paisa > 0) {
      words += " and" + getNepaliNumber(paisa) + " paisa";
    }
  
    return words.trim();
  }

  let isCartData = (): boolean =>{
    if(sessionStorage.getItem('cartData')){
      return true
    }else{
      return false
    }
  }

  let isData = (data: any) : boolean =>{
    // Filter the data using the API response directly
    const filterData = data?.filter(
      (item: any) => item.tableNumber === menuList[0]?.tableNo
    );
    if (filterData.length) {
      return true;
    } else {
      return false;
    }
  }

  let splitBill = (item: any, noOfPeople: any) => {
    const total = getTaxableAmount(item);
    setBillShow(true)
      // Calculate the rounded down share for each person
    const sharePerPerson = Math.floor(total / noOfPeople);

    // Calculate the remainder that needs to be distributed
    const remainder = total % noOfPeople;

    // Create an array to store the amounts
    const splitAmounts = new Array(noOfPeople).fill(sharePerPerson);

    // Distribute the remainder among the first few people
    for (let i = 0; i < remainder; i++) {
      splitAmounts[i] += 1;
    }

    setSplittingAmount(splitAmounts[0])
  }
  

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;

    return(
        <div className="p-6 font-serif lg:flex lg:justify-center">
          {orderedData && isData(orderedData) && getSortedData(orderedData).map((item: any)=>
            <div>
              <div className="mb-4">
                  <h2 className='text-red-500 font-bold text-2xl font-serif mb-2'>Order Details</h2>
                  {/* <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Restaurant Name : </h2><p >{item?.restaurantName}</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Restaurant Address : </h2><p>Address</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Invoice No. : </h2><p>{item.orderNO}</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Invoice Date. : </h2><p>{new Date(item?.placedAt).toLocaleDateString()}</p></div>
                  <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Table No. : </h2><p>{item?.tableNumber}</p></div> */}
              </div>
              <div className='w-full bg-white rounded-lg shadow-red border-red-500 border-1 p-4 mb-6'>
                <table className="table-auto text-left w-full border-separate font-serif">
                    <thead className="text-red-500 ">
                      <tr>
                        <th className="w-[50%] text-left">Item</th>
                        <th className="w-[25%] text-center">Quantity</th>
                        <th className="w-[25%] text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="text-xl">
                      {item?.orderItems?.map((item: any) => (
                        <tr key={item.name}>
                          <td className="font-mono max-w-[150px] lg:max-w-full text-lg truncate overflow-hidden">{item?.name}</td>
                          <td className="flex items-center text-lg justify-center">
                            <img className="w-2 h-2 mr-1" src="/assets/cross.svg" alt="cross" />
                            <span>{item?.quantity}</span>
                          </td>
                          <td className="text-right text-lg tracking-[1px]">{getTotal(item?.price, item?.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='border-t-2 mt-2 pt-2 border-red-500'>
                    <div className='text-lg flex justify-between'>
                      <div className='flex flex-col gap-2'>
                        <div>Total</div>
                        <div>Taxes(10%)</div>
                        <div className='font-bold text-red-500'>Taxable Amount</div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className="text-right tracking-[1px]">{getTotalAmount(item).toFixed(2)}</div>
                        <div className="text-right tracking-[1px]">{getTaxAmount(item).toFixed(2)}</div>
                        <div className="text-right font-bold tracking-[1px]">{getTaxableAmount(item).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="flex flex-col mt-6 justify-center lg:text-xl"><h2 className="w-[1/2]">Amount (in words): </h2><p className="w-[1/2] capitalize">{getWordAmount(item)} </p></div>

              <div className="mt-6">
              <h2 className='text-red-500 font-bold text-2xl'>Want to split the bill?</h2>
                <div className='font-bold flex flex-row gap-2 justify-between items-center lg:mx-2'>
                  <h5 className="w-80%">Number of friends splitting bill: </h5>
                  <input type="number" className="w-[20%] p-2 border-2 rounded-lg"
                    name="numberOfPeople"
                    id="numberOfPeople"
                    value={noOfPeople}
                    onChange={handleChange}
                    min="2"
                    step="1"
                   />
                </div>
                <div className="flex flex-col gap-4 justify-center mt-4">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => {
                        splitBill(item, noOfPeople);
                      }}
                      className="w-[50%] mb-2 bg-red-500 text-white py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                      <div className="flex items-center justify-center">
                        <img src="assets/split.svg" className="w-6 h-6" alt="Empty Cart"/>
                        <span className="ml-2">Split</span>
                      </div>
                    </button>
                  </div>
                  {showBill && <div>Each person will pay <span className="text-red-500 text-lg font-bold tracking-[1px]">{splittedAmount.toFixed(2)}</span>, bringing the total to <span className="text-red-500 font-bold tracking-[1px] text-lg">{getTaxableAmount(item).toFixed(2)}.</span></div>}
                </div>
              </div>
            </div>)}

          {orderedData && !isData(orderedData) && 
            <div className="flex flex-col items-center justify-center h-screen">
              <img src='assets/bill.svg' className='w-12 h-12' alt='Empty Cart'/>
              <h1 className="text-2xl font-bold mb-4 font-serif">No Orders Found!</h1>
              <div className="w-full text-base leading-relaxed text-center mb-4 text-red-500">
                  Looks like you haven't <br/> made your order yet.
              </div>
              <div className="flex flex-row gap-2">
                <button 
                    onClick={() => window.location.href = '/'}
                    className=" mb-2 bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                    <div className="flex items-center justify-center">
                        <img src="assets/menu.svg" className="w-6 h-6" alt="Empty Cart"/>
                        <span className="ml-2">Browse Menu</span>
                    </div>
                </button>
                {isCartData() && <button 
                    onClick={() => window.location.href = '/cart'}
                    className=" mb-2 bg-white text-red-500 py-2 px-4 rounded-md hover:border-red-700 hover:text-red-700 transition duration-300 border border-red-500">
                    <div className="flex items-center justify-center">
                        <img src="assets/cart.svg" className="w-6 h-6" alt="Empty Cart"/>
                        <span className="ml-2">Go to Cart</span>
                    </div>
                </button>}
              </div>
            </div>
          }
        </div>
    )
}

export default GenerateBill;
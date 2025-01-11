function GenerateBill(){
    return(
        <div className="p-4">
            <div className="mb-4">
                <h2 className='text-red-500 font-bold text-2xl font-serif mb-2'>Order Details</h2>
                <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Restaurant Name : </h2><p >Name</p></div>
                <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Restaurant Address : </h2><p>Address</p></div>
                <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Invoice No. : </h2><p>24IUW78DF021</p></div>
                <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Invoice Date. : </h2><p>20/12/2024</p></div>
                <div className="flex flex-row gap-2"><h2 className="font-bold font-mono">Table No. : </h2><p>2</p></div>
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
                    {/* {cartData.map((item: any) => (
                      <tr key={item.title}>
                        <td className="font-bold overflow-hidden">{item?.title}</td>
                        <td className="flex items-center justify-center">
                          <img className="w-2 h-2 mr-1" src="/assets/cross.svg" alt="cross" />
                          <span>{item?.count}</span>
                        </td>
                        <td className="text-right">{item?.priceUpdated}</td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
                <div className='border-t-2 mt-2 pt-2 border-red-500'>
                  <div className='text-xl flex justify-between'>
                    <div className='flex flex-col gap-2'>
                      <div>Total</div>
                      <div>Taxes(10%)</div>
                      <div className='font-bold text-red-500'>Taxable Amount</div>
                    </div>
                    {/* <div className='flex flex-col gap-2'>
                      <div className="text-right">{totalAmount}</div>
                      <div className="text-right">{taxAmount}</div>
                      <div className="text-right">{taxableAmount}</div>
                    </div> */}
                  </div>
                </div>
            </div>
            <div className="flex flex-row mt-6 gap-2"><h2 className="font-bold font-mono w-[65%]">Amount(in words): </h2><p>Two thousand Two Hundred And Forty Rupees Only </p></div>
        </div>
    )
}

export default GenerateBill;
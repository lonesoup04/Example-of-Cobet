import React , { useState, useEffect } from 'react'
import Withdraw from './Withdraw';


function DepositPage() {
    const [walletAddress, setWalletAddress] = useState('');
    const [copyMessage, setCopyMessage] = useState('');
    const [balance, setBalance] = useState('0.00');
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false); // 控制模态框显示

    useEffect(() => {
        const storedAddress = localStorage.getItem('walletAddress'); // 假设登录后存储了钱包地址
        const storedBalance = localStorage.getItem('usdtBalance'); // 假设登录后存储了钱包余额
        setWalletAddress(storedAddress);
        setBalance(storedBalance);
      }, []);
    
    const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopyMessage('Copied!');
      setTimeout(() => setCopyMessage(''), 2000); // 2秒后隐藏提示
    }
  };

    const handleTransactionComplete = (updatedBalance) => {
      setBalance(updatedBalance);
      localStorage.setItem('usdtBalance', updatedBalance); // 更新本地缓存
    };
    
  return (
    <div className="flex flex-wrap justify-between p-6 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* 左侧存款信息 */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold mb-6">Deposit USDT (Optimism)</h1>
        
        {/* 存款步骤说明 */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="font-semibold text-blue-700">Easiest Method • 1 Minute • Free</p>
          <ol className="list-decimal ml-4 mt-2 space-y-2 text-gray-700">
            <li>
              Buy USDT on <a href="#coinbase" className="text-blue-600 hover:underline">Coinbase</a>, 
              Binance or another exchange.
            </li>
            <li>
              Send/withdraw USDT to the address below and select <strong>Optimism</strong> as the network.
            </li>
          </ol>
        </div>

        {/* 钱包地址和复制功能 */}
        <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md space-x-4">
          <input
            type="text"
            value={walletAddress}
            readOnly
            className="flex-1 text-gray-700 bg-transparent outline-none"
          />
          <button
            onClick={handleCopyAddress}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
        {copyMessage && <p className="text-green-500 text-sm mt-2">{copyMessage}</p>}
      </div>

      {/* 右侧余额和教程 */}
      <div className="w-full lg:w-1/3 space-y-6">
        {/* 用户余额 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Balance</h2>
          <p className="text-gray-700 text-xl font-bold mb-2">${balance}</p>
          <div className="flex space-x-4">
            {/* 打开模态框 */}
            <button onClick={() => setIsWithdrawOpen(true)} 
            className="text-blue-600 hover:underline">
              Withdraw
            </button>
            <button className="text-blue-600 hover:underline">Claim</button>
          </div>
        </div>

        {/* 教程链接 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Tutorials</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><a href="#coinbase" className="text-blue-600 hover:underline">Coinbase</a></li>
            <li><a href="#eth" className="text-blue-600 hover:underline">ETH</a></li>
            <li><a href="#no-crypto" className="text-blue-600 hover:underline">I don't have any crypto</a></li>
          </ul>
        </div>
      </div>
      {/* 提现模态框 */}
      {isWithdrawOpen && (
        <Withdraw
          walletAddress={walletAddress}
          onClose={() => setIsWithdrawOpen(false)}
          maxAmount={balance}
          onTransactionComplete={handleTransactionComplete}
        />
      )}
    </div>

  )
}

export default DepositPage
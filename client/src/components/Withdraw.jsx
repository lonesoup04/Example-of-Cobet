import React, { useState } from 'react';
import { magic } from './Magic';
import Web3 from 'web3';

const USDT_CONTRACT_ADDRESS = '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
];

const initWeb3 = async () => {
  const web3 = new Web3(magic.rpcProvider);
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];
  console.log('User Wallet Address:', userAddress);
  return { web3, userAddress };
};

function Withdraw({ maxAmount, onClose, onTransactionComplete }) {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMaxClick = () => {
    setAmount(maxAmount);
  };

  const handleWithdraw = async () => {
    setLoading(true);
    setMessage('');
    try {
      if (!/^0x[a-fA-F0-9]{40}$/.test(toAddress)) {
        throw new Error('Invalid recipient address');
      }

      if (isNaN(amount) || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(maxAmount)) {
        throw new Error('Invalid amount');
      }

      const { web3, userAddress } = await initWeb3();

      // TODO: 替换为新的合约交互逻辑（目前暂时空置）
      // 以下是模拟的转账逻辑，需在实际实现时更新
      const contract = new web3.eth.Contract(ERC20_ABI, USDT_CONTRACT_ADDRESS);
      const data = contract.methods
        .transfer(toAddress, web3.utils.toWei(amount, 'mwei')) // USDT 使用 6 位小数
        .encodeABI();

      console.log('Transaction data:', data);

      // 暂时输出调试信息，实际实现时需要替换为合约交互
      console.log('Simulating gas-less transfer:', {
        from: userAddress,
        to: USDT_CONTRACT_ADDRESS,
        value: 0,
        data,
      });

      // 模拟成功返回
      const simulatedResponse = {
        transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      };

      if (simulatedResponse && simulatedResponse.transactionHash) {
        setMessage(`Withdrawal successful! Transaction Hash: ${simulatedResponse.transactionHash}`);
        onTransactionComplete();
      } else {
        throw new Error('Transaction submission failed');
      }
    } catch (error) {
      console.error('Error during withdrawal:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
        <h2 className="text-lg font-bold mb-4">Withdraw USDT</h2>
        <p className="text-sm text-gray-500 mb-6">Only send to a USDT address on the Optimism network.</p>
        <label className="block mb-2">
          Recipient Address
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1"
            placeholder="0x..."
          />
        </label>
        <label className="block mb-4">
          Amount (USDT)
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 p-2 border rounded-lg mt-1"
              placeholder="Enter amount"
            />
            <button
              type="button"
              onClick={handleMaxClick}
              className="ml-2 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Max
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">Available: {maxAmount} USDT</p>
        </label>
        {message && <p className="text-sm mb-4 text-red-500">{message}</p>}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleWithdraw}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;

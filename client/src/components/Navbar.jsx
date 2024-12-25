import React, { useState, useEffect } from 'react'
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { AiFillAppstore } from 'react-icons/ai';
import { magic } from './Magic';
import Login from './Login';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

// USDT 合约地址（optimism）
const USDT_CONTRACT_ADDRESS = '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
// ERC-20 标准 ABI
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [balance, setBalance] = useState({ portfolio: 0, cash: 0 });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 控制登录 Modal 显示
    const [loginMode, setLoginMode] = useState("login");
    const [walletAddress, setWalletAddress] = useState(null);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const [copyMessage, setCopyMessage] = useState(''); // 用于显示复制提示
    const navigate = useNavigate();

    // 初始化：检查 localStorage 并恢复登录状态
    useEffect(() => {
        const storedAddress = localStorage.getItem('walletAddress');
        // const storedBalance = localStorage.getItem('usdtBalance');
        if (storedAddress) {
            setIsLoggedIn(true);
            setWalletAddress(storedAddress);
            fetchUSDTBalance(storedAddress)
        }
    }, []);

      // 查询 USDT 余额
  const fetchUSDTBalance = async (address) => {
    try {
      const web3 = new Web3('https://mainnet.optimism.io');
      const contract = new web3.eth.Contract(ERC20_ABI, USDT_CONTRACT_ADDRESS);
      const balance = await contract.methods.balanceOf(address).call();
      const usdtBalance = web3.utils.fromWei(balance, 'mwei'); // 转换为 USDT 格式（6 位小数）
      setBalance((prev) => ({ ...prev, cash: usdtBalance }));
      localStorage.setItem('usdtBalance', usdtBalance);
    } catch (error) {
      console.error('Failed to fetch USDT balance:', error);
    }
  };

     // 登录成功后的回调
    const handleLoginSuccess = async() => {
        try{
            const userMetadata = await magic.user.getMetadata();
            const address = userMetadata.publicAddress;
            setIsLoggedIn(true);
            setIsDropdownOpen(false);
            setIsLoginModalOpen(false); // 登录成功后关闭 Modal
            setWalletAddress(address);
            // 保存到 localStorage 以便刷新页面后状态保持
            localStorage.setItem('walletAddress', address);
            // 登录后立即查询 USDT 余额
            fetchUSDTBalance(address);
        }
        catch (error) {
            console.error("Failed to retrieve user metadata:", error);
        }
        
    };

    // 处理地址复制功能
    const handleCopyAddress = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setCopyMessage('Copied!');
            setTimeout(() => setCopyMessage(''), 2000); // 2秒后隐藏提示
        }
    };

    // 地址缩写显示
    const getShortAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    // 退出登录方法
    const handleLogout = async () =>{
        await magic.user.logout();
        setIsLoggedIn(false);
        setWalletAddress(null);
        // 清除 localStorage 中的登录信息
        setBalance({ portfolio: 0, cash: 0}); // 清空余额
        localStorage.removeItem('walletAddress');
    };

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
          {/* 左侧 Logo 和网站名 */}
          <Link 
          to={`/`}  className="flex items-center space-x-3">
          <AiFillAppstore className="text-2xl" />
          <span className="text-xl font-semibold">Cobet</span>
        </Link>
          {/* <div className="flex items-center space-x-3">
            <AiFillAppstore className="text-2xl" />
            <span className="text-xl font-semibold">Cobet</span>
          </div> */}
    
          {/* 中间搜索框 */}
          <div className="flex items-center bg-gray-100 p-2 rounded-full w-1/3">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search markets"
              className="bg-transparent outline-none w-full"
            />
          </div>
    
          {/* 右侧菜单和用户信息 */}
          <div className="flex items-center space-x-6">
            {/* 菜单项 */}
            <div className="flex space-x-4">
              <span className="text-gray-700 hover:text-black cursor-pointer">Markets</span>
              <span className="text-gray-700 hover:text-black cursor-pointer">Sports</span>
              <span className="text-gray-700 hover:text-black cursor-pointer">Activity</span>
              <span className="text-gray-700 hover:text-black cursor-pointer">Ranks</span>
            </div>

            {/* 登录状态条件渲染 */}
            {isLoggedIn ? (
              // 已登录显示的内容：账户余额、通知、用户图标和下拉菜单
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-semibold">${balance.portfolio.toFixed(2)}</span>
                  <span className="text-green-500 font-semibold">${balance.cash}</span>
                </div>
                {/* Deposit 按钮 */}
                <button
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                  onClick={() => navigate('/deposit')}
                >
                  Deposit
                </button>
                <FaBell className="text-gray-500 cursor-pointer" />
                <div className="relative">
                  <FaUserCircle
                    className="text-gray-500 cursor-pointer text-2xl"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                      <Link 
                        to={`/user/:id`}  className="px-4 py-2 text-sm text-gray-800">
                        Soup0401
                      </Link>
                      <p 
                        className="px-4 py-2 text-sm text-gray-500"
                        onClick={handleCopyAddress}
                        title='Click to Copy'
                      > 
                        {walletAddress ? getShortAddress(walletAddress) : ''} {/* 地址缩写显示 */}
                      </p>
                      {copyMessage && (
                                        <p className="px-4 py-2 text-xs text-green-500">{copyMessage}</p>
                                    )}
                      <hr className="my-2" />
                      <Link 
                        to={`/user/:id`}  href="#profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                        Profile
                      </Link>
                      <a href="#settings" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Settings</a>
                      <button 
                        onClick={handleLogout} 
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        >Logout
                        </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                        setIsLoginModalOpen(true);
                        setLoginMode("login");
                    }}
                    className="bg-gray-100 text-blue-600 px-4 py-2 rounded-full hover:bg-gray-200"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => {
                        setIsLoginModalOpen(true);
                        setLoginMode("signup");
                    }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                    Sign Up
                  </button>
                </div>
              )}
          </div>
          {/* 登录 Modal */}
          <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
            <Login onLoginSuccess={handleLoginSuccess} mode={loginMode} />
          </Modal>
        </nav>
    );
}


export default Navbar
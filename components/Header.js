import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import ethLogo from '../assets/eth.png'
import logo from '../assets/logo.png'
import ethCurrency from '../assets/ethCurrency.png'
import { TransactionContext } from '../context/TransactionContext'

const style = {
    wrapper: `p-4 w-screen flex justify-center items-center`,
    headerLogo: `flex w-1/4 items-center justify-start`,
    nav: `flex-1 flex justify-center items-center`,
    navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
    navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold cursor-pointer`,
    activeNavItem: `bg-[#0B5576] rounded-3xl`,
    buttonsContainer: `flex w-1/4 justify-end items-center`,
    button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-sm font-semibold cursor-pointer`,
    buttonPadding: `p-2.5`,
    buttonTextContainer: `h-8 flex items-center`,
    buttonIconContainer: `flex items-center justify-center w-8`,
}

const Header = () => {
    const [ selectedNav, setSelectedNav ] = useState( 'swap' )
    
    const { connectWallet, currentAccount } = useContext( TransactionContext )
    const [ userName, setUserName ] = useState()
    
    useEffect( () => {
        if( !currentAccount ) return
        setUserName(`${currentAccount.slice(0, 5)}...${currentAccount.slice(currentAccount.length - 5)}`)
    }, [currentAccount])
    
    console.log({connectWallet, currentAccount})
    
    return (
        <div className={style.wrapper}>
            <div className={style.headerLogo}>
                <Image src={logo} alt='logo' height={30} width={45}/>
            </div>
            <div className={style.nav}>
                <div className={ style.navItemsContainer }>
                    <div
                        onClick={ () => setSelectedNav( 'swap' ) }
                        className={`${ style.navItem } ${selectedNav === 'swap' && style.activeNavItem}`} 
                    >
                        Swap
                    </div>
                    <div
                        onClick={ () => setSelectedNav( 'pool' ) }
                        className={`${ style.navItem } ${selectedNav === 'pool' && style.activeNavItem}`} 
                    >
                        Pool
                    </div>
                    <div
                        onClick={ () => setSelectedNav( 'vote' ) }
                        className={`${ style.navItem } ${selectedNav === 'vote' && style.activeNavItem}`} 
                    >
                        Vote
                    </div>
                </div>
            </div>
            <div className={ style.buttonsContainer }>
                <div className={`${style.button} ${style.buttonPadding}`}>
                    <div className={style.buttonIconContainer}>
                        <Image src={ ethLogo } alt="eth logo" height={ 20 } width={ 20 }/>
                    </div>
                    <p>Ethereum</p>
                    <div>
                        <AiOutlineDown/>
                    </div>
                </div>
                { currentAccount ? (
                    <div
                    onClick={ () => connectWallet() }
                    className={`${style.button} ${style.buttonPadding}`}
                >
                    <div className={`${style.buttonAccent} ${style.buttonPadding} my-[-0.6rem]`}>
                            {userName}
                            {/* hello */}
                    </div>
                </div>
                ) : (
                    <div
                    onClick={ () => connectWallet() }
                    className={`${style.button} ${style.buttonPadding}`}
                >
                    <div className={`${style.buttonAccent} ${style.buttonPadding} my-[-0.6rem]`}>
                        Connect Wallet
                    </div>
                </div>
                )}
                
                <div className={ `${ style.button } ${ style.buttonPadding }` }>
                    <div className={ `${style.buttonIconContainer}` }>
                        <HiOutlineDotsVertical/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
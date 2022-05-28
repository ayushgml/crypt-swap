import React, { useState, useEffect } from 'react'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'


export const TransactionContext = React.createContext()

let eth

if(typeof window !== 'undefined') {
    eth = window.ethereum
}

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider( eth )
    const signer = provider.getSigner()
    return transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    )
}

export const TransactionProvider = ( { children } ) => {
    const [ currentAccount, setCurrentAccount ] = useState()
    const [ isLoading, setIsLoading ] = useState( false )
    const [ formData, setFormData ] = useState( {
        address: '',
        amount: '',
    })

    useEffect( () => {
        checkIfWalletIsConnected()
    },[])
    
    const connectWallet = async ( metamask = eth ) => {
        try {
            if ( !metamask )
                return alert( 'Metamask is not installed. Please Install it!' )
            
            const accounts = await metamask.request( { method: 'eth_requestAccounts' } )
            setCurrentAccount( accounts[0] )
        } catch (error) {
            console.error( error )
            throw new Error('No ethereum object found')
        }
    }

    const checkIfWalletIsConnected = async ( metamask = eth ) => {
        try {
            if ( !metamask )
                return alert( 'Metamask is not installed. Please Install it!' )
            
            const accounts = await metamask.request( { method: 'eth_accounts' } )
            if ( accounts.length ) {
                setCurrentAccount( accounts[ 0 ] )
                console.log( 'Wallet is already connected' )
            }
        } catch (error) {
            console.error( error )
            throw new Error('No ethereum object found')
        }
    }

    const sendTransaction = async ( metamask = eth, connectedAccount = currentAccount ) => {
        try {
            if ( !metamask )
                return alert( 'Metamask is not installed. Please Install it!' )
            
            const [ addressTo, amount ] = formData
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther( amount )

            await metamask.request( {
                method: 'eth_sendTransaction',
                params: [ {
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x7EF40',
                    value: parsedAmount._hex,
                }]
            } )
            
            const transactionHash = await transactionContract.publishTransaction(
                addressTo,
                parsedAmount,
                `Transfering ${ parsedAmount } ETH to ${ addressTo }`,
                'TRANSFER'
            )

            setIsLoading( true )

            await transactionHash.wait()

            await saveTransaction(
                transactionHash.hash,
                amount,
                connectedAccount,
                addressTo
            )

            setIsLoading( false )
        } catch (error) {
            console.error( error )
            throw new Error('No ethereum object found')
        }
    }
    
    const handleChange = ( e, name ) => {
        setFormData( ( prevState ) => ( {
            ...prevState, [name]: e.target.value
        }))
    }

    return (
        <TransactionContext.Provider
            value = { {
                currentAccount,
                connectWallet,
                sendTransaction,
                handleChange,
                formData,
            } }
        >
            {children}
        </TransactionContext.Provider>
    )
}


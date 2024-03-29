import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import './list-crypto-price.css'

const Test = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coinlore.net/api/tickers/');
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                // Schedule next fetch after 10 seconds
                setTimeout(fetchData, 10000);
            }
        };

        fetchData(); // Initial fetch

        // Cleanup function
        return () => clearTimeout(fetchData)
    }, []);

    return (
        <>
            <h2 className='text-center mt-8 text-[28px] font-bold text-white'>قیمت لحظه ای کریپتو</h2>
            <div className='w-[900px] m-auto my-14 max-[600px]:w-[450px] max-[400px]:w-[350px]' >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="sticky table">
                        <TableHead className='bg-gray-100' style={{
                            marginBottom: '100px',
                            position: 'sticky',
                            top: '0',
                            zIndex: '999',
                        }}>
                            <TableRow >
                                <TableCell className='name-col' style={{ fontSize: '17px', fontWeight: '600', paddingRight: '30px' }} align="right">نام رمز ارز</TableCell>
                                <TableCell className='price-col' style={{ fontSize: '17px', fontWeight: '600' }} align="center">قیمت</TableCell>
                                <TableCell className='hideOnSmallScreen' style={{ fontSize: '17px', fontWeight: '600' }} align="center">تغییرات 1 ساعته</TableCell>
                                <TableCell className='oneday-col' style={{ fontSize: '17px', fontWeight: '600' }} align="center">تغییرات 1 روزه</TableCell>
                                <TableCell className='hideOnSmallScreen' style={{ fontSize: '17px', fontWeight: '600' }} align="center">حجم معاملات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Render table rows based on 'data' state */}
                            {data.slice(0, 150).map((crypto, index) => (
                                <TableRow key={crypto.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell
                                        className='name-col'
                                        style={{
                                            fontWeight: '600',
                                        }}
                                        component="th" scope="row">
                                        <div className='flex'>
                                            <h3 className='ml-3'>{index + 1}</h3>
                                            <div className='flex'>
                                                <h3>{crypto.symbol} / </h3>
                                                <h2 className='text-[#8c8d8f] mx-[5px]'>USDT</h2>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell
                                        className='price-col'
                                        style={{ fontWeight: '600' }}
                                        align="center">{crypto.price_usd} $
                                    </TableCell>

                                    <TableCell className='hideOnSmallScreen' align="center">
                                        <div style={{
                                            width: '80px',
                                            backgroundColor: crypto.percent_change_1h[0] === '-' ? '#ea3943' : '#16c784',
                                            padding: '8px 0px ',
                                            display: "flex",
                                            justifyContent: 'center',
                                            borderRadius: '5px',
                                            color: "white"
                                        }}>
                                            {crypto.percent_change_1h} %
                                        </div>
                                    </TableCell>

                                    <TableCell
                                        className='oneday-col'
                                        align="center">
                                        <div style={{
                                            width: '80px',
                                            backgroundColor: crypto.percent_change_24h[0] === '-' ? '#ea3943' : '#16c784',
                                            padding: '8px 0px ',
                                            display: "flex",
                                            justifyContent: 'center',
                                            borderRadius: '5px',
                                            color: "white"
                                        }}>
                                            {crypto.percent_change_24h} %
                                        </div>
                                    </TableCell>

                                    <TableCell className='hideOnSmallScreen' align="center" style={{
                                        fontWeight: "600"
                                    }}
                                    >{crypto.market_cap_usd} <h3 style={{ color: '#4d4d4d', fontWeight: "500" }}>{crypto.symbol}</h3></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default Test;
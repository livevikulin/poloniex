import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import Popup from "../components/Modal";

type DataItemValueType = {
    baseVolume: string,
    high24hr: string,
    highestBid: string,
    id: number,
    isFrozen: string,
    last: string,
    low24hr: string,
    lowestAsk: string,
    marginTradingEnabled: string,
    percentChange: string,
    postOnly: string,
    quoteVolume: string
};

export type DataItemType = [string, DataItemValueType];

const Quotes = () => {
    const [ quotes, setQuotes ] = useState({});
    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);
    const [ info, setInfo ] = useState<DataItemType | undefined>();

    const url: string = "https://poloniex.com/public?command=returnTicker";
    const fetchQuotes = async (): Promise<void> => {
        try {
            const response = await fetch(url);
            const result: object = await response.json();
            setIsLoaded(false);
            setQuotes(result);
        } catch (error: any ) {
            setError(error.message);
            console.error(error.message);
        }
    };

    const updateFetch: React.MutableRefObject<any> = useRef();

    useEffect((): () => void => {
        fetchQuotes();
        updateFetch.current = setInterval(() => {
            fetchQuotes();
        }, 5000);

        return () => clearInterval(updateFetch.current);
    }, []);

    const handleShowPopup = (item: DataItemType) => {
        setInfo(item);
        setShowModal(true);
        clearInterval(updateFetch.current);
    };

    const handleClosePopup = () => {
        setShowModal(false);
        updateFetch.current = setInterval(() => {
            fetchQuotes();
        }, 5000);
    };

    const arrQuotes: DataItemType[] | undefined = quotes && Object.entries(quotes);

    return (
        <Container>
            <h1 className="mb-4" >Котировки</h1>
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            {isLoaded && <Spinner animation="border" variant="primary" />}
            {!isLoaded &&
                <Table>
                    <thead>
                        <tr>
                            <th>Name Ticker</th>
                            <th>Last</th>
                            <th>Highest Bid</th>
                            <th>Percent Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrQuotes.map((item: DataItemType) => {
                            const key = item[0];
                            const value = item[1];
                            const { id, last, highestBid, percentChange } = value;
                            return (
                                <tr key={id}>
                                    <td>
                                        <Button variant="link" onClick={() => handleShowPopup(item)}>{key}</Button>
                                    </td>
                                    <td>{last}</td>
                                    <td>{highestBid}</td>
                                    <td>{percentChange}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
            {info && (
                <Popup
                    show={showModal}
                    data={info}
                    hidePopup={handleClosePopup}
                />
            )}
        </Container>
    );
};

export default Quotes;
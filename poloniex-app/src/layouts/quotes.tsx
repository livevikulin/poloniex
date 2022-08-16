import React, { useState } from "react";
import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import Popup from "../components/Modal";
import {useDispatch, useSelector} from "react-redux";
import { showModal, hideModal } from "../store/tickers";

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
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    // @ts-ignore
    const { quotes, error, isLoading, modal } = state;
    const [ info, setInfo ] = useState<DataItemType | undefined>();

    const handleShowPopup = (item: any) => {
        //@ts-ignore
        dispatch(showModal());
        setInfo(item);
    }

    const arrQuotes: DataItemType[] | undefined = quotes && Object.entries(quotes);

    return (
        <Container>
            <h1 className="mb-4" >Котировки</h1>
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            {isLoading && <Spinner animation="border" variant="primary" />}
            {!isLoading &&
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
                        {arrQuotes?.map((item: DataItemType) => {
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
                    show={modal}
                    data={info}
                    // @ts-ignore
                    hidePopup={() => dispatch(hideModal())}
                />
            )}
        </Container>
    );
};

export default Quotes;
import React, {useState} from 'react';
import {StyledActiveBtn, StyledInActiveBtn} from "./Buttons";
import {useNavigate} from "react-router-dom";

type Props = {
    id: number
    firstBtnName: string,
    secondBtnName: string,
    firstAction(): void,
    secondAction(): void
}

const SelectingButtons: React.FC<Props> = ({id, firstBtnName, secondBtnName, firstAction, secondAction}) => {
    const navigate = useNavigate()
    const [itemQueue, setItemQueue] = useState<number | null>(null)
    return (
        <>
            {itemQueue !== id ?
                <StyledActiveBtn variant='outlined' color='primary'
                                 onClick={firstAction}
                                 sx={{marginRight: "5px"}}
                                 onMouseEnter={() => {
                                     setItemQueue(null)
                                 }}
                                 onMouseLeave={() => {
                                     setItemQueue(null)
                                 }}

                >{firstBtnName}</StyledActiveBtn> :
                <StyledInActiveBtn variant='outlined' color='primary'
                                   onClick={() => navigate('/app/services/one/new')}
                                   onMouseEnter={() => {
                                       setItemQueue(null)
                                   }}
                                   onMouseLeave={() => {
                                       setItemQueue(null)
                                   }}
                >{firstBtnName}</StyledInActiveBtn>
            }
            {itemQueue === id ?
                <StyledActiveBtn variant='outlined' color='primary'
                                 onMouseEnter={() => {
                                     setItemQueue(null)
                                 }}
                                 onMouseLeave={() => {
                                     setItemQueue(null)
                                 }}
                                 onClick={secondAction}
                >{secondBtnName}</StyledActiveBtn> :
                <StyledInActiveBtn variant='outlined' color='primary'
                                   onMouseEnter={() => {
                                       setItemQueue(id)
                                   }}
                                   onMouseLeave={() => {
                                       setItemQueue(null)
                                   }}
                                   onClick={() => {
                                   }}
                >{secondBtnName}</StyledInActiveBtn>
            }
        </>
    );
};

export default SelectingButtons;
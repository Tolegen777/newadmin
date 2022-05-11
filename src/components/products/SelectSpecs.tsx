///variant not choosed works


import {styled} from '@mui/material/styles';
import {MenuItem, Select, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useGetSpecsQuery} from '../../store/rtk-api/baseEndpoints';
import {ProductService} from "../../service/product/product.service";
import {IProductSpecs} from "../../types/IProduct";
import {useParams} from "react-router";


const StyledSubHeader = styled(Typography)(({theme}) => ({
    fontSize: '15px',
    fontWeight: 700,
    marginTop: '15px'
}))
const StyledSelect = styled(Select)(({theme}) => ({
    backgroundColor: '#EFF3F9',
    marginTop: '10px',
    minWidth: '100px'
}))

type Props = {
    categoryId: number | null,
    setFieldValue(name: string, arr: Array<number>): void
    handleSetSpecs(arr: Array<string>): void

}
const SelectSpecs: React.FC<Props> = ({categoryId, setFieldValue, handleSetSpecs}) => {

    const [specChoseMap, setSpecChoseMap] = useState("")
    const [specVal, setSpecVal] = useState("")


    const {data: specs, isLoading} = useGetSpecsQuery(String(categoryId))

    const [productSpecs, setProductSpecs] = useState<IProductSpecs[]>([])
    const [arrOfMapValues, setArrOfMapValues] = useState<Array<string>>([])
    const [arrOfMapKeys, setArrOfMapKeys] = useState<Array<string>>([])
    const [indexOfSpecsArr, setIndexOfSpecsArr] = useState<Array<string>>([])


    const [specsList, setSpecsList] = React.useState<any>(new Map())
    const [mapState, setMapState] = React.useState<any>(new Map())

    const {productId} = useParams();

    const handleAddSpec = (key: number, specId: number | null, specValue: string, specValue2: string) => {
        // console.log(specValue2)
        if (specId === null) {
            setSpecVal(specValue2)
            setSpecChoseMap(specValue)

            mapState.set(specValue, specValue2)

            for (let i = 0; i < arrOfMapKeys.length; i++) {
                if (arrOfMapKeys[i] === specValue) {
                    arrOfMapValues.push(String(i), specValue)
                    indexOfSpecsArr.push(String(i), specValue2)
                }
            }
        } else {

            specsList.set(String(key), specId)

            setFieldValue('specs', specsList)

            if (Array.from(specsList).length > 0) {
                handleSetSpecs(Array.from(specsList.values()))
            }


            setSpecVal(specValue2)
            setSpecChoseMap(specValue)

            mapState.set(specValue, specValue2)

            for (let i = 0; i < arrOfMapKeys.length; i++) {
                if (arrOfMapKeys[i] === specValue) {
                    arrOfMapValues.push(String(i), specValue)
                    indexOfSpecsArr.push(String(i), specValue2)
                }
            }
        }

        // setSpecsList(specsList.set(String(key), specId))

    }

    React.useEffect(() => {
        async function fetch() {
            if (productId) {
                const result = await ProductService.fetchOneProduct(productId);
                setProductSpecs(result?.data?.product?.specs)
                if (specs) {
                    setArrOfMapKeys(specs.map(s => s.title));
                    setArrOfMapValues(result?.data?.product?.specs.map(s => s.title).map(s1 => s1.title))
                    setIndexOfSpecsArr(result.data.product.specs.map(s => s.value))
                }

                // console.log(specs)
                // console.log("specs")

            }
        }

        fetch()
    }, [specs])

    // console.log(arrOfMapKeys)
    // console.log(arrOfMapValues)
    // console.log(indexOfSpecsArr)
    // console.log("arrOfMapKeys")
    arrOfMapKeys.map((key, ind) => mapState.set(key, ""))

    if (arrOfMapValues.length > 0) {
        arrOfMapValues.map((s, ind) => {
            arrOfMapKeys.filter((s1, ind2) => {
                if (s1 === s) {
                    mapState.set(s1, indexOfSpecsArr[ind])
                }
            })
        })
    }
    // console.log(mapState)
    // console.log("mapState")
    // console.log(Array.from(mapState.values()))


    return (
        <>
            {specs && specs?.map((spec, ind) => {
                    if (productSpecs.length > 0 && spec) {
                        // console.log( productSpecs)
                        // console.log( "aaa")
                    }

                    return <>
                        <StyledSubHeader>{spec?.title}</StyledSubHeader>
                        <Select
                            sx={{width: "150px"}}
                            value={spec && mapState.size > 0 && Array.from(mapState.keys()).filter(v=>v===spec.title)[0] === spec.title ? mapState.get(Array.from(mapState.keys()).filter(v=>v===spec.title)[0]) : "n"}
                            displayEmpty

                        >

                            <MenuItem value={""} onClick={() => handleAddSpec(spec.id, null, spec.title, "")}>
                                <em>Вариант не выбран</em>
                            </MenuItem>
                            {spec?.values?.map((specValue) => {


                                return <MenuItem key={specValue.id}
                                                 value={specValue.value === Array.from(mapState.values()).filter(v=>v===specValue.value)[0] ? specValue.value : "not"}
                                                 onClick={() => handleAddSpec(spec.id, specValue.id, spec.title, specValue.value)}>{specValue.value}
                                </MenuItem>

                            })}
                        </Select>
                    </>

                }
            )}

        </>
    )
}

export default SelectSpecs
import {styled} from '@mui/material/styles';
import {MenuItem, Select, Typography} from '@mui/material';
import React, {MutableRefObject, useEffect, useState} from 'react';
import {useGetSpecsQuery} from '../../store/rtk-api/baseEndpoints';
import {ProductService} from "../../service/product/product.service";
import {IProductSpecs} from "../../types/IProduct";
import {useParams} from "react-router";
import {IUpdateSpecArr, IUpdateSpecs} from "../../types/types";
import {useUpdateSpecsMutation} from "../../store/rtk-api/updateSpecs-rtk/updateSpecs-rtk";
import {useRemoveSpecsMutation} from "../../store/rtk-api/removeSpecs-rtk/removeSpecs-rtk";
import {useAddSpecsMutation} from "../../store/rtk-api/addSpecs-rtk/addSpecs-rtk";


const StyledSubHeader = styled(Typography)(({theme}) => ({
    fontSize: '15px',
    fontWeight: 700,
    marginTop: '15px'
}))

type Props = {
    categoryId: number | null,
    setFieldValue(name: string, arr: Array<number>): void
    handleSetSpecs(arr: Array<string>): void
    // handleUpdateSpecs:MutableRefObject<null>
    handleUpdateSpecs:any

}
const SelectSpecs: React.FC<Props> = ({categoryId, setFieldValue, handleSetSpecs, handleUpdateSpecs}) => {

    const [specChoseMap, setSpecChoseMap] = useState("")
    const [specVal, setSpecVal] = useState("")


    const {data: specs, isLoading} = useGetSpecsQuery(String(categoryId))

    const [updateProductSpecs, {}] = useUpdateSpecsMutation()

    const [removeSpecs, {}] = useRemoveSpecsMutation()
    const [addSpecs, {}] = useAddSpecsMutation()


    const [productSpecs, setProductSpecs] = useState<IProductSpecs[]>([])
    const [arrOfMapValues, setArrOfMapValues] = useState<Array<string>>([])
    const [arrOfMapKeys, setArrOfMapKeys] = useState<Array<string>>([])
    const [indexOfSpecsArr, setIndexOfSpecsArr] = useState<Array<string>>([])


    const [specsList, setSpecsList] = React.useState<any>(new Map())
    const [mapState, setMapState] = React.useState<any>(new Map())
    const [mapOldUpdate, setMapUpdate] = React.useState<any>(new Map())
    const [mapNewUpdate, setMapNewUpdate] = React.useState<any>(new Map())
    const {productId} = useParams();
    const [productInitMapState, setProductInitMapStat] = React.useState<any>(new Map())

    const [updateArr, setUpdateArr] = useState<any>([])

    const handleAddSpec = (key: number, specId: number | null, specValue: string, specValue2: string) => {

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

            for (let i = 0; i < arrOfMapKeys.length; i++) {
                if (arrOfMapKeys[i] === specValue) {
                    arrOfMapValues.push(String(i), specValue)
                    indexOfSpecsArr.push(String(i), specValue2)
                }
            }
        }

        mapState.set(specValue, specValue2)
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
            }
        }

        fetch()
    }, [specs])

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


    useEffect(()=>{
        if (productSpecs.length>0){
            productSpecs.map(p=>{
               productInitMapState.set(p.title.title,p.value)
            })
        }
    },[productSpecs])



    //////////
    const handleUpdateSpecsOnClick = () => {

        let array:Array<String> = []
        let array2:Array<String> = []


        if (specs&&productId){
            specs.map((s,ind)=>{
                Array.from(mapState.keys()).map(k=>{
                    if (s.title===k){
                        s.values.map(v=>{
                            if (v.value===mapState.get(k)){
                                if (productInitMapState.size===0||productInitMapState.get(k)===''||!Array.from(productInitMapState.keys()).includes(k)){
                                    array2.push(String(v.id))
                                } else if(productInitMapState.size>0&&productInitMapState.get(k)!==''&&productInitMapState.get(k)!==mapState.get(k)) {

                                    mapNewUpdate.set(k,v.id)
                                }

                            } else if (v.value===productInitMapState.get(k)&&mapState.get(k)===''){
                                //removing array
                                array.push(String(v.id))
                            }
                        })
                        productSpecs.length>0&&productSpecs.map(p=>{
                            if (p.title.title===k){
                                mapOldUpdate.set(k,p.id)
                            }

                        })
                    }


                })
            })
        }



        Array.from(mapNewUpdate.keys()).map((m,index)=>{

            updateArr.push({oldSpecId:mapOldUpdate.get(m),
                    newSpecId:mapNewUpdate.get(m)
            })
        })




        ///// removing spec(do not remove this comment!)
        // if (array.length!==0){
        //     removeSpecs({
        //         productId:Number(productId),
        //         specs:array.join(',')
        //     })
        // }

        if (array2.length!==0){
            addSpecs({
                productId:Number(productId),
                specs:array2.join(',')
            })
        }

        if (updateArr.length>0) {
            updateProductSpecs({
                productId:Number(productId),
                specs:updateArr
            })
        }
    }




    useEffect(()=>{

        // @ts-ignore
        handleUpdateSpecs.current = handleUpdateSpecsOnClick
    })









    return (
        <>
            {specs && specs?.map((spec, ind) => {

                return <>
                        <StyledSubHeader>{spec?.title}</StyledSubHeader>
                        <Select
                            sx={{width: "150px"}}
                            value={spec && mapState.size > 0 && Array.from(mapState.keys()).filter(v=>v===spec.title)[0] === spec.title ? mapState.get(Array.from(mapState.keys()).filter(v=>v===spec.title)[0]) : "n"}
                            displayEmpty

                        >

                            {!productId&&<MenuItem value={""} onClick={() => handleAddSpec(spec.id, null, spec.title, "")}>
                                <em>Вариант не выбран</em>
                            </MenuItem>}
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
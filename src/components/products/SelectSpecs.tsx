import { styled } from '@mui/material/styles';
import { MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import { useGetSpecsQuery } from '../../store/rtk-api/baseEndpoints';


const StyledSubHeader = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: 700,
  marginTop: '15px'
}))
const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#EFF3F9',
  marginTop: '10px',
  minWidth: '100px'
}))

type Props = {
  categoryId: number | null,
  setFieldValue(name:string,arr:Array<number>):void
}
const SelectSpecs: React.FC<Props> = ({ categoryId,setFieldValue }) => {
  const { data: specs, isLoading } = useGetSpecsQuery(String(categoryId))
 // console.log(specs)
 // console.log("specsspecs")
  const map = new Map();
  const [specsList, setSpecsList] = React.useState<any>(map)

  const handleAddSpec = (key:number,specId: number) => {
    setSpecsList(specsList.set(String(key),specId))
    //console.log(specsList)


      setFieldValue('specs',specsList)


  }

  // console.log("frf")
  //console.log(map)

  return (
    <>
      {specs && specs?.map((spec) => (
        <>
          <StyledSubHeader>{spec?.title}</StyledSubHeader>
          <StyledSelect
            value={specsList.get(String(spec.id))}
            displayEmpty
          >
            <MenuItem value="">
              <em>Вариант не выбран</em>
            </MenuItem>
            {spec?.values?.map((specValue) => {
               return <MenuItem key={specValue.id} value={specValue.id} onClick={() => handleAddSpec(spec.id,specValue.id)}>{specValue.value}</MenuItem>
            })}
          </StyledSelect>
        </>
      ))}
    </>
  )
}

export default SelectSpecs

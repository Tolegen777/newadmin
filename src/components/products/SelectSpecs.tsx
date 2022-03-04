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
  categoryId: string
}
const SelectSpecs: React.FC<Props> = ({ categoryId }) => {
  const { data: specs, isLoading } = useGetSpecsQuery(categoryId)
  const [specsList, setSpecsList] = React.useState<{ title: string, id: '' }[]>([])

  const addSpec = (spec: { title: string, id: number }) => {
  }

  React.useEffect(() => {
    if (specs) {
      setSpecsList(specs.map((spec) => {
        return { title: spec.title, id: '' }
      }))
    }
  }, specs)

  return (
    <>
      {specs && specs?.map((spec) => (
        <>
          <StyledSubHeader>{spec?.title}</StyledSubHeader>
          <StyledSelect
            // value={values.category}
            // name="category"
            // onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Вариант не выбран</em>
            </MenuItem>
            {spec?.values?.map((specValue) => (
              <MenuItem value={specValue.id}>{specValue.value}</MenuItem>
            ))}
          </StyledSelect>
        </>
      ))}
    </>
  )
}

export default SelectSpecs

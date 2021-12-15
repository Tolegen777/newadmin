import React from 'react'
import { Box, Typography } from '@mui/material';
// import CustomTable from '../components/admin/ProductsTable';
import { useGetProfilesQuery } from '../redux/services/profile';

const mapping = {
  'id': "#ID",
  'first_name': "First Name",
  'email': "Email",
  'phone_number': "Phone",
  'is_active': "Active",
  'is_admin': "Admin"
}

const CustomersView: React.FC = () => {
  const { data, isLoading, isError } = useGetProfilesQuery(``);

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <Typography style={{ fontSize: "42px", fontWeight: 500 }}>Customers</Typography>
      </div>
      {/* {data?.result && <CustomTable data={data?.result} isLoading={isLoading} mapping={mapping} />} */}
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error occured. Try later.</span>}
    </Box>
  )
}

export default CustomersView

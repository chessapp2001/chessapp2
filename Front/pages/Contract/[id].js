import React from 'react';
import { useRouter } from 'next/router';
//import Layout from '../server_sss/components/Layout';


function ContractPage({ }) {
  // your component logic here
  const router = useRouter();
  const { id } = router.query;
 // <Layout>
    return <h1>Contract Page: {id}</h1>;
 // </Layout>
}

export default ContractPage;
import { useState } from "react";

import Header from "../components/common/Header";

import BreedDicts from "../components/aipage/BreedDicts";
import Layout from "../components/common/Layout";

const DictPage = () => {
   
    const [BreedDict, setBreedDict] = useState(false);
    console.log('here is Dict Page');
    return (
        <>
            <Layout>
               
                <BreedDicts />
               
            </Layout>
        </>
    );
};

export default DictPage;

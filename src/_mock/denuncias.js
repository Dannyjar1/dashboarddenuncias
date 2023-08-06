

const denuncias = async () => {
    console.log("sapos")
    /* const response =  axios.get('https://back-barrios-462cb6c76674.herokuapp.com/admin/getAllDenuncias');

    return response.data; */
    const URL= 'https://back-barrios-462cb6c76674.herokuapp.com/admin/getAllDenuncias';
    const response = await fetch(URL).then(response => response.json());
    console.log(response);
    return response;
};

export default denuncias;

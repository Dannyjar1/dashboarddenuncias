const bloquear = async () => {
    console.log("sapos")

    const URL= 'https://back-barrios-462cb6c76674.herokuapp.com/admin/unblockUser';
    const response = await fetch(URL).then(response => response.json());
    console.log(response);
    return response;
};

export default bloquear;
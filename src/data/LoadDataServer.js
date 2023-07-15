async function loadExternalDataFromServer(id) {
    const response = await fetch("http://localhost:8080/customers/getCustomer?id=" + id);
    const json = await response.json();
    return json;
}

export {loadExternalDataFromServer}